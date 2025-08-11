import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import EmployeeAttendanceDetail from './viewProfile/EmployeeAttendanceDetail.jsx';
import EmployeeAbout from './viewProfile/EmployeeAbout.jsx';
import EmployeeLive from './viewProfile/EmployeeLive.jsx';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useGetOneEmployeeQuery } from '../../rtk/employeeApi.js';
import { useParams } from "react-router-dom";

const EmployeeDetail = () => {
   const{id}=useParams()   
   const navigate = useNavigate();
   const [activeTab, setActiveTab] = useState('about');
   const location = useLocation();
  const { data, isLoading, error } = useGetOneEmployeeQuery({id});
  console.log(data)
   const[employee,setEmployee]=useState({});
   useEffect(()=>{   
    if(data){
      setEmployee({
        name: data?.name || '',
        initials: data?.name?.slice(0, 2).toUpperCase() || 'NA',
        workEmail: data?.workEmail || '',
        email: data?.email || '',
        workPhone: data?.workPhone || 'None',
        phone: data?.mobile || '',
      });
    }
  },[data])
    
  const tabs1 = [
    { id: 'about', label: 'About' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'leave', label: 'Leave' }
  
  ];
  const tabs2 = [
    //   { id: 'performance', label: 'Performance' },
    //   { id: 'groups', label: 'Groups & Permissions' },
    //   { id: 'note', label: 'Note' },
    //   { id: 'documents', label: 'Documents' },
    //   { id: 'mailLog', label: 'Mail Log' },
    //   { id: 'bonusPoints', label: 'Bonus Points' }
  ];

  const handleTableClick = (tableId) => {
    setActiveTab(tableId);
  };

  return (
    <div className=" flex-col md:flex-row  w-full mx-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white p-2 flex flex-col md:flex-row items-start md:items-center justify-between border-b">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative">
            <div className="h-16 w-16 bg-blue-300 rounded-md flex items-center justify-center text-white text-2xl font-bold">
              {employee.initials}
            </div>
            <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">
              {employee.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mt-2">
              <div className="flex items-center text-gray-600 text-sm">
                <span className="mr-2">📧 Work Email:</span>
                <span>{employee.workEmail}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <span className="mr-2">📧 Email:</span>
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <span className="mr-2">📞 Work Phone:</span>
                <span>{employee.workPhone}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <span className="mr-2">📞 Phone:</span>
                <span>{employee.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 overflow-x-auto ">
        <div className="flex space-x-4 ">
          {tabs1.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-1 text-sm whitespace-nowrap ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => handleTableClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 overflow-x-auto ">
        <div className="flex space-x-4 ">
          {tabs2.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-1 text-sm whitespace-nowrap ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mp-4">
        {activeTab === 'attendance' && <EmployeeAttendanceDetail />}
        {activeTab === 'about' && <EmployeeAbout />} 
        {activeTab === 'leave' && <EmployeeLive />}
      </div>

      {/* Content */}
    </div>
  );
};

export default EmployeeDetail;
