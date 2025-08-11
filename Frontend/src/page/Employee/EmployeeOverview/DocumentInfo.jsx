import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEdit3, FiEye, FiDownload, FiFileText } from 'react-icons/fi';
import { ArrowLeft, CheckCircle, FileText, Upload } from 'lucide-react';
import { useGetEmployeedocQuery } from '../../../rtk/employeeDoc';

const defaultFields = [
  { label: 'Aadhaar Card', name: 'aadhaar', required: true },
  { label: 'PAN Card', name: 'pan' },
  { label: 'Bank Passbook', name: 'passbook' },
  { label: 'High School Marksheet', name: 'highSchool' },
  { label: 'Graduation Marksheet', name: 'graduation' },
  { label: 'Salary Slips (if not fresher)', name: 'salarySlip' },
];

const DocumentInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: docData, isLoading, error } = useGetEmployeedocQuery({ id });

  const handleEdit = () => {
    navigate(`/dashboard/employee/edit/${id}?tab=other`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return <FileText className="w-5 h-5" />;
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return <FiFileText className="w-5 h-5 text-red-500" />;
    } else if (['jpg', 'jpeg', 'png'].includes(extension)) {
      return <FileText className="w-5 h-5 text-blue-500" />;
    }
    return <FileText className="w-5 h-5" />;
  };

  const getFileName = (url) => {
    if (!url) return 'Document';
    try {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1] || 'Document';
    } catch {
      return 'Document';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading documents...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto bg-white">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg">Error loading documents</div>
          <button 
            onClick={handleBack}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const hasAnyDocuments = docData && (
    defaultFields.some(field => docData[field.name]) || 
    (docData.customDocs && docData.customDocs.length > 0)
  );

  return (
    <div className="max-w-6xl mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Information</h1>
          <p className="text-gray-600 mt-1">View all uploaded documents</p>
        </div>
        
        <button
          onClick={handleEdit}
          className="flex items-center px-4 py-2 bg-[#06425F] text-white rounded-md hover:bg-[#053444] transition-colors font-medium"
        >
          <FiEdit3 className="w-4 h-4 mr-2" />
          Edit Documents
        </button>
      </div>

      {!hasAnyDocuments ? (
        <div className="text-center py-16">
          <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents Uploaded</h3>
          <p className="text-gray-600 mb-6">No documents have been uploaded yet.</p>
          <button
            onClick={handleEdit}
            className="flex items-center mx-auto px-6 py-3 bg-[#06425F] text-white rounded-md hover:bg-[#053444] transition-colors font-medium"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Documents
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Required Documents */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Required Documents
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {defaultFields.map((field) => (
                <div key={field.name} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </h3>
                  </div>
                  
                  {docData[field.name]?.secure_url ? (
                    <div className="space-y-3">
                      <div className="flex items-center bg-green-50 border border-green-200 rounded-md p-3">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                        <div className="flex-1">
                          <div className="flex items-center">
                            {getFileIcon(getFileName(docData[field.name].secure_url))}
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              {getFileName(docData[field.name].secure_url)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <a
                          href={docData[field.name].secure_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex cursor-pointer items-center justify-center px-3 py-2 bg-[#06425F] text-white text-sm font-medium rounded-md hover:bg-[#053444] transition-colors flex-1"
                        >
                          <FiEye className="w-4 h-4 mr-2" />
                          View
                        </a>
                        <a
                          href={docData[field.name].secure_url}
                          download
                          className="flex cursor-pointer items-center justify-center px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors flex-1"
                        >
                          <FiDownload className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md p-3">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"></div>
                        <span className="text-sm text-gray-500">Not uploaded</span>
                      </div>
                      <button
                        onClick={handleEdit}
                        className="w-full flex cursor-pointer items-center justify-center px-3 py-2 bg-[#06425F] text-white text-sm font-medium rounded-md hover:bg-[#053444] transition-colors"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Please Upload
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Custom Documents */}
          {docData.customDocs && docData.customDocs.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-green-600" />
                Additional Documents
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {docData.customDocs.map((doc, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-800">{doc.title}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center bg-green-50 border border-green-200 rounded-md p-3">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
                        <div className="flex-1">
                          <div className="flex items-center">
                            {getFileIcon(getFileName(doc.secure_url))}
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              {getFileName(doc.secure_url)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <a
                          href={doc.secure_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-3 py-2 bg-[#06425F] text-white text-sm font-medium rounded-md hover:bg-[#053444] transition-colors flex-1"
                        >
                          <FiEye className="w-4 h-4 mr-2" />
                          View
                        </a>
                        <a
                          href={doc.secure_url}
                          download
                          className="flex items-center justify-center px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors flex-1"
                        >
                          <FiDownload className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentInfo;