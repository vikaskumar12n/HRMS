import React, { useState, useEffect } from 'react';
import { Edit, Save, X, Building, Users, Clock, MapPin, Calendar, DollarSign, User, Briefcase, UserCheck, Home } from 'lucide-react';

const WorkInfo = () => {
  // Mock data for demonstration - replace with actual API calls
  const [workData, setWorkData] = useState({
    department: 'Engineering',
    jobPosition: 'Senior Developer',
    shiftInformation: 'Day Shift (9 AM - 5 PM)',
    workType: 'Full Time',
    employeeType: 'Permanent',
    reportingManager: 'John Smith',
    company: 'Tech Solutions Inc',
    workLocation: 'New York Office',
    endDate: '',
    joiningDate: '2023-01-15',
    salary: '75000'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [workInfo, setWorkInfo] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (workData) {
      const workDetails = {
        department: workData?.department || 'N/A',
        jobPosition: workData?.jobPosition || 'N/A',
        shiftInformation: workData?.shiftInformation || 'N/A',
        workType: workData?.workType || 'N/A',
        employeeType: workData?.employeeType || 'N/A',
        reportingManager: workData?.reportingManager || 'N/A',
        company: workData?.company || 'N/A',
        workLocation: workData?.workLocation || 'N/A',
        endDate: workData?.endDate || 'N/A',
        joiningDate: workData?.joiningDate ? formatDate(workData.joiningDate) : 'N/A',
        salary: workData?.salary || 'N/A'
      };
      setWorkInfo(workDetails);
      setFormData(workDetails);
    }
  }, [workData]);

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString("en-IN");
    } catch (error) {
      return 'N/A';
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString || dateString === 'N/A') return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch (error) {
      return '';
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({ ...workInfo });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...workInfo });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updateData = {
        department: formData.department,
        jobPosition: formData.jobPosition,
        shiftInformation: formData.shiftInformation,
        workType: formData.workType,
        employeeType: formData.employeeType,
        reportingManager: formData.reportingManager,
        company: formData.company,
        workLocation: formData.workLocation,
        endDate: formData.endDate,
        joiningDate: formData.joiningDate,
        salary: formData.salary
      };

      setWorkInfo(formData);
      setIsEditing(false);
      setIsUpdating(false);
    } catch (error) {
      console.error('Failed to update work information:', error);
      setIsUpdating(false);
    }
  };

  const workFields = [
    { key: 'department', label: 'Department', icon: Building },
    { key: 'jobPosition', label: 'Job Position', icon: Briefcase },
    { key: 'shiftInformation', label: 'Shift Information', icon: Clock },
    { key: 'workType', label: 'Work Type', icon: Users },
    { key: 'employeeType', label: 'Employee Type', icon: User },
    { key: 'reportingManager', label: 'Reporting Manager', icon: UserCheck },
    { key: 'company', label: 'Company', icon: Building },
    { key: 'workLocation', label: 'Work Location', icon: MapPin },
    { key: 'endDate', label: 'End Date', icon: Calendar },
    { key: 'joiningDate', label: 'Joining Date', icon: Calendar },
    { key: 'salary', label: 'Salary', icon: DollarSign }
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="text-red-500 flex items-center">
          <X className="h-5 w-5 mr-2" />
          Error loading work information
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center">
          <Briefcase className="h-5 w-5 text-[#06425F] mr-2" />
          <h3 className="text-lg font-semibold text-[#06425F]">Work Information</h3>
          <div className="ml-2 h-2 w-2 bg-red-500 rounded-full"></div>
        </div>
        
        <div className="flex space-x-2">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="p-2 text-[#06425F] hover:bg-[#06425F]/10 rounded-lg transition-colors"
              title="Edit work information"
            >
              <Edit className="h-4 w-4" />
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                title="Save changes"
              >
                <Save className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Cancel changes"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Work Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workFields.map((field) => {
          const IconComponent = field.icon;
          return (
            <div key={field.key} className="space-y-2">
              <div className="flex items-center text-gray-600 text-sm">
                <IconComponent className="h-4 w-4 mr-2 text-[#06425F]" />
                {field.label}
              </div>
              
              {isEditing ? (
                <input
                  type={field.key === 'salary' ? 'number' : field.key.includes('Date') ? 'date' : 'text'}
                  value={field.key.includes('Date') && formData[field.key] !== 'N/A' 
                    ? formatDateForInput(formData[field.key])
                    : formData[field.key] === 'N/A' ? '' : formData[field.key]
                  }
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06425F]/20 focus:border-[#06425F] transition-colors"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              ) : (
                <div className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg min-h-[40px] flex items-center">
                  {workInfo[field.key]}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Update Status */}
      {isUpdating && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center text-[#06425F]">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#06425F] mr-3"></div>
            <span className="text-sm">Updating work information...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkInfo;