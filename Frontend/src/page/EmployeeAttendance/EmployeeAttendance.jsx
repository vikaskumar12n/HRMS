import React, { useState } from "react";
import TableComponent from "../../helper/TableComponent";
import { ClipLoader } from "react-spinners";
import { useAttendanceFilterQuery } from "../../rtk/attendance.js";
import { saveAs } from "file-saver";
import { unparse } from "papaparse";
export default function EmployeeAttendance() {
  const [filter, setFilter] = useState("all");

  // ✅ Now passing filter value to query
  const { data, isLoading } = useAttendanceFilterQuery(filter);
console.log("attadane is",data)
  // console.log("Theme Colors:", data);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Attendance Date", accessor: "date" },
    { header: "checkIn", accessor: "checkIn" },
    { header: "checkOut", accessor: "checkOut" },
    { header: "total workingHout", accessor: "totalworkingHout" },
    { header: "status", accessor: "status" },
  ];

  const formattedData =
    data?.map((emp) => {
      let checkIn = emp?.loginTime
        ? new Date(emp.loginTime).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "N/A";
      let checkOut = emp?.logoutTime
        ? new Date(emp.logoutTime).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "N/A";
      let totalworkingHout = emp?.workingHours || "N/A";
      let status = emp?.status || "Absent";
      let date = emp?.createdAt
      ? `${new Date(emp.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}`
      : "N/A";

      return {
        name: emp?.employee?.name || "N/A",
        email: emp?.employee?.email || "N/A",
        mobile: emp?.employee?.mobile ? `${emp.employee.mobile}` : "N/A",
        date:date,
        checkIn,
        checkOut,
        totalworkingHout,
        status,
      };
    }) || [];

  if (isLoading) {
    <div className="flex justify-center h-full">
      <ClipLoader size={30} color="blue" />
    </div>;
  }

  const handlePrint = () => {
    if (!formattedData || formattedData.length === 0) {
      alert("No data to export");
      return;
    }
  
    const csv = unparse(formattedData, {
      fields: [
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "Mobile", value: "mobile" },
        { label: "Attendance Date", value: "date" },
        { label: "Check-In", value: "checkIn" },
        { label: "Check-Out", value: "checkOut" },
        { label: "Total Working Hours", value: "totalworkingHout" },
        { label: "Status", value: "status" },
      ],
    });
       console.log(csv);
       
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Attendance_Report.csv");
  };
  

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-end mb-4 gap-1.5">
          
          <select
            className="border px-4 py-2 rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="1">Today</option>
            <option value="7daya">Last 7 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="all">All</option>
          </select>
          <button
            onClick={handlePrint}
            className="bg-[#075370] text-white px-4 py-2 rounded-md hover:bg-[#075390]"
          >
            Export to Excel
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="blue" size={30} />
        </div>
      ) : (
        <TableComponent
          columns={columns}
          data={formattedData}
          itemsPerPage={10}
        />
      )}
    </div>
  );
}





