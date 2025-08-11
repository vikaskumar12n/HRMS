import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  Rocket, 
  Users, 
  Clock,
  ChevronDown,
  ChevronRight,
  Menu,
  Bell,
  Building2,
  IndianRupee,
  Paperclip,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {useUserContext} from '../page/UseContext/useContext'
const EmployeeSidebaar = () => {
  const [expandedNav, setExpandedNav] = useState(null);
  const [currentPage, setCurrentPage] = useState('Dashboard');
   const [sidebarOpen, setSidebarOpen] = useState(true);
const {user} = useUserContext()
  const navigate = useNavigate()
const userData = user.employeeeData
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, children: [], url: "/employee/dashboard" },
  
    { 
      name: 'My Profile', 
      icon: <Users size={20} />, 
      hildren: [], url: `/employee/dashboard/employee/overview/${userData._id}?tab=parsonal` 
    },
    { name: 'Attendance', icon: <Clock size={20} />,
      children: [
      //  {name:"Attendance List", url:"/dashboard/attendance/list"},
       {name:"Attendance Logs", url:`/employee/dashboard/employee/overview/${userData._id}?tab=attendance`},
        // {name:"Employee Attendance", url:"/dashboard/attendance/employee"}  ,
        // {name:"Rules", url:"/dashboard/attendance/rules"}  
      ]
    },  
    { name: "Leave", icon: <Users size={20} />,
      children: [
      //  {name:"Leave", url:"/dashboard/leave"},
      //  {name:"Leave List", url:"/dashboard/leave/list"},
       {name:"Leave Logs", url:`/employee/dashboard/employee/overview/${userData._id}?tab=leaves`},
      //  {name:"Rules", url:"/dashboard/leave/rules"},
      ]  
    },
     { name: 'Payroll', icon: <IndianRupee size={20} />, children: [], url: `/employee/dashboard/employee/overview/${userData._id}?tab=salary` },
     
      { 
      name: 'Documents', 
      icon: <FileText size={20} />, 
      hildren: [], url: `/employee/dashboard/employee/overview/${userData._id}?tab=documents` 
    },
     { name: 'Notification', icon: <Bell size={20} />, children: [], url: "/employee/dashboard/notification" },
     { name: 'About', icon: <Building2 size={20} />, children: [
        {name:"About Company",url:"/employee/dashboard/about"},
        {name:"Our Term & Condition",url:"/employee/dashboard/term-condition"},
        {name:"Our Policies", url:"/employee/dashboard/policies"},
     ] },
  ];


  const toggleNav = (name) => {
    if (expandedNav === name) {
      setExpandedNav(null);
    } else {
      setExpandedNav(name);
    }
  };

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };

  const handleItemClick = (item) => {
    navigateTo(item.name);
    navigate(item.url)
    if (item.children.length > 0) {
      setSidebarOpen(true)
      toggleNav(item.name);
    }
    console.log(`Navigating to: ${item.url}`);
  };

  const handleChildClick = (child) => {
    navigateTo(child.name);
navigate(`${child.url}`)
    console.log(`Navigating to: ${child.url}`);
  };

  const handlesidebar=()=>{
    setSidebarOpen(!sidebarOpen)
    setExpandedNav(null);
  }

  return (
    <div className={`${sidebarOpen? 'w-64':'w-18'} h-screen overflow-y-auto shadow-2xl border-r border-gray-200`} style={{ backgroundColor: '#06425F' }}>
    
      <div className="px-4 py-6 border-b border-gray-600 flex justify-between">
        <div className={` ${sidebarOpen ? 'block':'hidden'}  flex items-center space-x-3`}>
          <div className="bg-blue-500 p-2 rounded-lg shadow-lg">
            <span className="text-white font-bold text-sm">CC</span>
          </div>
          <div>
            <p className="font-bold text-white text-base">Code Crafter</p>
            <p className="text-xs text-gray-300">Web Solutions</p>
          </div>
        </div>

         <button
            onClick={handlesidebar}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105"
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>
      </div>

      <nav className="mt-4 px-3">
        {navItems.map((item) => (
          <div key={item.name} className="mb-1">
            <div
              className={`
                flex items-center px-4 py-2.5 rounded-lg cursor-pointer
                transition-all duration-200 group
                ${currentPage === item.name 
                  ? 'bg-white bg-opacity-80 shadow-lg text-black' 
                  : 'text-gray-100 hover:text-black hover:bg-white hover:bg-opacity-50 h'
                }
              `}
              onClick={() => handleItemClick(item)}
            >
              <span className="mr-4 flex-shrink-0">{item.icon}</span>
              <span className={` ${sidebarOpen ? 'block':'hidden'} flex-grow font-medium text-sm`}>{item.name}</span>
              {item?.children?.length > 0 && (
                <div className={` ${sidebarOpen ? 'block':'hidden'} transition-transform duration-200`}>
                  {expandedNav === item.name ? 
                    <ChevronDown size={16} /> : 
                    <ChevronRight size={16} />
                  }
                </div>
              )}
            </div>

            {/* Submenu */}
            {expandedNav === item.name && item.children.length > 0 && (
              <div className="ml-6 mt-2 space-y-1">
                {item.children.map((child) => (
                  <div
                    key={child?.name}
                    className={`
                      py-2 px-4 rounded-md text-sm cursor-pointer
                      transition-all duration-200
                      ${currentPage === child.name 
                        ? 'text-black/95 bg-slate-50/90 font-medium' 
                        : 'text-gray-200 hover:text-white hover:bg-gray-700 hover:bg-opacity-50'
                      }
                    `}
                    onClick={() => handleChildClick(child)}
                  >
                    <span className="ml-2">{child?.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default EmployeeSidebaar;