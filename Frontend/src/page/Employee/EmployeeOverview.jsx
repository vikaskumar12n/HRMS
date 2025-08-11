import React, { useEffect, useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Briefcase,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  PhoneCallIcon,
  IndianRupee,
  FileText
} from 'lucide-react';
import PersonalInfo from './EmployeeOverview/PersonalInfo';
import WorkInfo from './EmployeeOverview/WorkInfo';
import { useGetOneEmployeeQuery } from '../../rtk/employeeApi.js';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AttendanceInfo from './EmployeeOverview/AttendanceInfo.jsx';
import LeaveInfo from './EmployeeOverview/LeaveInfo.jsx';
import DocumentInfo from './EmployeeOverview/DocumentInfo.jsx';
import SalaryInfo from './EmployeeOverview/SalaryInfo.jsx';
const EmployeeOverview = ({ basePath = "/dashboard" }) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
    const { data: employeeData, isLoading, error } = useGetOneEmployeeQuery({ id });
  const [activeTab, setActiveTab] = useState(tab || 'personal');
const navigate = useNavigate()
  const teamProjects = [
    { name: 'HRMS Application', status: 'In Progress', role: 'Frontend Developer', completion: 75 },
    { name: 'Employee Portal', status: 'Completed', role: 'Full Stack Developer', completion: 100 },
    { name: 'Attendance System', status: 'Planning', role: 'Backend Developer', completion: 25 }
  ];

 
  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    // { id: 'team', label: 'Team & Projects', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'leaves', label: 'Leaves', icon: Calendar },
    { id: 'salary', label: 'Earnings', icon: IndianRupee },
    { id: 'documents', label: 'Documents', icon: FileText },
    // { id: 'other', label: 'Other Details', icon: User }
  ];

  const TeamProjects = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">TEAM & PROJECTS</h3>
      <div className="space-y-4">
        {teamProjects.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{project.name}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Role: {project.role}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.completion}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{project.completion}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );




  const OtherDetails = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">OTHER DETAILS</h3>
      <p className="text-gray-600">Additional information will be displayed here.</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfo />;
      case 'work': return <WorkInfo />;
      case 'team': return <TeamProjects />;
      case 'attendance': return <AttendanceInfo />;
      case 'leaves': return <LeaveInfo />;
      case 'documents': return <DocumentInfo />;
      case 'salary': return <SalaryInfo />;
      case 'other': return <OtherDetails />;
      default: return <PersonalInfo />;
    }
  };

  const handletab = (tabId) =>{
    setActiveTab(tabId)
    navigate(`${basePath}/employee/overview/${id}?tab=${tabId}`)
  }
useEffect(() => {
  if (tab) {
    setActiveTab(tab);
  }
}, [tab]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#06425F] text-white p-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-green-200 rounded-full overflow-hidden">
            <img
              src={employeeData?.employeeImage?.secure_url || employeeData?.employeeImage?.public_id }
              alt={employeeData?.name}
              className="w-full h-full border-2 rounded-full border-white/80 p-1 bg-[#06425F] object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${employeeData?.name}&background=10b981&color=fff&size=120`;
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{employeeData?.name}</h1>
            {/* <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                {employeeData.status}
              </span>
            </div> */}
            <div className="flex items-center gap-2 mt-2 text-sm">
              <Mail className="h-4 w-4" />
              <span>{employeeData?.email}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <PhoneCallIcon className="h-4 w-4" />
              <span>{employeeData?.mobile}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky -top-5 z-10">
        <div className="flex overflow-x-auto">
          {tabs.length <=0 && ('') }
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handletab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#06425F] text-[#06425F] bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default EmployeeOverview;