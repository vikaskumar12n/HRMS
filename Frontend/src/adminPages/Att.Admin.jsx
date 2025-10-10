import React, { useEffect, useState } from "react";
import {
  Search,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAttendanceFilterQuery } from "../rtk/attendance.js"; 
import { ClipLoader } from "react-spinners";
import TableView from "../page/EmployeeAttendance/TableView.jsx";
// import CalendarView from "../page/EmployeeAttendance/CalendarView.jsx";
import CalendarViewDashboard from "../page/EmployeeAttendance/CalendarViewDashboadr.jsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AttAdmin = () => {
  const [activeView, setActiveView] = useState("table");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState(10);

  const [filter, setFilter] = useState("all");
  const { data: attendanceData,  isLoading } = useAttendanceFilterQuery(filter);
  const handleFilterChange = (date) => {
    const formatedDate = date.toISOString().split("T")[0];
    setFilter(`startDate=${formatedDate}&endDate=${formatedDate}`);
  };

  useEffect(() => {
    handleFilterChange(currentDate);
  }, [currentDate]);

  const isToday = currentDate.toDateString() === new Date().toDateString();

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
    handleFilterChange(newDate);
  };

  if (!attendanceData || isLoading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <ClipLoader size={30} color="blue" />
      </div>
    );
  }

  const handleExport = () => {
    try {
      console.log(attendanceData)
      // Map only necessary fields for Excel
      const exportData = attendanceData.map((record) => ({
        Date: record?.date ? new Date(record.date).toLocaleDateString() : "N/A",
        Name: record?.employee?.name || "",
        Email: record?.employee?.email || "",
        Mobile: record?.employee?.mobile || "",
        Status: record?.status || "N/A", 
        CheckIn: record?.checkIn ? "Yes" : "No",
        Leave: record?.leave ? "Yes" : "No",
        WorkingHours: record?.workingHours || "0h 0m 0s",
        LoginTime: record?.loginTime
          ? new Date(record.loginTime).toLocaleTimeString()
          : "—",
        LogoutTime: record?.logoutTime
          ? new Date(record.logoutTime).toLocaleTimeString()
          : "—",
      
      }));

      // Create worksheet & workbook
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "attendance");

      // Generate Excel file and trigger download
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `${new Date().toLocaleDateString()}_AttendanceData.xlsx`);
    } catch (err) {
      console.error("Excel Export Error:", err.message);
    }
  };

  return (
    <div className="p-3 bg-gray-50 h-fit">
      
      <div className="w-full">
        <CalendarViewDashboard
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>      
    </div>
  );
};

export default AttAdmin;