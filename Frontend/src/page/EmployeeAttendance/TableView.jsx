import React, { useState, useMemo } from 'react';
import { ChevronDown, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const TableView = ({ attendanceData, isLoading, searchTerm, showEntries }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedManager, setSelectedManager] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Filter and search logic
  const filteredData = useMemo(() => {
    if (!attendanceData) return [];
    
    return attendanceData.filter(employee => {
      const matchesSearch = !searchTerm || 
        employee.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employee.mobile.includes(searchTerm);
      
      const matchesDepartment = !selectedDepartment || 
        employee.employee.department === selectedDepartment;
      
      const matchesGrade = !selectedGrade || 
        employee.employee.grade === selectedGrade;
      
      const matchesLocation = !selectedLocation || 
        employee.employee.location === selectedLocation;
      
      const matchesManager = !selectedManager || 
        employee.employee.manager === selectedManager;
      
      const matchesStatus = !selectedStatus || 
        employee.status === selectedStatus;

      return matchesSearch && matchesDepartment && matchesGrade && 
             matchesLocation && matchesManager && matchesStatus;
    });
  }, [attendanceData, searchTerm, selectedDepartment, selectedGrade, selectedLocation, selectedManager, selectedStatus]);

  // Sort logic
  const sortedData = useMemo(() => {
    if (!sortBy || !filteredData) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.employee.name.localeCompare(b.employee.name);
        case 'id':
          return a._id.localeCompare(b._id);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });
  }, [filteredData, sortBy]);

  // Pagination
  const paginatedData = useMemo(() => {
    return sortedData.slice(0, showEntries);
  }, [sortedData, showEntries]);




  

  // Status counts
  const statusCounts = useMemo(() => {
    if (!filteredData) return { present: 0, absent: 0, leave: 0, anomaly: 0 };
    
    return filteredData.reduce((acc, cur) => {
      const status = cur.status;
      if (status === 'P') acc.present++;
      else if (status === 'A') acc.absent++;
      else if (status === 'L') acc.leave++;
      else if (status === 'AN') acc.anomaly++;
      return acc;
    }, { present: 0, absent: 0, leave: 0, anomaly: 0 });
  }, [filteredData]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'P': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-red-100 text-red-800';
      case 'L': return 'bg-blue-100 text-blue-800';
      case 'WO': return 'bg-gray-100 text-gray-800';
      case 'AN': return 'bg-orange-100 text-orange-800';
      case 'H': return 'bg-purple-100 text-purple-800';
      case 'WFH': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-50 text-gray-400';
    }
  };

  // Get unique values for filter dropdowns
  const uniqueDepartments = useMemo(() => {
    if (!attendanceData) return [];
    return [...new Set(attendanceData.map(emp => emp.employee.department).filter(Boolean))];
  }, [attendanceData]);

  const uniqueGrades = useMemo(() => {
    if (!attendanceData) return [];
    return [...new Set(attendanceData.map(emp => emp.employee.grade).filter(Boolean))];
  }, [attendanceData]);

  const uniqueLocations = useMemo(() => {
    if (!attendanceData) return [];
    return [...new Set(attendanceData.map(emp => emp.employee.location).filter(Boolean))];
  }, [attendanceData]);

  const uniqueManagers = useMemo(() => {
    if (!attendanceData) return [];
    return [...new Set(attendanceData.map(emp => emp.employee.manager).filter(Boolean))];
  }, [attendanceData]);
 console.log(paginatedData)
  if (isLoading || !attendanceData) {
    return (
      <div className="flex justify-center h-full">
        <ClipLoader size={30} />
      </div>
    );
  }
  const formatTime = (timestamp) => {
   if(!timestamp){
    return null
   }
    const date = new Date(timestamp);
    return  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
function viewLocation(latitude, longitude) {
  if (!latitude || !longitude) {
    toast.error("User Not Check In Yet!");
    return;
  }

  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(mapUrl, '_blank');
}



console.log("bc is ",attendanceData);


  return (
    <div className="bg-white rounded-lg">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <select 
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Department</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          {/* <div className="flex items-center gap-2">
            <select 
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="">Grade</option>
              {uniqueGrades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div> */}

          {/* <div className="flex items-center gap-2">
            <select 
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Location</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div> */}

          {/* <div className="flex items-center gap-2">
            <select 
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={selectedManager}
              onChange={(e) => setSelectedManager(e.target.value)}
            >
              <option value="">Manager Name</option>
              {uniqueManagers.map(manager => (
                <option key={manager} value={manager}>{manager}</option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div> */}

          <div className="flex items-center gap-2">
            <select 
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="P">Present</option>
              <option value="A">Absent</option>
              <option value="L">Leave</option>
              <option value="WO">Weekly Off</option>
              <option value="AN">Anomaly</option>
              <option value="H">Holiday</option>
              <option value="WFH">Work From Home</option>
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-600">Sort By:</span>
            <select 
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Select</option>
              <option value="name">Name</option>
              <option value="id">ID</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Check In</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Check Out</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Work Duration</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Check In Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
           
            {paginatedData.map((employee, i) => (
              <tr key={employee._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm overflow-ellipsis text-gray-900">
                  {employee._id.slice(-5)}
                </td>
                <td className="px-4 py-3">
                  <Link to={`/dashboard/employee/overview/${employee?.employeeId}`} className="flex items-center">
                    <div className="w-8 h-8 bg-[#06425F] rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                      {employee.avatar || <User2/>}
                    </div>
                    <span className="text-sm text-gray-900">{employee.employee.name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{formatTime(employee?.checkIn) || '--'}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{formatTime(employee?.checkOutTime) || '--'}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{employee?.workDuration || '--'}</td>
                <td className="px-4 py-3 text-sm text-blue-600 cursor-pointer hover:underline"
                onClick={()=>viewLocation(employee?.location?.coordinates[0],employee?.location?.coordinates[1])}
                >View Map</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Summary */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <span className="text-gray-600">* Status Legend:</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">P: Present, A: Absent, L: Leave, WO: Weekly off, H: Holiday, HL: Half day leave, WFH: Work From Home, AN: Anomaly, AC: Auto Clock-out</span>
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Out time will be the same as the last punch time in cases of Auto Clock-out and odd number of punch timings
        </div>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Present</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">{statusCounts.present}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm">Absent</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">{statusCounts.absent}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm">Leave</span>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">{statusCounts.leave}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm">Anomaly</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">{statusCounts.anomaly}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableView;