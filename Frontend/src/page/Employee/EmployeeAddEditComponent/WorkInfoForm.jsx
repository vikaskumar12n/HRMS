import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetOneEmployeeWorkQuery,
  useWorkAddMutation,
  useWorkEditMutation
} from '../../../rtk/employeeworck';
import { toast } from 'react-toastify';
import { XCircle } from 'lucide-react';

const WorkInfoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);
  const { data: workData, isLoading: isFetching } = useGetOneEmployeeWorkQuery({ id }, { skip: !isEditMode });
  const [workAdd, { isLoading: isAdding }] = useWorkAddMutation();
  const [workEdit, { isLoading: isEditing }] = useWorkEditMutation();

  const [formData, setFormData] = useState({
    department: '',
    jobPosition: '',
    shiftInformation: '',
    workType: '',
    employeeType: '',
    reportingManager: '',
    company: '',
    workLocation: '',
    joiningDate: '',
    salary: ''
  });

  useEffect(() => {
    if (isEditMode && workData) {
      setFormData({
        ...workData,
        joiningDate: workData.joiningDate?.split('T')[0] || ''
      });
    }
  }, [workData, isEditMode]);
console.log(workData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode && workData ) {
        await workEdit({ id, data: formData }).unwrap();
        toast.success('Work info updated successfully!');
      } else {
        await workAdd({ id, data: formData }).unwrap();
        toast.success('Work info added successfully!');
        setFormData({
          department: '',
          jobPosition: '',
          shiftInformation: '',
          workType: '',
          employeeType: '',
          reportingManager: '',
          company: '',
          workLocation: '',
          joiningDate: '',
          salary: ''
        });
      }

      navigate(`/dashboard/employee/edit/${id}?tab=bank`);
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const isLoading = isFetching || isAdding || isEditing;

  return (
    <div className=" p-6 rounded  max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit' : 'Add'} Work Information</h2>

      {isLoading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Text Inputs */}
          {[
            { name: 'department', label: 'Department' },
            { name: 'jobPosition', label: 'Job Position' },
            { name: 'employeeType', label: 'Employee Type' },
            { name: 'reportingManager', label: 'Reporting Manager' },
            { name: 'company', label: 'Company' },
            { name: 'workLocation', label: 'Work Location' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Dropdowns */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shift Information</label>
            <select
              name="shiftInformation"
              value={formData.shiftInformation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Shift Type</option>
              <option value="Internship">Internship</option>
              <option value="Permanent">Permanent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Work Type</option>
              <option value="Remote">Remote</option>
              <option value="OnSite">OnSite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Date & Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              min={0}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter salary amount"
            />
          </div>

          {/* Submit */}
          <div className="flex col-span-2 justify-between bg-gray-50 py-3 px-2 border-t border-gray-200 gap-4 pt-4">
           
             <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center bg-gray-100 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 transition"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </button>
             <button
              type="submit"
              className="bg-[#06425F] hover:bg-[#3a5968] text-white px-4 py-2 rounded-md disabled:opacity-50"
              disabled={isLoading}
            >
              {isEditMode ? 'Update' : 'Add'} Work Info
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default WorkInfoForm;
