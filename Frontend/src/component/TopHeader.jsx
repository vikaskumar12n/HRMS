import {
  Bell,
  ChevronDown,
  Globe,
  MessageSquare,
  Settings,
  Menu,
  Clock,
  LogIn,
  LogOut,
  User,
  Wifi,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsLoginQuery, useIsLogoutMutation } from "../rtk/login";
import { useDispatch } from "react-redux";
import { logiDetail } from "../rtk/login.js"
import { toast } from "react-toastify";
import { useUserContext } from "../page/UseContext/useContext.jsx";
import { useGetNotificationQuery } from "../rtk/notification.js";


const TopHeader = () => {
  const { data: user, isLoading, Error } = useIsLoginQuery()
  const [logoutApi, { isLoading: logOutLoading }] = useIsLogoutMutation()
  const { data: notificationData } = useGetNotificationQuery();
  const dispatch = useDispatch()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [timer, setTimer] = useState(28547);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { setUser } = useUserContext()
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Demo timer effect
  useEffect(() => {
    if (!buttonStatus) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [buttonStatus]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const getInitials = () => {
    if (user?.name) {
      return `${user?.name[0]}`;
    }
    return "U";
  };

  const unreadCount = notificationData?.filter(n => !n.isRead).length;

  const handleLogOut = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logiDetail.util.resetApiState());
      setUser(null);
      localStorage.removeItem("userData");
      navigate("/");
      console.log("chal rha hai")
      toast.success("Logout successful!");
    } catch (err) {
      toast.error(err.message || "Logout Failed. Please try again.");
      console.error("Logout failed", err);
    }
  };

  function formateTime(isoString) {
    const date = new Date(isoString);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12AM/PM

    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return formattedTime;
  }


  console.log(notificationData);
  

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 lg:px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
                    <div className="hidden lg:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
            <div className="flex items-center space-x-1">
              <Wifi size={24} className={isOnline ? "text-green-500" : "text-red-500"} />
              <span className="text-xs font-medium text-gray-600">
                {isOnline ? "Active" : "Offline"}
              </span>
            </div>
      
          </div>

          {/* 
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ">
              Dashboard
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div> */}
        </div>

        {/* Center Section - Check In/Out (Employee Only) */}

        {user?.role == 'Admin' ? '' : (
          <div className="flex items-center">
            <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              {buttonStatus ? (
                <button
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-2.5 flex items-center font-medium transition-all duration-200 transform hover:scale-105 shadow-sm"
                  onClick={() => setButtonStatus(false)}
                >
                  <LogIn size={16} className="mr-2" />
                  <span className="hidden sm:inline">Check In</span>
                  <span className="sm:hidden">In</span>
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 flex items-center font-medium transition-all duration-200 transform hover:scale-105 shadow-sm"
                  onClick={() => setButtonStatus(true)}
                >
                  <LogOut size={16} className="mr-2" />
                  <span className="hidden sm:inline">Check Out</span>
                  <span className="sm:hidden">Out</span>
                </button>
              )}

              <div className="bg-white px-4 py-2.5 flex items-center border-l border-gray-200 min-w-[120px]">
                <div className="flex items-center">
                  <div className="relative">
                    <Clock size={16} className="text-blue-600 mr-2" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="font-mono text-blue-600 font-semibold text-sm">
                    {formatTime(timer)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Status Indicator */}


          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            {/* <button className="p-2.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105 relative group">
              <Settings size={18} />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Settings
              </span>
            </button> */}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105 relative group"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                    {unreadCount}
                  </span>
                )}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Notifications
                </span>
              </button>

              {notificationOpen && (
                <div onMouseLeave={() => setNotificationOpen(!notificationOpen)} className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-50 border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-300 bg-gradient-to-r from-blue-50 to-purple-50 ">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{unreadCount} unread messages</p>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {notificationData?.slice(0, 4).map((note, index) => (
                      <Link to={`/dashboard/${note?.url}`}
                        key={note._id || index}
                        className={`px-4 py-3 my-0.5 block border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${!note.isRead ? 'bg-blue-50 border-l-4 border-l-[#06425F] rounded-lg' : ''
                          }`}
                      >
                        <p className="text-sm text-gray-700 leading-relaxed">{note.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{formateTime(note.createdAt)}</p>
                      </Link>
                    ))}
                  </div>

                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                    <Link to='/dashboard/notification' className="text-xs text-[#06425F] hover:text-blue-700 font-medium">
                      View Detail notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* <button className="p-2.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105 relative group">
              <Globe size={18} />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Language
              </span>
            </button> */}

            {/* <button className="p-2.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105 relative group">
              <MessageSquare size={18} />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Messages
              </span>
            </button> */}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center hover:bg-gray-50 rounded-xl py-2 pl-3 pr-4 border border-transparent hover:border-gray-200 transition-all duration-200 hover:shadow-sm"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold">{getInitials()}</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>

              <div className="ml-3 mr-2 hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-700">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-50 bg-white rounded-xl shadow-xl z-50 border border-gray-200 overflow-hidden">
                {/* <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-lg font-bold">{getInitials()}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div> */}
                {user.role === 'Admin' && (
                  <div className="py-2">
                    {/* My Profile */}
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <User size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">My Profile</p>
                        <p className="text-xs text-gray-500">View your profile details</p>
                      </div>
                    </a>

                    {/* Edit Profile */}
                    <a
                      href="/profile/edit"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                        <Settings size={16} className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">Edit Profile</p>
                        <p className="text-xs text-gray-500">Change your profile information</p>
                      </div>
                    </a>
                  </div>
                )}





                <div className="border-t border-gray-100">
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <LogOut size={16} className="text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Sign Out</p>
                      <p className="text-xs text-red-400">Log out of your account</p>
                    </div>
                  </button>
                </div>



              </div>
            )}
          </div>





        </div>
      </div>
    </header>
  );
};

export default TopHeader;