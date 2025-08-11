import React, { useState, useEffect } from 'react';
import { Download, Calendar, Clock, CheckCircle, XCircle, TrendingUp, Loader2, IndianRupee } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useGetEarningsQuery} from '../../../rtk/employeePayroll';

const SalaryInfo = () => {
  const { id } = useParams();
  
  // Current date ko get karna aur max date set karna
  const currentDate = new Date();
  const maxMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  
  // Default selected month current month se set karna
  const [selectedMonth, setSelectedMonth] = useState(maxMonth);
  
  // Query parameters prepare karna
  const getQueryParams = (monthYear) => {
    const [year, month] = monthYear.split('-');
    return `month=${month}&year=${year}`;
  };
  
  const [queryParams, setQueryParams] = useState(getQueryParams(selectedMonth));
  const [slipLoading ,setSlipLoading ] = useState(false)
  // API calls
  const { data, isLoading, error } = useGetEarningsQuery({ id, date: queryParams });
  

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    setQueryParams(getQueryParams(newMonth));
  };
  const backend_url = import.meta.env.VITE_BACKEND_URL
const handleDownloadSlip = async () => {
  setSlipLoading(true)
  try {
    const [year, month] = selectedMonth.split('-');
    const response = await fetch(
      `${backend_url}/payroll/download/salary/slip/${id}?month=${month}&year=${year}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch salary slip");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SalarySlip_${selectedMonth}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download error:", err);
    alert("Failed to download salary slip");
  }
  finally{
    setSlipLoading(false)
  }
};

  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600 bg-green-50';
      case 'Not Paid':
        return 'text-red-600 bg-red-50';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading salary data for {selectedMonth}...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <XCircle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
              <p className="text-red-700 text-sm mt-1">
                {error?.data?.message || error?.message || "Failed to load salary information"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Data not found
  if (!data?.salaryDetail) {
    return (
      <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Monthly Earnings</h2>
            <p className="text-sm text-gray-600">Track your salary and attendance details</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Month Filter */}
            <div className="relative">
              <input 
                type='month'
                value={selectedMonth}
                max={maxMonth}
                onChange={handleMonthChange}
                className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Download Button */}
            <button
              onClick={handleDownloadSlip}
              disabled={slipLoading || salaryDetail.status === 'Pending' || salaryDetail.status === 'Not Paid'}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm ${
                slipLoading || salaryDetail.status === 'Pending' || salaryDetail.status === 'Not Paid'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-md'
              }`}
            >
              {slipLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {slipLoading ? 'Loading...' : 'Download Slip'}
            </button>
          </div>
        </div>
      </div>
 
      <div className="p-4 max-w-5xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-yellow-600" />
            <div>
              <h3 className="text-yellow-800 font-semibold">No Data Found</h3>
              <p className="text-yellow-700 text-sm mt-1">
                No salary information found for {selectedMonth}. Please select a different month.
              </p>
            </div>
          </div>
        </div>
      </div>
           </>
    );
  }
  
  const salaryDetail = data.salaryDetail;
  
  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Monthly Earnings</h2>
            <p className="text-sm text-gray-600">Track your salary and attendance details</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Month Filter */}
            <div className="relative">
              <input 
                type='month'
                value={selectedMonth}
                max={maxMonth}
                onChange={handleMonthChange}
                className="appearance-none bg-white border border-gray-200 rounded-lg gap-0 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Download Button */}
            <button
              onClick={handleDownloadSlip}
              disabled={slipLoading || salaryDetail.status === 'Pending' || salaryDetail.status === 'Not Paid'}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm ${
                slipLoading || salaryDetail.status === 'Pending' || salaryDetail.status === 'Not Paid'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-md'
              }`}
            >
              {slipLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {slipLoading ? ' ' : 'Download Slip'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Earnings Card */}
      <div className="bg-gradient-to-br from-[#06425F] to-[#083d56] rounded-xl shadow-lg p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <IndianRupee className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Base Salary</h3>
              <p className="text-blue-100 text-sm">Monthly compensation</p>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(salaryDetail.status)}`}>
            <div className="flex items-center gap-1 text-current">
              {salaryDetail.status === 'Paid' ? 
                <CheckCircle className="h-3 w-3" /> : 
                <XCircle className="h-3 w-3" />
              }
              {salaryDetail.status}
            </div>
          </div>
        </div>
        
        <div className="text-3xl font-bold mb-2">
          ₹{parseInt(salaryDetail.salary || 0).toLocaleString()}
        </div>
        <div className="text-blue-100 text-sm">
          Estimated Earning: ₹{parseInt(salaryDetail.estimate_salary || 0).toLocaleString()}
        </div>
      </div>

      {/* Attendance Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Days */}
        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Days</p>
              <p className="text-2xl font-bold text-gray-900">{salaryDetail.totalDays || 0}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Present Days */}
        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Present Days</p>
              <p className="text-2xl font-bold text-green-600">{salaryDetail.presentDays || 0}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${salaryDetail.totalDays > 0 ? (salaryDetail.presentDays / salaryDetail.totalDays) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Absent Days */}
        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Absent Days</p>
              <p className="text-2xl font-bold text-red-600">{salaryDetail.absentDays || 0}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${salaryDetail.totalDays > 0 ? (salaryDetail.absentDays / salaryDetail.totalDays) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Breakdown */}
      <div className="bg-white rounded-lg border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-[#06425F]" />
          <h3 className="text-lg font-semibold text-gray-900">Salary Breakdown</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-600">Base Salary</span>
            <span className="font-semibold text-gray-900">₹{parseInt(salaryDetail.salary || 0).toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-600">Deductions (Absent Days)</span>
            <span className="font-semibold text-red-600">
              -₹{(parseInt(salaryDetail.salary || 0) - parseInt(salaryDetail.estimate_salary || 0)).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 pt-3 border-t-2 border-gray-100">
            <span className="font-semibold text-gray-900">Net Salary</span>
            <span className="text-xl font-bold text-[#06425F]">
              ₹{parseInt(salaryDetail.estimate_salary || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryInfo;