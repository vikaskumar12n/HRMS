import React, { useEffect, useState } from "react";
import { Clock, LogIn, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import {
  useEmployeeCheckInMutation,
  useEmployeeChekOutMutation,
} from "../rtk/attendance";

const CheckInCheckOut = ({ user }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const [checkIn] = useEmployeeCheckInMutation();
  const [checkOut] = useEmployeeChekOutMutation();
console.log(user)
  // Load local storage on mount
  useEffect(() => {
    const savedTime = localStorage.getItem("checkInTime");
    if (savedTime) {
      setStartTime(savedTime);
      setIsCheckedIn(true);
    }
    getLocation();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isCheckedIn && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(startTime);
        const diff = new Date(now - start);
        const hrs = String(diff.getUTCHours()).padStart(2, "0");
        const mins = String(diff.getUTCMinutes()).padStart(2, "0");
        const secs = String(diff.getUTCSeconds()).padStart(2, "0");
        setElapsedTime(`${hrs}:${mins}:${secs}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, startTime]);

  // Get user location
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        toast.error("Location permission denied or unavailable");
      }
    );
  };

  const handleCheckIn = async () => {
    if (!location.latitude || !location.longitude) {
      toast.warning("Waiting for location... please allow GPS");
      return;
    }

    try {
      const checkInTime = new Date().toISOString();
      const payload = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const res = await checkIn({payload , id:user.registrationId}).unwrap();
      localStorage.setItem("checkInTime", checkInTime);
      setStartTime(checkInTime);
      setIsCheckedIn(true);
      toast.success("Checked In Successfully");
    } catch (err) {
      toast.error(`${err?.message} || 'Check-In Failed'`);
    }
  };

  const handleCheckOut = async () => {
    const confirm = window.confirm("Are you sure you want to Check Out?");
    if (!confirm) return;

    try {
      const res = await checkOut({ id: user._id }).unwrap();
      localStorage.removeItem("checkInTime");
      setIsCheckedIn(false);
      setElapsedTime("00:00:00");
      toast.success("Checked Out Successfully");
    } catch (err) {
      toast.error("Check-Out Failed");
    }
  };

  const handleButtonClick = () => {
    if (isCheckedIn) {
      handleCheckOut();
    } else {
      handleCheckIn();
    }
  };

  const isLocationReady = !!location.latitude && !!location.longitude;

  return (
    <div className="flex items-center">
      <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow">
        <button
          className={`px-6 py-2.5 flex items-center font-medium transition-all duration-200 transform hover:scale-105 shadow-sm text-white ${
            !isCheckedIn
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={handleButtonClick}
          disabled={!isCheckedIn && !isLocationReady}
        >
          {!isCheckedIn ? (
            <LogIn size={16} className="mr-2" />
          ) : (
            <LogOut size={16} className="mr-2" />
          )}
          <span className="hidden sm:inline">
            {!isCheckedIn ? "Check In" : "Check Out"}
          </span>
          <span className="sm:hidden">{!isCheckedIn ? "In" : "Out"}</span>
        </button>

        <div className="bg-white px-4 py-2.5 flex items-center border-l min-w-[120px]">
          <div className="relative flex items-center">
            <Clock size={16} className="text-blue-600 mr-2" />
            {isCheckedIn && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            )}
            <span className="font-mono text-blue-600 font-semibold text-sm">
              {elapsedTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInCheckOut;
