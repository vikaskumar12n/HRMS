import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useEmployeeAttendanceQuery } from '../../../rtk/attendance';
import { useParams } from 'react-router-dom';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function AttendanceInfo() {
  const { id } = useParams();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const firstOfMonth = new Date();
  firstOfMonth.setDate(1);

  const [dateRange, setDateRange] = useState({
    from: firstOfMonth.toISOString().split('T')[0],
    to: todayStr
  });

  const [filter, setFilter] = useState(`startDate=${dateRange.from}&endDate=${dateRange.to}`);
  const [dateError, setDateError] = useState('');


  const handleMonthChange = (e) => {
    const [year, month] = e.target.value.split('-');
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);
    const startStr = start.toISOString().split('T')[0];

    const endStr = end > today ? todayStr : end.toISOString().split('T')[0];

    setDateRange({ from: startStr, to: endStr });
  };


  useEffect(() => {
    if (dateRange.from > dateRange.to) {
      setDateError("Start date cannot be greater than end date");
      return;
    } else {
      setDateError('');
    }
    setFilter(`startDate=${dateRange.from}&endDate=${dateRange.to}`);
  }, [dateRange, id]);

  const { data, isLoading, error } = useEmployeeAttendanceQuery({ id, range: filter });

  const mapStatus = (status, leave) => {
    if (status === 'present') return 'P';
    if (status === 'absent' && leave) return 'L';
    if (status === 'absent') return 'A';
    if (status === 'half') return 'HL';
    return 'NA';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'P': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-red-100 text-red-800';
      case 'L': return 'bg-blue-100 text-blue-800';
      case 'HL': return 'bg-yellow-100 text-yellow-800';
      case 'NA': return 'bg-gray-50 text-gray-400';
      default: return 'bg-gray-50 text-gray-400';
    }
  };

  const handleExport = () => {
    if(data?.attendance <= 0){
        alert('No Attendance Data!')
        return;
    }
    const rows = data?.attendance?.map((log) => ({
      Date: log.createdAt,
      Status: mapStatus(log.status, log.leave),
      "In Time": log.loginTime ? new Date(log.loginTime).toLocaleTimeString() : '--',
      "Out Time": log.logoutTime ? new Date(log.logoutTime).toLocaleTimeString() : '--',
      "Work Duration": log.totalWorkingHour || '--',
      "Overtime": log.otTime || '--',
      "Break Duration": log.breakDuration || '--',
      "Checked In": log.checkIn ? 'Yes' : 'No'
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, `Attendance_${dateRange.from}_to_${dateRange.to}.xlsx`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Logs</h3>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 text-sm rounded hover:bg-green-700"
          >
            Export Excel
          </button>
        </div>

        {/* Month-Year Selector */}
        <div className="flex items-center gap-4 mb-4">
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
            onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
          <span className="text-sm text-gray-600">to</span>
          <input
            type="date"
            value={dateRange.to}
            max={todayStr}
            onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
        </div>

        {dateError && (
          <div className="text-red-500 text-sm mb-2">{dateError}</div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">In Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Out Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Work Duration</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Overtime</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Break Duration</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Check-in</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr><td colSpan="9" className="text-center p-4 text-gray-500">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="9" className="text-center p-4 text-red-500">Failed to load data</td></tr>
            ) : data?.attendance?.length ? (
              data.attendance.map((log) => {
                const statusCode = mapStatus(log.status, log.leave);
                return (
                  <tr key={log._id}>
                    <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                    <td className="px-4 py-3 text-sm">{log.createdAt}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(statusCode)}`}>
                        {statusCode}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{log.loginTime ? new Date(log.loginTime).toLocaleTimeString() : '--'}</td>
                    <td className="px-4 py-3 text-sm">{log.logoutTime ? new Date(log.logoutTime).toLocaleTimeString() : '--'}</td>
                    <td className="px-4 py-3 text-sm">{log.totalWorkingHour || '--'}</td>
                    <td className="px-4 py-3 text-sm">{log.otTime || '--'}</td>
                    <td className="px-4 py-3 text-sm">{log.breakDuration || '--'}</td>
                    <td className="px-4 py-3 text-sm">{log.checkIn ? 'Yes' : 'No'}</td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="9" className="text-center p-4 text-gray-500">No attendance records found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-sm text-gray-600">
        <div className="mb-2">* Status Legend:</div>
        <div>P: Present, A: Absent, L: Leave, HL: Half day leave, NA: Not Available</div>
      </div>
    </div>
  );
}

export default AttendanceInfo;
