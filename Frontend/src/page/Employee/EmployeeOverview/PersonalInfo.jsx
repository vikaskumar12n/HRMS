import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Edit2, User, Mail, Phone, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { useGetOneEmployeeQuery } from '../../../rtk/employeeApi.js';

const PersonalInfo = ({ basePath = "/dashboard" }) => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetOneEmployeeQuery({ id });
  const navigate = useNavigate();
  console.log(data)
  
  const [personalData, setPersonalData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    children: '',
    qualification: '',
    experience: '',
    // Contact Info
    officialEmail: '',
    personalEmail: '',
    phoneNumber: '',
    alternatePhone: '',
    verified: false,
    // Address Info
    currentAddress: '',
    permanentAddress: '',
    country: '',
    state: '',
    city: '',
    // Emergency Contact
    emergencyContact: '',
    emergencyContactName: '',
    emergencyContactRelation: ''
  });

  useEffect(() => {
    if (data) {
      setPersonalData({
        name: data?.name || '',
        dateOfBirth: data?.dateOfBirth || '--',
        gender: data?.gender || '',
        bloodGroup: data?.bloodGroup || '',
        maritalStatus: data?.maritalStatus || '',
        children: data?.children || '',
        qualification: data?.qualification || '',
        experience: data?.experience || '',
        // Contact Info
        officialEmail: data?.workEmail || '',
        personalEmail: data?.email || '',
        phoneNumber: data?.mobile || '',
        alternatePhone: data?.alternatePhone || '',
        verified: data?.phoneVerified || true,
        // Address Info  
        currentAddress: data?.address || '',
        permanentAddress: data?.permanentAddress || data?.address || '',
        country: data?.country || '',
        state: data?.state || '',
        city: data?.city || '',
        // Emergency Contact
        emergencyContact: data?.emergencyContact || '',
        emergencyContactName: data?.emergencyContactName || '',
        emergencyContactRelation: data?.emergencyContactRelation || ''
      });
    }
  }, [data]);

  const handlePersonalEdit = (tab) => {
    navigate(`${basePath}/employee/edit/${id}?tab=personal`);
  };

 

  const handleAddressEdit = () => {
    navigate(`${basePath}/employee/edit/${id}?tab=address`);
  };

  const handleRetry = () => {
    refetch();
  };

  // Enhanced Loading Component
  const LoadingComponent = () => (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded-lg w-40"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-5 bg-gray-100 rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Enhanced Error Component
  const ErrorComponent = () => (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-red-200">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-red-600 mb-4">
            {error?.message || 'Failed to load personal information. Please try again.'}
          </p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Loader2 className="h-4 w-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );

  // Field Component for consistent styling
  const InfoField = ({ label, value, className = "" }) => (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <p className="text-sm text-gray-900 font-medium">
        {value || <span className="text-gray-400 italic">Not specified</span>}
      </p>
    </div>
  );

  const EmailField = ({ label, value }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <p className="text-sm text-blue-600 font-medium break-all hover:text-blue-700 transition-colors">
        {value || <span className="text-gray-400 italic">Not specified</span>}
      </p>
    </div>
  );

  const PhoneField = ({ label, value, verified = false }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-900 font-medium">
          {value || <span className="text-gray-400 italic">Not specified</span>}
        </p>
        {verified && value && (
          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-700 font-medium">Verified</span>
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-3" />
            <span className="text-lg text-gray-700 font-medium">Loading personal information...</span>
          </div>
          <LoadingComponent />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <ErrorComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Personal & Contact Information Combined */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            {/* <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Personal & Contact Information</h3>
                <p className="text-sm text-gray-500">Basic details and contact information</p>
              </div>
            </div> */}
             <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              Personal Details
            </h4>
            <button
              onClick={() => handlePersonalEdit('personal')}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
              title="Edit Personal Information"
            >
              <Edit2 className="h-4 w-4" />
              <span className="text-sm font-medium">Edit</span>
            </button>
          </div>
          
          {/* Personal Details */}
          <div className="mb-8">
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoField label="Full Name" value={personalData.name} />
              <InfoField label="Date of Birth" value={personalData.dateOfBirth} />
              <InfoField label="Gender" value={personalData.gender} />
              <InfoField label="Blood Group" value={personalData.bloodGroup} />
              <InfoField label="Marital Status" value={personalData.maritalStatus} />
              <InfoField label="Children" value={personalData.children} />
              <InfoField label="Qualification" value={personalData.qualification} />
              <InfoField label="Experience" value={personalData.experience} />
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              Contact Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EmailField label="Official Email ID" value={personalData.officialEmail} />
              <EmailField label="Personal Email ID" value={personalData.personalEmail} />
              <PhoneField 
                label="Phone Number" 
                value={personalData.phoneNumber} 
                verified={personalData.verified} 
              />
              <InfoField label="Alternate Phone Number" value={personalData.alternatePhone} />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
            
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">Address Information</h3>
            </div>
            <button
              onClick={handleAddressEdit}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-purple-50 rounded-lg transition-colors border border-blue-200"
              title="Edit Address Information"
            >
              <Edit2 className="h-4 w-4" />
              <span className="text-sm font-medium">Edit</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1  gap-8 mb-8">
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Address
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-900">
                  {personalData.currentAddress || <span className="text-gray-400 italic">Address not specified</span>}
                </p>
              </div>
            </div>
            {/* <div className="space-y-2">
              <h4 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Permanent Address
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-900">
                  {personalData.permanentAddress || <span className="text-gray-400 italic">Address not specified</span>}
                </p>
              </div>
            </div> */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoField label="Country" value={personalData.country} />
            <InfoField label="State" value={personalData.state} />
            <InfoField label="City" value={personalData.city} />
          </div>
        </div>

        {/* Emergency Contact */}
        {/* <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <Phone className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Emergency Contact</h3>
                <p className="text-sm text-gray-500">Emergency contact person details</p>
              </div>
            </div>
            <button
              onClick={handlePersonalEdit}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
              title="Edit Emergency Contact"
            >
              <Edit2 className="h-4 w-4" />
              <span className="text-sm font-medium">Edit</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoField label="Emergency Contact Number" value={personalData.emergencyContact} />
            <InfoField label="Contact Person Name" value={personalData.emergencyContactName} />
            <InfoField label="Relationship" value={personalData.emergencyContactRelation} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PersonalInfo;







// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { CheckCircle, Edit2 } from 'lucide-react';
// import { useGetOneEmployeeQuery } from '../../../rtk/employeeApi.js';

// const PersonalInfo = () => {
//   const { id } = useParams();
//   const { data, isLoading, error } = useGetOneEmployeeQuery({ id });
//   const navigate = useNavigate();
//   console.log(data)
//   const [personalData, setPersonalData] = useState({
//     name: '',
//     dateOfBirth: '',
//     gender: '',
//     bloodGroup: '',
//     maritalStatus: '',
//     children: '',
//     qualification: '',
//     experience: '',
//     // Contact Info
//     officialEmail: '',
//     personalEmail: '',
//     phoneNumber: '',
//     alternatePhone: '',
//     verified: false,
//     // Address Info
//     currentAddress: '',
//     permanentAddress: '',
//     country: '',
//     state: '',
//     city: '',
//     // Emergency Contact
//     emergencyContact: '',
//     emergencyContactName: '',
//     emergencyContactRelation: ''
//   });

//   useEffect(() => {
//     if (data) {
//       setPersonalData({
//         name: data?.name || '',
//         dateOfBirth: data?.dateOfBirth || '15/06/2002', // keeping your default
//         gender: data?.gender || '',
//         bloodGroup: data?.bloodGroup || '',
//         maritalStatus: data?.maritalStatus || '',
//         children: data?.children || '',
//         qualification: data?.qualification || '',
//         experience: data?.experience || '',
//         // Contact Info
//         officialEmail: data?.workEmail || '',
//         personalEmail: data?.email || '',
//         phoneNumber: data?.mobile || '',
//         alternatePhone: data?.alternatePhone || '',
//         verified: data?.phoneVerified || true,
//         // Address Info  
//         currentAddress: data?.address || '',
//         permanentAddress: data?.permanentAddress || data?.address || '',
//         country: data?.country || '',
//         state: data?.state || '',
//         city: data?.city || '',
//         // Emergency Contact
//         emergencyContact: data?.emergencyContact || '',
//         emergencyContactName: data?.emergencyContactName || '',
//         emergencyContactRelation: data?.emergencyContactRelation || ''
//       });
//     }
//   }, [data]);

//   const handlePersonalEdit = (tab) => {
//     // Navigate to personal info edit page
//     console.log('click hua')
//     navigate(`/dashboard/employee/edit/${id}?tab=personal`, );
//   };

//   const handleContactEdit = () => {
//     // Navigate to contact info edit page  
//     navigate(`/dashboard/employee/edit/${id}?tab=address`);
//   };

//   const handleAddressEdit = () => {
//     // Navigate to address edit page
//     navigate(`dashboard/employee/address/${id}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center p-8">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//         <span className="ml-2 text-gray-600">Loading personal information...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//         <p className="text-red-600">Error loading personal information: {error.message}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Personal Info Section */}
//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">PERSONAL INFO</h3>
//           <button
//             onClick={()=>handlePersonalEdit('personal')}
//             className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
//             title="Edit Personal Information"
//           >
//             <Edit2 className="h-4 w-4" />
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <label className="text-sm font-medium text-gray-700">Name</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.name || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Date of Birth</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.dateOfBirth || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Gender</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.gender || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Blood Group</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.bloodGroup || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Marital Status</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.maritalStatus || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Children</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.children || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Qualification</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.qualification || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Experience</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.experience || '-'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Contact Info Section */}
//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">CONTACT INFO</h3>
//           <button
//             onClick={handleContactEdit}
//             className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
//             title="Edit Contact Information"
//           >
//             <Edit2 className="h-4 w-4" />
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="text-sm font-medium text-gray-700">Official Email ID</label>
//             <p className="text-sm text-blue-600 mt-1 break-all">
//               {personalData.officialEmail || '-'}
//             </p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Personal Email ID</label>
//             <p className="text-sm text-blue-600 mt-1 break-all">
//               {personalData.personalEmail || '-'}
//             </p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Phone Number</label>
//             <div className="flex items-center gap-2 mt-1">
//               <p className="text-sm text-gray-900">{personalData.phoneNumber || '-'}</p>
//               {personalData.verified && personalData.phoneNumber && (
//                 <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
//               )}
//             </div>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Alternate Phone Number</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.alternatePhone || '-'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Addresses Section */}
//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">ADDRESSES</h3>
//           <button
//             onClick={handleAddressEdit}
//             className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
//             title="Edit Address Information"
//           >
//             <Edit2 className="h-4 w-4" />
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="text-sm font-medium text-gray-700">Current Address</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.currentAddress || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Permanent Address</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.permanentAddress || '-'}</p>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <label className="text-sm font-medium text-gray-700">Country</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.country || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">State</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.state || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">City</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.city || '-'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Emergency Contact Section */}
//       <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">EMERGENCY CONTACT</h3>
//           <button
//             onClick={handlePersonalEdit}
//             className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
//             title="Edit Emergency Contact"
//           >
//             <Edit2 className="h-4 w-4" />
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.emergencyContact || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Contact Name</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.emergencyContactName || '-'}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-700">Relation</label>
//             <p className="text-sm text-gray-900 mt-1">{personalData.emergencyContactRelation || '-'}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInfo;