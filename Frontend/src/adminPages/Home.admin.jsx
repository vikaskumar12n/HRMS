import React from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Award,
  Building,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  IndianRupee,
  Gift,
  Bell,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useBirthdayEmployeeQuery, useGetAllEmployeeQuery } from '../rtk/employeeApi';
import { useNavigate } from 'react-router-dom';
import { useGetWeeklayCharQuery } from '../rtk/attendance';
import { useGetAllAnnouncementsQuery } from '../rtk/announcementApi';
import CalendarView from '../page/EmployeeAttendance/CalendarView';
import AttendanceLogs from '../page/EmployeeAttendance/AttendanceLogs';
import AttAdmin from './Att.Admin';
import { useGetNotificationQuery } from '../rtk/notification';
import { useGetLeaveTodayQuery } from '../rtk/leaveApi';

const AdminHome = () => {
  const { data: employeeData, isLoading } = useGetAllEmployeeQuery()
  const {data:LeaveToday}=useGetLeaveTodayQuery();
  const { data: weeklyCharData, isLoading: charLoading } = useGetWeeklayCharQuery()
  const { data: announcements, isLoading: announcementloading } = useGetAllAnnouncementsQuery();
  const { data: birthday, isLoading: birthdayLoading } = useBirthdayEmployeeQuery();
  const { data: notificationData, isLoading: notificationLoading, error } = useGetNotificationQuery();
  const navigate = useNavigate();
  const attendanceData = weeklyCharData || [];

  console.log("leave today",LeaveToday);
  
  // const attendanceData = [
  //   { name: 'Mon', present: 85, absent: 15 },
  //   { name: 'Tue', present: 88, absent: 12 },
  //   { name: 'Wed', present: 82, absent: 18 },
  //   { name: 'Thu', present: 90, absent: 10 },
  //   { name: 'Fri', present: 87, absent: 13 },
  //   { name: 'Sat', present: 75, absent: 25 },
  //   { name: 'Sun', present: 70, absent: 30 }
  // ];

  const performanceData = [
    { month: 'Jan', performance: 78 },
    { month: 'Feb', performance: 82 },
    { month: 'Mar', performance: 85 },
    { month: 'Apr', performance: 88 },
    { month: 'May', performance: 90 },
    { month: 'Jun', performance: 87 }
  ];

  const departmentData = [
    { name: 'Engineering', value: 100, color: '#06425F' },
    { name: 'HR', value: 0, color: '#0891b2' },
    { name: 'Sales', value: 0, color: '#06b6d4' },
    { name: 'Marketing', value: 0, color: '#67e8f9' }
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'submitted leave request', time: '2 hours ago' },
    { id: 2, user: 'Sarah Wilson', action: 'completed onboarding', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'updated profile', time: '6 hours ago' },
    { id: 4, user: 'Emily Davis', action: 'clock out', time: '1 day ago' }
  ];

  const StatCard = ({ title, value, icon: Icon, positive = true, borderColor = "green" }) => {
    const getBorderColorClass = (color) => {
      const colors = {
        green: "border-t-green-500",
        orange: "border-t-orange-500",
        blue: "border-t-blue-500",
        purple: "border-t-purple-500",
        red: "border-t-red-500",
        yellow: "border-t-yellow-500"
      };
      return colors[color] || "border-t-green-500";
    };

    return (
      <div className={`bg-white p-6 rounded-lg shadow-sm border-t-4 ${getBorderColorClass(borderColor)}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-full">
            <Icon className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>
    );
  };






  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening in your organization.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Employees"
          value={employeeData?.summary?.totalEmployees}
          icon={Users}
          borderColor="green"
        />
        <StatCard
          title="Present Today"
          value={employeeData?.summary?.present}
          icon={UserCheck}
          borderColor="orange"
        />
        <StatCard
          title="On Leave Today"
          value={employeeData?.summary?.onLeave}
          icon={Calendar}
          positive={false}
          borderColor="blue"
        />
        <StatCard
          title="Monthly Payroll"
          value={employeeData?.summary?.totalSalary}
          icon={IndianRupee}
          borderColor="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 ">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <AttAdmin />
        </div>



        <div className='flex flex-col gap-3 '>

          <div className="relative bg-white rounded-lg shadow-md p-2 border border-gray-200">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 ">
              <div className="bg-pink-100 p-2 rounded-full">
                <Gift className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 ">Today's Birthdays</h3>
              <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                {Array.isArray(birthday) && birthday.length > 0 ? birthday.length : 0}
              </span>
            </div>

            {/* Birthday List */}
            <div className="space-y-3">
              {Array.isArray(birthday) && birthday.length > 0 ? (
                birthday.map((val, index) => {
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {val?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{val?.name}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Birthday Today
                          </p>
                        </div>
                      </div>
                      <div className="text-2xl">🎂</div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No birthdays today</p>
                  <p className="text-sm">Check back tomorrow!</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {Array.isArray(birthday) && birthday.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 text-center">
                  🎉 Don't forget to wish them a happy birthday!
                </p>
              </div>
            )}
          </div>

        
          {/* notification */}
          <div className="bg-white p-2 rounded-lg shadow-2xl min-h-[10vh]">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <div className="bg-[#06425F] bg-opacity-10 p-2 rounded-full">
                  <Bell className="w-4 h-4 text-[#06425F]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              </div>
              {Array.isArray(notificationData) && notificationData.length > 0 && (
                <span className="bg-[#06425F] text-white text-xs px-2 py-1 rounded-full">
                  {notificationData.length}
                </span>
              )}
            </div>

            <div className="space-y-1">
              {Array.isArray(notificationData) && notificationData.length > 0 ? (
                notificationData
                  .slice(0, 5) // Only show first 5 notifications
                  .map((activity) => (
                    <div key={activity?._id} className="flex items-start space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-[#06425F] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 line-clamp-2">
                          <span className="font-medium">{activity?.message}</span>
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No Notifications yet</p>
                  <p className="text-sm">Check back later for updates</p>
                </div>
              )}
            </div>

            {Array.isArray(notificationData) && notificationData.length > 0 && (
              <button
                onClick={() => navigate("/dashboard/notification")}
                className="w-full cursor-pointer mt-4 text-sm text-[#06425F] hover:bg-gray-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 group"
              >
                View All Notifications
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

         {/* Announcements */}

          <div className="bg-white p-1 rounded-lg shadow-2xl min-h-[20vh]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#06425F] bg-opacity-10 p-2 rounded-full">
                  <Bell className="w-4 h-4 text-[#06425F]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Announcements</h3>
              </div>
              {Array.isArray(announcements) && announcements.length > 0 && (
                <span className="bg-[#06425F] text-white text-xs px-2 py-1 rounded-full">
                  {announcements.length}
                </span>
              )}
            </div>

            <div className="space-y-1">
              {Array.isArray(announcements) && announcements.length > 0 ? (
                announcements
                  .map((activity) => (
                    <div key={activity?._id} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-[#06425F] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="text-sm text-gray-900 line-clamp-1">
                          <span className="font-medium">{activity?.message}</span>
                        </p>
                        {/* <p className="text-xs text-gray-500">{activity.time}</p> */}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No announcements yet</p>
                  <p className="text-sm">Check back later for updates</p>
                </div>
              )}
            </div>

            {Array.isArray(announcements) && announcements.length > 0 && (
              <button
                onClick={() => navigate("/dashboard/announcement")}
                className="w-full cursor-pointer mt-4 text-sm text-[#06425F] hover:bg-gray-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 group"
              >
                View All Announcements
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
          
          {/* leave */}

         <div className="bg-white p-1 rounded-lg shadow-2xl min-h-[20vh]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#06425F] bg-opacity-10 p-2 rounded-full">
                  <Bell className="w-4 h-4 text-[#06425F]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Today Leave</h3>
              </div>
              {Array.isArray(LeaveToday) && LeaveToday.length > 0 && (
                <span className="bg-[#06425F] text-white text-xs px-2 py-1 rounded-full">
                  {LeaveToday.length}
                </span>
              )}
            </div>

            <div className="space-y-0">
              {Array.isArray(LeaveToday) && LeaveToday.length > 0 ? (
                LeaveToday
                  .map((activity) => (
                    <div key={activity?._id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-[#06425F] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 line-clamp-2">
                          <span className="font-medium">{activity?.employeeName} has applied for leave today.</span>
                        </p>
                        {/* <p className="text-xs text-gray-500">{activity.time}</p> */}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No one has applied for leave today.</p>
                  <p className="text-sm">Check back later for updates</p>
                </div>
              )}
            </div>

            {Array.isArray(announcements) && announcements.length > 0 && (
              <button
                onClick={() => navigate("/dashboard/leave/logs")}
                className="w-full cursor-pointer mt-4 text-sm text-[#06425F] hover:bg-gray-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 group"
              >
                View All Leave
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
          {/* Department Distribution */}
          {false &&
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Department Distribution</h3>
                {/* <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" /> */}
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: dept.color }}
                      ></div>
                      <span className="text-gray-600">{dept.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{dept.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
      </div>


      {false &&
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-fit">

          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance Trend</h3>
              {/* <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" /> */}
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#06425F"
                  strokeWidth={3}
                  dot={{ fill: '#06425F', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}



        </div>
      }

      {/* Quick Actions */}

    </div>
  );
};

export default AdminHome;