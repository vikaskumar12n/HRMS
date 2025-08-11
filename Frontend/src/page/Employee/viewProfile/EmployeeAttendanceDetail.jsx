import React, { useState } from 'react';
// import EmployeeAttendance from '../EployeeAttendance.jsx';

const EmployeeAttendanceDetail = () => {
  const [activeTab, setActiveTab] = useState('requested');
  
  const tabs = [
    // { id: 'requested', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z', text: 'Requested Attendances' },
    { id: 'validate', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: 'Attendance' },
    // { id: 'hour', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Hour Account' }
  ];
  
  // Sample employee data
  const employeeData = [
    {
      id: 'DNA0022',
      name: 'Jitendra singh Chauhan',
      date: 'Dec. 14, 2024',
      day: 'Tuesday',
      checkIn: '8:30 a.m.',
      inDate: 'Dec. 14, 2024',
      checkOut: '7 p.m.',
      outDate: 'Dec. 14, 2024',
      avatar: 'A'
    }
  ];
  
  return (
    <div className="flex-col md:flex-row max-w-6xl mx-auto p-4 bg-white shadow rounded-lg justify-start">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center py-4 px-6 ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path>
            </svg>
            {tab.text}
          </button>
        ))}
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="p-4 font-medium">Employee</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Day</th>
              <th className="p-4 font-medium">Check-In</th>
              <th className="p-4 font-medium">In Date</th>
              <th className="p-4 font-medium">Check-Out</th>
              <th className="p-4 font-medium">Out Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employeeData.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center mr-3">
                      {employee.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-500">({employee.id})</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">{employee.date}</td>
                <td className="p-4">{employee.day}</td>
                <td className="p-4">{employee.checkIn}</td>
                <td className="p-4">{employee.inDate}</td>
                <td className="p-4">{employee.checkOut}</td>
                <td className="p-4">{employee.outDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeAttendanceDetail;