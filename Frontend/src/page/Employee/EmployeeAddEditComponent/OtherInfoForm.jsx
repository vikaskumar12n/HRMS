import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash2, FiEye, FiEdit3, FiUpload } from 'react-icons/fi';
import { XCircle, FileText, CheckCircle } from 'lucide-react';
import {
  useDocAddMutation,
  useDocUpdateMutation,
  useGetEmployeedocQuery,
} from '../../../rtk/employeeDoc';

const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

const defaultFields = [
  { label: 'Aadhaar Card', name: 'aadhaar', required: true },
  { label: 'PAN Card', name: 'pan' },
  { label: 'Bank Passbook', name: 'passbook' },
  { label: 'High School Marksheet', name: 'highSchool' },
  { label: 'Graduation Marksheet', name: 'graduation' },
  { label: 'Salary Slips (if not fresher)', name: 'salarySlip' },
];

const OtherInfoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: docData, isLoading: isFetching, refetch } = useGetEmployeedocQuery({ id });
  const [addDoc, { isLoading: isAdding }] = useDocAddMutation();
  const [updateDoc, { isLoading: isUpdating }] = useDocUpdateMutation();

  const [files, setFiles] = useState({});
  const [customFields, setCustomFields] = useState([{ label: '', file: null }]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (docData) {
      const existingDocs = docData;
      const prefill = {};
      defaultFields.forEach(field => {
        if (existingDocs[field.name]) {
          prefill[field.name] = existingDocs[field.name].secure_url;
        }
      });
      setFiles(prefill);
    }
  }, [docData]);

  const handleFileChange = (name, file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, JPG, PNG files are allowed');
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error('File must be under 1MB');
      return;
    }

    setFiles(prev => ({ ...prev, [name]: file }));
    toast.success(`${file.name} selected successfully`);
  };

  const handleCustomFieldChange = (index, type, value) => {
    const updated = [...customFields];
    updated[index][type] = value;
    setCustomFields(updated);
  };

  const addCustomField = () => {
    setCustomFields(prev => [...prev, { label: '', file: null }]);
  };

  const removeCustomField = (index) => {
    setCustomFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.aadhaar) {
      toast.error('Aadhaar Card is required');
      return;
    }

    // Validate custom fields
    for (const custom of customFields) {
      if (custom.label && !custom.file) {
        toast.error(`Please upload file for "${custom.label}"`);
        return;
      }
      if (custom.file && !allowedTypes.includes(custom.file.type)) {
        toast.error(`Invalid file type in "${custom.label}"`);
        return;
      }
      if (custom.file && custom.file.size > 1024 * 1024) {
        toast.error(`File too large in "${custom.label}"`);
        return;
      }
    }

    const formData = new FormData();
    formData.append('id', id);
    Object.keys(files).forEach(key => {
      if (files[key] instanceof File) {
        formData.append(key, files[key]);
      }
    });

    customFields.forEach((field, i) => {
      if (field.label && field.file) {
        formData.append(`customDocs[${i}][title]`, field.label);
        formData.append(`customDocs[${i}][file]`, field.file);
      }
    });

    try {
      if (docData) {
        const form = Object.fromEntries(formData.entries())
        console.log(form)
        await updateDoc({ id, formData }).unwrap();
        toast.success('Documents updated successfully!');
        refetch()
      } else {
        await addDoc({ id, formData }).unwrap();
        refetch()
        toast.success('Documents uploaded successfully!');
      }
    } catch (err) {
      toast.error(err.message || 'Upload failed. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-au">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Upload Documents</h2>
        <p className="text-gray-600 mt-1">Please upload the required documents to complete your profile</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Required Documents Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-[#06425F]" />
            Required Documents
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {defaultFields.map((field) => (
              <div key={field.name} className="bg-white rounded-lg border border-gray-200 p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  {field.label} 
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {/* If document already exists and not editing */}
                {files[field.name] && typeof files[field.name] === 'string' && !isEditMode ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">Document uploaded</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={files[field.name]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 py-2 bg-[#06425F] text-white text-sm font-medium rounded-md hover:bg-[#314b58] transition-colors"
                      >
                        <FiEye className="w-4 h-4 mr-2" />
                        View Document
                      </a>
                      <button
                        type="button"
                        onClick={() => setIsEditMode(true)}
                        className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition-colors"
                      >
                        <FiEdit3 className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange(field.name, e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-[#06425F] hover:file:bg-blue-100 border border-gray-300 rounded-md cursor-pointer"
                      />
                    </div>
                    {files[field.name] instanceof File && (
                      <div className="flex items-center bg-green-50 border border-green-200 rounded-md p-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <p className="text-sm text-green-800 font-medium">{files[field.name].name}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Documents Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiUpload className="w-5 h-5 mr-2 text-green-600" />
            Additional Documents
          </h3>
          
          <div className="space-y-4">
            {customFields.map((field, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Document Title (e.g., Experience Certificate)"
                      value={field.label}
                      onChange={(e) => handleCustomFieldChange(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) => handleCustomFieldChange(index, 'file', e.target.files[0])}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 border border-gray-300 rounded-md cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCustomField(index)}
                    className="flex items-center justify-center w-10 h-10 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
                {field.file && (
                  <div className="mt-3 flex items-center bg-green-50 border border-green-200 rounded-md p-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <p className="text-sm text-green-800 font-medium">{field.file.name}</p>
                  </div>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addCustomField}
              className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-[#06425F] transition-colors"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Another Document
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isFetching || isAdding || isUpdating}
            className="flex items-center px-8 py-3 bg-[#06425F] text-white rounded-md hover:bg-[#053444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {(isAdding || isUpdating) ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <FiUpload className="w-4 h-4 mr-2" />
                Submit Documents
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtherInfoForm;