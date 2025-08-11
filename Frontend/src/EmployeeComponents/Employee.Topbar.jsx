// components/EmployeeTopbar.js
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  LogOut,
  Settings,
  Wifi,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useIsLogoutMutation } from "../rtk/login";
import { useUserContext } from "../page/UseContext/useContext";
import { logiDetail } from "../rtk/login";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserNotificationQuery } from "../rtk/notification";
import CheckInCheckOut from "./CheckInCheckOut";

const EmployeeTopbar = () => {
  const { user: userData, setUser } = useUserContext();
  const user = userData?.employeeeData;
  const [logoutApi, { isLoading: logOutLoading }] = useIsLogoutMutation();
  const dispatch = useDispatch();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const {
    data: NotificationData,
    isLoading: notifLoading,
    error: notifError,
  } = useGetUserNotificationQuery({ id: user?._id });
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getInitials = () => {
    if (user?.name) {
      return `${user?.name[0]}`;
    }
    return "U";
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logiDetail.util.resetApiState());
      setUser(null);
      localStorage.removeItem("userData");
      navigate("/");
      toast.success("Logout successful!");
    } catch (err) {
      toast.error(err.message || "Logout Failed. Please try again.");
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 lg:px-6 py-3">
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ">
             Employee Dashboard
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* <CheckInCheckOut user={user}/> */}

        <div className="flex items-center space-x-2">
          {/* <div className="hidden lg:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
            <div className="flex items-center space-x-1">
              <Wifi size={14} className={isOnline ? "text-green-500" : "text-red-500"} />
              <span className="text-xs font-medium text-gray-600">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div> */}

          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center hover:bg-gray-50 rounded-xl py-2 pl-3 pr-4 border border-transparent hover:border-gray-200 transition-all duration-200 hover:shadow-sm"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold">

                    {<img className="rounded-full object-cover" src={user.employeeImage.secure_url || user.employeeImage.public_id} alt='User Image'/> || getInitials()}

                    </span>
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
                className={`text-gray-500 transition-transform duration-200 ${
                  profileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl z-50 border border-gray-200 overflow-hidden">
                {/* <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-lg font-bold">{getInitials()}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                </div> */}

                <div className="borde border-gray-100">
                  <button
                    onClick={handleLogout}
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

export default EmployeeTopbar;
