import { useState } from 'react';
import { ChevronDown, ChevronRight, LayoutDashboard, UserPlus, Rocket, Users, FileText, Clock, Calendar, Settings, Bell, Globe, MessageSquare, LogOut, Plus, ChevronLeft } from 'lucide-react';
import SideBar from './SideBar';
import TopHeader from './TopHeader';

const  DashboardLayout=()=> {
  const [expandedNav, setExpandedNav] = useState('Employee');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('Dashboard');

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

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, children: [] },
    { name: 'Recruitment', icon: <UserPlus size={20} />, children: [] },
    { name: 'Onboarding', icon: <Rocket size={20} />, children: [] },
    { 
      name: 'Employee', 
      icon: <Users size={20} />, 
      children: [
        'Profile',
        'Employees',
        'Document Requests',
        'Shift Requests',
        'Work Type Requests',
        'Rotating Shift Assign',
        'Rotating Work Type Assign',
        'Disciplinary Actions',
        'Policies',
        'Organization Chart'
      ] 
    },
    { name: 'Attendance', icon: <Clock size={20} />, children: [] },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
   

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
 

        {/* Dynamic Content Area based on currentPage */}
        <main className="flex-1 overflow-y-auto p-4">
          {currentPage === 'Dashboard' && <DashboardContent />}
          {currentPage === 'Attendance' && <AttendanceContent />}
          {currentPage === 'Recruitment' && <GenericPageContent title="Recruitment" />}
          {currentPage === 'Onboarding' && <GenericPageContent title="Onboarding" />}
          {['Profile', 'Employees', 'Document Requests', 'Shift Requests', 'Work Type Requests', 
            'Rotating Shift Assign', 'Rotating Work Type Assign', 'Disciplinary Actions', 
            'Policies', 'Organization Chart'].includes(currentPage) && 
            <GenericPageContent title={currentPage} />
          }
        </main>
      </div>
    </div>
  );
}

// Dashboard content component
function DashboardContent() {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-md shadow-sm border-t-4 border-green-500">
          <h3 className="text-sm text-gray-600 mb-2">New Joining Today</h3>
          <p className="text-5xl font-bold">0</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border-t-4 border-orange-500">
          <h3 className="text-sm text-gray-600 mb-2">New Joining This Week</h3>
          <p className="text-5xl font-bold">0</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border-t-4 border-blue-400">
          <h3 className="text-sm text-gray-600 mb-2">Total Strength</h3>
          <p className="text-5xl font-bold">35</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Work Type Requests */}
        <div className="col-span-3 bg-white p-4 rounded-md shadow-sm">
          <h3 className="font-medium mb-6">Work Type Requests To Approve</h3>
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <div className="mb-4">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9l6 6M15 9l-6 6" />
              </svg>
            </div>
            <p>No records available at the moment.</p>
          </div>
        </div>

        {/* Attendance To Validate */}
        <div className="col-span-2 bg-white p-4 rounded-md shadow-sm">
          <h3 className="font-medium mb-4">Attendance To Validate</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-2">Employee</th>
                <th className="pb-2">At Work</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      <span className="text-sm">SA</span>
                    </div>
                    <div>
                      <p className="text-sm">Sanket</p>
                      <p className="text-xs text-gray-500">Armarkar (SKY0001)</p>
                    </div>
                  </div>
                </td>
                <td className="py-2">00:30</td>
                <td className="py-2">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded">
                    Validate
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-6">
            <button className="text-gray-500">
              <ChevronLeft size={20} />
            </button>
            <div className="h-2 bg-gray-200 rounded-full w-full mx-4">
              <div className="h-2 bg-gray-400 rounded-full w-1/3"></div>
            </div>
            <button className="text-gray-500">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="mt-6 bg-white p-4 rounded-md shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Announcements</h3>
          <button className="text-gray-400 hover:bg-gray-100 p-1 rounded">
            <Plus size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <div className="mb-4">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 10c0 3.976-3.582 7-8 7s-8-3.024-8-7 3.582-7 8-7 8 3.024 8 7z" />
              <path d="M12 17v4M8 21h8" />
            </svg>
          </div>
          <p className="text-center">No Announcements to show.</p>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout





