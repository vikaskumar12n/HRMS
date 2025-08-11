import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, User2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAttendanceByMonthQuery, useAttendanceFilterQuery } from "../../rtk/attendance.js";
import { ClipLoader } from 'react-spinners';

const CalendarView = ({ currentDate, setCurrentDate, searchTerm, setSearchTerm }) => {
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  
  // API call for calendar data
  const [calendarFilter, setCalendarFilter] = useState("");
  const { data: calendarData, isLoading: calendarLoading } = useAttendanceByMonthQuery(calendarFilter);
  console.log(calendarData);

  // Update filter when month/year changes
  useEffect(() => {
    const monthStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;
    setCalendarFilter(`month=${monthStr}`);
  }, [selectedYear, selectedMonth]);

  // Update currentDate when year/month selection changes
  useEffect(() => {
    const newDate = new Date(selectedYear, selectedMonth, currentDate.getDate());
    setCurrentDate(newDate);
  }, [selectedYear, selectedMonth]);

  // Process calendar data according to new structure
  const processedEmployeeData = useMemo(() => {
    if (!calendarData || !Array.isArray(calendarData)) return [];
    
    return calendarData.map(employee => ({
      id: employee.employeeId ? employee.employeeId.slice(-5) : 'N/A',
      employeeId: employee.employeeId,
      employeeName: employee.name,
      email: employee.email,
      mobile: employee.mobile,
      avatar: employee.name ? employee.name.charAt(0).toUpperCase() : 'U',
      attendance: employee.attendance || {}
    }));
  }, [calendarData]);

  // Filter employee data based on search
  const filteredEmployeeData = useMemo(() => {
    if (!searchTerm) return processedEmployeeData;
    
    return processedEmployeeData.filter(employee => {
      return employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
             employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [processedEmployeeData, searchTerm]);

  // Set first employee as selected by default
  useEffect(() => {
    if (filteredEmployeeData.length > 0 && !selectedEmployee) {
      setSelectedEmployee(filteredEmployeeData[0]);
    }
  }, [filteredEmployeeData, selectedEmployee]);

  const getCalendarStatusColor = (status) => {
    switch (status) {
      case 'P': return 'bg-green-500';
      case 'A': return 'bg-red-400';
      case 'L': return 'bg-blue-400';
      case 'WO': return 'bg-gray-400';
      case 'AN': return 'bg-orange-400';
      case 'H': return 'bg-purple-400';
      case 'WFH': return 'bg-cyan-400';
      case 'HD': return 'bg-cyan-400'; // Half Day
      case 'ACO': return 'bg-red-600'; // Auto Clock-out
      case 'LOP': return 'bg-red-500'; // Loss of Pay
      default: return 'bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'P': return 'Present';
      case 'A': return 'Absent';
      case 'L': return 'Leave';
      case 'WO': return 'Weekly Off';
      case 'AN': return 'Anomaly';
      case 'H': return 'Holiday';
      case 'WFH': return 'Work From Home';
      case 'HD': return 'Half Day';
      case 'ACO': return 'Auto Clock-out';
      case 'LOP': return 'Loss of Pay';
      default: return 'Not Available';
    }
  };

  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      
      days.push({
        date: i,
        day: dayName,
        dateKey: dateKey,
        isToday: new Date().toDateString() === currentDate.toDateString()
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = selectedMonth + direction;
    if (newMonth < 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else if (newMonth > 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(newMonth);
    }
  };

  const days = getDaysInMonth(selectedYear, selectedMonth);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (calendarLoading) {
    return (
      <div className="flex justify-center h-full">
        <ClipLoader size={30} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Calendar Controls */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search employees..."
                className="border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <select 
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                  {monthNames.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                  ))}
                </select>
                <select 
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() - 5 + i;
                    return (
                      <option key={year} value={year}>{year}</option>
                    );
                  })}
                </select>
              </div>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Employee Selection */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Employee:</span>
          <div className="relative">
            <button
              onClick={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
              className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 min-w-80"
            >
              {selectedEmployee ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#06425F] rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {selectedEmployee.avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">{selectedEmployee.employeeName}</div>
                    <div className="text-xs text-gray-500">{selectedEmployee.email}</div>
                  </div>
                </div>
              ) : (
                <span className="text-gray-500">Select an employee</span>
              )}
              <ChevronDown className="h-4 w-4 text-gray-400 ml-auto" />
            </button>
            
            {showEmployeeDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {filteredEmployeeData.map((employee) => (
                  <button
                    key={employee.employeeId}
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setShowEmployeeDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
                  >
                    <div className="w-8 h-8 bg-[#06425F] rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {employee.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employee.employeeName}</div>
                      <div className="text-xs text-gray-500">{employee.email}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          {monthNames[selectedMonth]} {selectedYear}
        </h2>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div key={day} className="p-4 text-center text-sm font-semibold text-gray-700 bg-gray-50 rounded-lg">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const attendanceStatus = day && selectedEmployee ? selectedEmployee.attendance[day.dateKey] : null;
            
            return (
              <div 
                key={index} 
                className={`h-20 border-2 rounded-lg p-3 ${
                  day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                } ${
                  day && day.isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                {day ? (
                  <div className="h-full flex flex-col">
                    {/* Date */}
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      {day.date}
                    </div>
                    
                    {/* Attendance Status */}
                    {selectedEmployee && (
                      <div className="flex-1 flex items-center justify-center">
                        <div className={`w-12 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          attendanceStatus && attendanceStatus !== 'NA'
                            ? getCalendarStatusColor(attendanceStatus) + ' text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {attendanceStatus && attendanceStatus !== 'NA' ? attendanceStatus : 'NA'}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Attendance Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Present (P)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span>Absent (A)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
            <span>Leave (L)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>Weekly Off (WO)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-400 rounded"></div>
            <span>Holiday (H)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-cyan-400 rounded"></div>
            <span>Work From Home (WFH)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <span>Anomaly (AN)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span>Auto Clock-out (ACO)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>LOP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span>Not Available (NA)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;