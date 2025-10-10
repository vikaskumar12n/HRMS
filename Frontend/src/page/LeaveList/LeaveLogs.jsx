import React, { useState } from 'react';
import {
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Clock,
  Calendar,
  User,
  Building2,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useApproveLeaveMutation, useGetEmployeeLeaveQuery, useRejectLeaveMutation } from '../../rtk/leaveApi';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ClipLoader } from 'react-spinners';
import { data } from 'react-router-dom';
import isConfirmed from '../../component/isConfirmed';

const LeaveLogs = () => {
  const { data: leaveData = [], isLoading } = useGetEmployeeLeaveQuery()




  const [approveLeave] = useApproveLeaveMutation();
  const [leaveReaject] = useRejectLeaveMutation();

  const [selectedYear, setSelectedYear] = useState('2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEntries, setShowEntries] = useState(10);
  const [selectedLeaves, setSelectedLeaves] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');


  // Sample leave data


  const departments = ['All', 'IT', 'HR', 'Finance', 'Marketing', 'Operations'];
  const leaveTypes = ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Maternity Leave', 'Paternity Leave'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-700 bg-green-100 border-green-200';
      case 'Rejected': return 'text-red-700 bg-red-100 border-red-200';
      case 'Pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      case 'Pending': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleApprove = async (leaveId) => {
    try {
      console.log("Approving leaveId:", leaveId);
      const confirm = await isConfirmed({ description: "Are you Sure You Want to Approve" })

   
      
      if (confirm) {
        const res = await approveLeave({ id: leaveId }).unwrap(); // API call

      }

    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  const handleReject = async (leaveId) => {
    try {

      const confirm = await isConfirmed({ description: "Are you Sure You Want to Reject" })
    
      if (confirm) {
        const res = await leaveReaject({ id: leaveId }).unwrap(); // API callF
      }


    } catch (error) {
      console.error("failed:", error);
    }
  };

  const handleBulkApprove = () => {
    setLeaveData(prev =>
      prev.map(leave =>
        selectedLeaves.includes(leave?.id) ? { ...leave, status: 'Approved' } : leave
      )
    );
    setSelectedLeaves([]);
  };

  const handleSelectLeave = (leaveId) => {
    setSelectedLeaves(prev =>
      prev.includes(leaveId)
        ? prev.filter(id => id !== leaveId)
        : [...prev, leaveId]
    );
  };
 
    console.log("leaveData",leaveData);
    

  const filteredLeaves = (leaveData || []).filter(leave => {
    const empName = leave?.employeeId?.name?.toLowerCase() || '';
    const empId = leave?.employeeId?.empId?.toString().slice(-4).toLowerCase() || '';
    const dept = leave?.department?.toLowerCase() || ''; // Optional, if you have department
    const year = new Date(leave?.createdAt).getFullYear().toString();
    const leaveDate = new Date(leave?.createdAt); // ✅ Date banaya
    // const year = leaveDate.getFullYear().toString(); // "2025"
    const month = leaveDate.getMonth().toString();

    const matchesSearch =
      empName.includes(searchQuery.toLowerCase()) ||
      empId.includes(searchQuery.toLowerCase()) ||
      dept.includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || leave?.status?.toLowerCase() === statusFilter.toLowerCase();

    const matchesDepartment =
      departmentFilter === 'all' || dept === departmentFilter.toLowerCase();
    const matchesYear =
      selectedYear === 'all' || year === selectedYear;
    const matchesMonth =
      selectedMonth === 'all' || month === selectedMonth;

    return matchesSearch && matchesStatus && matchesDepartment && matchesYear && matchesMonth;
  });

  console.log("filteredLeaves", filteredLeaves);


  const exportExcell = () => {
    try {
      // Map only necessary fields for Excel
      const exportData = filteredLeaves.map((leave) => ({
        Name: leave?.employeeId?.name || "",
        Email: leave?.employeeId?.email || "",
        Mobile: leave?.employeeId?.mobile || "",
        Department: leave?.department || "N/A",
        startDate: leave?.startDate ? new Date(leave?.startDate).toLocaleDateString() : "",
        endDate: leave?.endDate ? new Date(leave?.endDate).toLocaleDateString() : "",
        Day: activalLeave(leave?.startDate, leave?.endDate) || "",
        applyDate: leave?.createdAt ? new Date(leave?.createdAt).toLocaleDateString() : "",
        Reason: leave?.description || "",
        Status: leave?.status || "",
      }));

      // Create worksheet & workbook
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Leaves");

      // Generate Excel file and trigger download
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "LeaveData.xlsx");

    } catch (err) {
      console.error("Excel Export Error:", err.message);
    }
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      // year: 'numeric'
    });
  };

  const activalLeave = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Difference in milliseconds
    const diffTime = Math.abs(end - start);

    // Convert to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays + 1; // +1 to include both start & end dates
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={30} color="blu" />
      </div>
    )
  }


  console.log(leaveData);
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#06425F]" />
                  Leave Logs
                </h1>
                <p className="text-gray-600 mt-1">Manage and track employee leave applications</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>

                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Months</option>
                  <option value="0">January</option>
                  <option value="1">February</option>
                  <option value="2">March</option>
                  <option value="3">April</option>
                  <option value="4">May</option>
                  <option value="5">June</option>
                  <option value="6">July</option>
                  <option value="7">August</option>
                  <option value="8">September</option>
                  <option value="9">October</option>
                  <option value="10">November</option>
                  <option value="11">December</option>
                </select>

              </div>

            </div>
          </div>

          {/* Controls */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees, ID, or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept.toLowerCase()}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                {selectedLeaves.length > 0 && (
                  <button
                    onClick={handleBulkApprove}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Bulk Approve ({selectedLeaves.length})
                  </button>
                )}

                <button
                  onClick={exportExcell}
                  className="bg-[#06425F] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Show</span>
                  <select
                    value={showEntries}
                    onChange={(e) => setShowEntries(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{leaveData.length}</p>
              </div>
              <FileText className="w-8 h-8 text-[#06425F]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {leaveData.filter(l => l.status === 'Pending').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {leaveData.filter(l => l.status === 'Approved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {leaveData.filter(l => l.status === 'Rejected').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white  rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto ">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {/* <th className="text-left p-4 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#06425F] focus:ring-blue-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeaves(filteredLeaves.map(l => l.id));
                        } else {
                          setSelectedLeaves([]);
                        }
                      }}
                    />
                  </th> */}
                  <th className="text-left p-4 text-sm font-medium text-gray-700">ID</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Employee</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Department</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Start</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">End</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Days</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Apply</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.slice(0, showEntries).map((leave) => {
                    // console.log("Leave Row:", leave); 

                    return (
                      <tr key={leave?._id} className="border-b border-gray-100 hover:bg-gray-50">
                        {/* <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedLeaves.includes(leave?._id)}
                            onChange={() => handleSelectLeave(leave?._id)}
                            className="rounded border-gray-300 text-[#06425F] focus:ring-blue-500"
                          />
                        </td> */}
                        <td className="p-4 text-sm text-gray-900 font-medium">{leave?.employeeId?.empId}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-sm font-medium">
                              {leave?.employeeId?.name?.[0] || 'NA'}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{leave?.employeeId?.name}</p>
                              <p className="text-xs text-gray-500">{leave?.employeeId?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                            <Building2 className="w-3 h-3" />
                            {leave?.department || 'NA'}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-700">{leave?.leaveType}</td>
                        <td className="p-4 text-sm text-gray-700">{formatDate(leave?.startDate)}</td>
                        <td className="p-4 text-sm text-gray-700">{formatDate(leave?.endDate)}</td>
                        <td className="p-4 text-sm text-gray-700 font-medium">
                          {activalLeave(leave?.startDate, leave?.endDate)}
                        </td>
                        <td className="p-4 text-sm text-gray-700 font-medium">
                          {formatDate(leave?.createdAt)}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 border rounded-full text-xs font-medium ${getStatusColor(leave?.status)}`}>
                            {getStatusIcon(leave?.status)}
                            {leave?.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {leave?.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleApprove(leave?._id)}
                                  className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleReject(leave?._id)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {/* <button className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors" title="View Details">
                              <FileText className="w-4 h-4" />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="10" className="p-8 text-center text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {Math.min(filteredLeaves.length, showEntries)} of {filteredLeaves.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 bg-[#06425F] text-white rounded text-sm">1</span>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveLogs;