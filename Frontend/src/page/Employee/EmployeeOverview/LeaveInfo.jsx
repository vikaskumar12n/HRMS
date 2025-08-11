import React, { useEffect, useState } from "react";
import { useGetLeaveQuery } from "../../../rtk/leaveApi";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import LeaveRequestModal from "./LeaveRequestModal";

function LeaveInfo() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const firstOfMonth = new Date();
  firstOfMonth.setDate(1);

  const [dateRange, setDateRange] = useState({
    from: firstOfMonth.toISOString().split("T")[0],
    to: todayStr,
  });

  const [filter, setFilter] = useState(
    `startDate=${dateRange.from}&endDate=${dateRange.to}`
  );
  const [dateError, setDateError] = useState("");

  const handleMonthChange = (e) => {
    const [year, month] = e.target.value.split("-");
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);
    const startStr = start.toISOString().split("T")[0];
    const endStr = end > today ? todayStr : end.toISOString().split("T")[0];

    setDateRange({ from: startStr, to: endStr });
  };

  useEffect(() => {
    if (dateRange.from > dateRange.to) {
      setDateError("Start date cannot be greater than end date");
      return;
    } else {
      setDateError("");
    }
    setFilter(`startDate=${dateRange.from}&endDate=${dateRange.to}`);
  }, [dateRange, id]);

  const {
    data: leaveDataRes,
    isLoading,
    error,
  } = useGetLeaveQuery({ id, range: filter });
  const leaveData = leaveDataRes || [];

  const handleExport = () => {
    if (leaveData.length <= 0) {
      alert("No Leave Data!");
      return;
    }

    const rows = leaveData.map((log) => ({
      "Leave Type": log.leaveType,
      "From Date": log.startDate,
      "To Date": log.endDate,
      Status: log.status,
      Reason: log.description,
      "Applied At": log.appliedAt,
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leave");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, `Leave_${dateRange.from}_to_${dateRange.to}.xlsx`);
  };

  const getLeaveStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleLeaveRequest = () => {
    setShowModal(!showModal)
  };

  return (
    <>
    {showModal && <LeaveRequestModal onClose={() => setShowModal(false)} />}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              LEAVE APPLICATIONS
            </h3>
            <div className="flex gap-10">
              <button
                onClick={handleLeaveRequest}
                className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700"
              >
                Request Leave
              </button>
              <button
                onClick={handleExport}
                className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-green-700"
              >
                Export Leave
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-gray-600">Select Month</span>
            <input
              type="month"
              onChange={handleMonthChange}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              max={todayStr.slice(0, 7)}
            />

            <span className="text-sm text-gray-600">OR Custom Date</span>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, from: e.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            />
            <span className="text-sm text-gray-600">to</span>
            <input
              type="date"
              value={dateRange.to}
              // max={todayStr}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, to: e.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            />
          </div>

          {dateError && (
            <div className="text-red-500 text-sm mt-2">{dateError}</div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Leave Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  From Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  To Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Reason
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Applied At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-red-500">
                    {error.message || "Failed to load data"}
                  </td>
                </tr>
              ) : leaveData.length ? (
                leaveData.map((leave) => (
                  <tr key={leave._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {leave.leaveType}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {leave.startDate?.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {leave.endDate?.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLeaveStatusColor(
                          leave.status
                        )}`}
                      >
                        {leave.status || '--'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {leave.reason || leave.description || '--'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {leave.appliedAt?.slice(0, 10)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No leave records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LeaveInfo;
