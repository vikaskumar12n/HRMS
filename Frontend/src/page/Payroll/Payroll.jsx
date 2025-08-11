import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Calendar, User, DollarSign, CheckCircle, XCircle, Edit2, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useGetAllEmployeeQuery } from '../../rtk/employeeApi';
import { useGetPayroleListQuery, usePaySalaryMutation } from '../../rtk/payroleApi';
import { ClipLoader } from 'react-spinners';
import isConfirmed from '../../component/isConfirmed';
const Payroll = () => {

  const { data: employeeData, isLoading } = useGetAllEmployeeQuery()
  const [paySalary, { isLoading: salaryPayLoading }] = usePaySalaryMutation();
  const [loading, setLoading] = useState(false)

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [editingStatus, setEditingStatus] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2025");
  const { data: payrollData, isLoading: payRoleLoading ,isFetching,refetch} = useGetPayroleListQuery(selectedYear);


  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonthIndex = new Date().getMonth();   // 0 = Jan, 1 = Feb …
    return months[currentMonthIndex];
  });

  const filteredData = (payrollData || []).filter(emp => {
    const empName = emp?.employeeName?.toLowerCase() || '';
    const status = emp?.status?.toLowerCase() || '';
    const date = new Date(emp.createdAt);
    const month = emp?.month   // "6" for June
    const email = emp?.email?.toLowerCase() || '';
    const matchesSearch =
      empName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase());
    const matchesMonth =
      selectedMonth === 'all' || month?.toLowerCase() === selectedMonth?.toLowerCase();

    return (
      matchesSearch && matchesMonth
    );
  });

  let totalSalary = 0;
  let highestSalary = 0;
  let highestPresentDays = 0;
  let totalPaidCount = 0;

  filteredData.forEach(emp => {
    // Total + highest salary
    const salaryNum = parseFloat(emp.salary);
    if (!isNaN(salaryNum)) {
      totalSalary += salaryNum;
      if (salaryNum > highestSalary) highestSalary = salaryNum;
    }

    // Highest present days
    if (emp.presentDays > highestPresentDays) highestPresentDays = emp.presentDays;

    // Total paid count
    if (emp.status && emp.status.toLowerCase() === "paid") {
      totalPaidCount++;
    }
  });

  // Highest present percentage (assuming 30 days)
  let highestPercentage = ((highestPresentDays / 30) * 100).toFixed(2);



  const handleStatusChange = async (employee) => {
    
    const confirm=await isConfirmed({description:"Are you sure you want to pay payment?"})
    if (!confirm) return;
    const monthIndex = new Date(`${employee?.month} 1, ${selectedYear}`).getMonth();
    try {
      setLoading(true)
      const result = await paySalary({
        employeeId: employee?.employeeId,
        year: selectedYear,
        month: monthIndex,
        isPaid: true, // or false if unpaid
        paidAmount: employee?.estimate_salary,
      }).unwrap();

      console.log(result);
      if(result?.success){
          refetch()
          setLoading(false)
      }
      
    } catch (error) {
      setLoading(false)
      console.error("Payment update failed", error.message);
    }
  };





  

  const StatusBadge = ({ status, employee, onStatusChange }) => {
    return (
      <div className="flex items-center gap-2">
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${status?.toLowerCase() === 'paid'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-red-100 text-red-800'
            }`}
        >
          {status?.toLowerCase() === 'paid' ? (
            <>
              <CheckCircle className="w-3 h-3 inline mr-1" />
              Paid
            </>
          ) : (
            <>
              <XCircle className="w-3 h-3 inline mr-1" />
              Unpaid
            </>
          )}
        </span>
        {loading ? (
          <p>loading.....</p>
        ) : (
          status?.toLowerCase() !== 'paid' && (
            <button
              onClick={() => handleStatusChange(employee)}
              className="text-xs bg-blue-100 rounded-2xl px-2 py-1 text-blue-600 hover:text-blue-800"
            >
              PayNow
            </button>
          )
        )}


      </div>
    );
  };

  if (payRoleLoading || salaryPayLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={30} color="blue" />
      </div>
    );
  }


  






  return (
    <div className="min-h-screen bg-gray-50" style={{ color: '#06425F' }}>
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1">Monthly Payroll</h1>
          <p className="text-sm text-gray-600">Manage employee salary and attendance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: '#06425F' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Employees</p>
                <p className="text-lg font-bold">{employeeData?.all_data?.length}</p>
              </div>
              <Users className="w-6 h-6 opacity-60" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Paid</p>
                <p className="text-lg font-bold text-green-600">{totalPaidCount}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Payout</p>
                <p className="text-lg font-bold">₹{totalSalary}</p>
              </div>
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Highest Salary</p>
                <p className="text-lg font-bold">₹{highestSalary}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Max Present Days</p>
                <p className="text-lg font-bold">{highestPercentage}</p>
              </div>
              <Calendar className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employee name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-0 outline-none text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 rounded-sm px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm outline-none"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm outline-none"
              >
                <option value="">Sort By</option>
                <option value="highestSalary">Highest Salary</option>
                <option value="highestPresent">Highest Present Days</option>
              </select>
            </div> */}
          </div>
        </div>

        {isFetching ? <p>Loading...</p> : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead style={{ backgroundColor: '#06425F' }} className="text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Employee</th>
                    <th className="px-4 py-3 text-left font-medium">Salary</th>
                    <th className="px-4 py-3 text-left font-medium">Total Work Day</th>
                    <th className="px-4 py-3 text-left font-medium">Present</th>
                    <th className="px-4 py-3 text-left font-medium">Absent</th>
                    <th className="px-4 py-3 text-left font-medium">Estimate</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((employee, index) => (
                    <tr key={employee?.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-3 py-2">
                        <Link to={`/dashboard/employee/overview/${employee?.employeeId}`} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: '#06425F' }}>
                            {employee?.employeeName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{employee?.employeeName}</p>
                            <p className="text-xs text-gray-500">{employee?.email}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-3 py-2 font-medium">{(parseInt(employee?.salary).toLocaleString()) == "NaN" ? " --" : (`₹ ${parseInt(employee?.salary).toLocaleString()}`)}</td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          {employee?.totalWorkingDays} days
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {employee?.presentDays} days
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          {employee?.absentDays} days
                        </span>
                      </td>

                      <td className="px-3 py-2 font-medium">{(parseInt(employee?.estimate_salary).toLocaleString()) == "NaN" ? " --" : (`₹ ${parseInt(employee?.estimate_salary).toLocaleString()}`)}</td>
                      <td className="px-3 py-2">
                        <StatusBadge
                          status={employee?.status}
                          employee={employee}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Table */}


        {filteredData?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No employees found matching your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;