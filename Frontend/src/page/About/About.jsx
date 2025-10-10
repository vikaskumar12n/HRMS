import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Building2, MapPin, Users, Award, Target, Globe, Mail, Phone, Globe2, Upload, X } from 'lucide-react';
import {
  useGetAllProfilesQuery,
  useAddProfileMutation,
  useUpdateProfileMutation
} from '../../rtk/profileApi'
import { data } from 'react-router-dom';

const ProfileManagement = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [profileData, setProfileData] = useState({
    companyName: '',
    brandName: '',
    companyOfficialEmail: '',
    companyOfficialContact: '',
    website: '',
    domainName: '',
    industryTypes: [],
    logo: {
      public_id: '',
      secure_url: ''
    },
    registeredOffice: '',
    corporateOffice: '',
    customAddress: ''
  });

  const [tempIndustry, setTempIndustry] = useState('');
  const [errors, setErrors] = useState({});

  const primaryColor = '#06425F';
  const primaryColorLight = '#06425F20';
  const primaryColorDark = '#043344';

  // Redux API hooks
  const { data: profiles, isLoading, error, refetch } = useGetAllProfilesQuery();
  const [addProfile, { isLoading: isAdding }] = useAddProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();






  // Sample industry options
  const industryOptions = [
    'Web Development',
    'Software Development',
    'E-commerce',
    'Digital Marketing',
    'IT Consulting',
    'Mobile App Development',
    'Cloud Solutions',
    'Data Analytics',
    'Cybersecurity',
    'AI/ML Solutions'
  ];

  // Load profile data when profiles are fetched - backend already sends first index by default
  useEffect(() => {
    console.log("helli babu", profiles);
    if (profiles) {
      const firstProfile = profiles; // Backend se first index aa raha hai
      setProfileData({
        companyName: firstProfile?.companyName || '',
        brandName: firstProfile?.brandName || '',
        companyOfficialEmail: firstProfile?.companyOfficialEmail || '',
        companyOfficialContact: firstProfile?.companyOfficialContact || '',
        website: firstProfile?.website || '',
        domainName: firstProfile?.domainName || '',
        industryTypes: firstProfile?.industryTypes || [],
        logo: {
          public_id: firstProfile?.logo?.public_id || '',
          secure_url: firstProfile?.logo?.secure_url || ''
        },
        registeredOffice: firstProfile?.registeredOffice || '',
        corporateOffice: firstProfile?.corporateOffice || '',
        customAddress: firstProfile?.customAddress || ''
      });
      setProfileId(firstProfile?._id);
    }
  }, [profiles]);

  const validateForm = () => {
    const newErrors = {};

    if (!profileData.companyName?.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (profileData.companyOfficialEmail && !isValidEmail(profileData.companyOfficialEmail)) {
      newErrors.companyOfficialEmail = 'Valid email is required';
    }

    if (profileData.website && !isValidURL(profileData.website)) {
      newErrors.website = 'Valid website URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNestedInputChange = (parentField, childField, value) => {
    setProfileData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  const addIndustry = () => {
    if (tempIndustry.trim() && !profileData.industryTypes.includes(tempIndustry.trim())) {
      setProfileData(prev => ({
        ...prev,
        industryTypes: [...prev.industryTypes, tempIndustry.trim()]
      }));
      setTempIndustry('');
    }
  };

  const removeIndustry = (index) => {
    setProfileData(prev => ({
      ...prev,
      industryTypes: prev.industryTypes.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;








    try {
      if (isCreating) {
        // Create new profile - pass all fields
        const result = await addProfile({
          companyName: profileData.companyName,
          brandName: profileData.brandName,
          companyOfficialEmail: profileData.companyOfficialEmail,
          companyOfficialContact: profileData.companyOfficialContact,
          website: profileData.website,
          domainName: profileData.domainName,
          industryTypes: profileData.industryTypes,
          logo: profileData.logo,
          registeredOffice: profileData.registeredOffice,
          corporateOffice: profileData.corporateOffice,
          customAddress: profileData.customAddress
        }).unwrap();

        setProfileId(result._id);
        setIsCreating(false);

        await addProfile(result)
        refetch(); // Refresh profiles list
      } else {
        // Update existing profile - pass all fields and ID as params
        await updateProfile({
          id: profileId,
          data: {
            companyName: profileData.companyName,
            brandName: profileData.brandName,
            companyOfficialEmail: profileData.companyOfficialEmail,
            companyOfficialContact: profileData.companyOfficialContact,
            website: profileData.website,
            domainName: profileData.domainName,
            industryTypes: profileData.industryTypes,
            logo: profileData.logo,
            registeredOffice: profileData.registeredOffice,
            corporateOffice: profileData.corporateOffice,
            customAddress: profileData.customAddress
          }
        }).unwrap();

        refetch(); // Refresh profiles list
      }

      setIsEditing(false);
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    }
  };

  const handleNewProfile = () => {
    setIsCreating(true);
    setIsEditing(true);
    setProfileId(null);
    setProfileData({
      companyName: '',
      brandName: '',
      companyOfficialEmail: '',
      companyOfficialContact: '',
      website: '',
      domainName: '',
      industryTypes: [],
      logo: {
        public_id: '',
        secure_url: ''
      },
      registeredOffice: '',
      corporateOffice: '',
      customAddress: ''
    });
  };

  const handleProfileSelect = (profile) => {
    setProfileData({
      companyName: profile?.companyName || '',
      brandName: profile?.brandName || '',
      companyOfficialEmail: profile?.companyOfficialEmail || '',
      companyOfficialContact: profile?.companyOfficialContact || '',
      website: profile?.website || '',
      domainName: profile?.domainName || '',
      industryTypes: profile?.industryTypes || [],
      logo: {
        public_id: profile?.logo?.public_id || '',
        secure_url: profile?.logo?.secure_url || ''
      },
      registeredOffice: profile?.registeredOffice || '',
      corporateOffice: profile?.corporateOffice || '',
      customAddress: profile?.customAddress || ''
    });
    setProfileId(profile?._id);
    setIsEditing(false);
    setIsCreating(false);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const inputStyle = {
    outline: 'none',
    border: '1px solid #d1d5db',
    transition: 'all 0.2s'
  };

  const inputFocusStyle = {
    borderColor: primaryColor,
    boxShadow: `0 0 0 2px ${primaryColorLight}`
  };

  const getInputClassName = (field) => {
    return `w-full px-4 py-3 rounded-lg transition-all ${errors[field] ? 'border-red-500' : ''
      } ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building2 className="w-16 h-16 mx-auto mb-4" style={{ color: primaryColor }} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Information</h2>
        <p className="text-gray-600">Basic details about your company</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={profileData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className={getInputClassName('companyName')}
            style={inputStyle}
            disabled={!isEditing}
            onFocus={(e) => isEditing && Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            placeholder="Enter company name"
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand Name
          </label>
          <input
            type="text"
            value={profileData.brandName}
            onChange={(e) => handleInputChange('brandName', e.target.value)}
            className={getInputClassName('brandName')}
            style={inputStyle}
            disabled={!isEditing}
            onFocus={(e) => isEditing && Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            placeholder="Enter brand name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Official Email
          </label>
          <input
            type="email"
            value={profileData.companyOfficialEmail}
            onChange={(e) => handleInputChange('companyOfficialEmail', e.target.value)}
            className={getInputClassName('companyOfficialEmail')}
            style={inputStyle}
            disabled={!isEditing}
            onFocus={(e) => isEditing && Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            placeholder="Enter official email"
          />
          {errors.companyOfficialEmail && <p className="text-red-500 text-sm mt-1">{errors.companyOfficialEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Official Contact
          </label>
          <input
            type="text"
            value={profileData.companyOfficialContact}
            onChange={(e) => handleInputChange('companyOfficialContact', e.target.value)}
            className={getInputClassName('companyOfficialContact')}
            style={inputStyle}
            disabled={!isEditing}
            onFocus={(e) => isEditing && Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            placeholder="Enter contact number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={profileData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className={getInputClassName('website')}
            style={inputStyle}
            disabled={!isEditing}
            onFocus={(e) => isEditing && Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            placeholder="https://example.com"
          />
          {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domain Name
          </label>
          <input
            type="text"
            value={profileData.domainName}
            onChange={(e) => handleInputChange('domainName', e.target.value)}
            className={getInputClassName('domainName')}
            style={inputStyle}
            disabled={!isEditing}
            onFocus={(e) => isEditing && Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            placeholder="example.com"
          />
        </div>
      </div>

    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Target className="w-16 h-16 mx-auto mb-4" style={{ color: primaryColor }} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Industry & Logo</h2>
        <p className="text-gray-600">Industry types and company logo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-xl" style={{ backgroundColor: primaryColorLight }}>
            <h3 className="text-lg font-semibold mb-3 flex items-center" style={{ color: primaryColor }}>
              <Target className="w-5 h-5 mr-2" />
              Industry Types
            </h3>

            {isEditing && (
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempIndustry}
                    onChange={(e) => setTempIndustry(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300"
                    placeholder="Add industry type"
                    onKeyPress={(e) => e.key === 'Enter' && addIndustry()}
                  />
                  <button
                    onClick={addIndustry}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Quick select:</p>
                  <div className="flex flex-wrap gap-1">
                    {industryOptions.map((industry, index) => (
                      <button
                        key={index}
                        onClick={() => setTempIndustry(industry)}
                        className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {profileData.industryTypes.map((industry, index) => (
                <div key={index} className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm" style={{ color: primaryColor }}>{industry}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeIndustry(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {profileData.industryTypes.length === 0 && (
                <p className="text-gray-500 text-sm">No industries added yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl" style={{ backgroundColor: primaryColorLight }}>
            <h3 className="text-lg font-semibold mb-3 flex items-center" style={{ color: primaryColor }}>
              <Upload className="w-5 h-5 mr-2" />
              Company Logo
            </h3>

            <div className="text-center">
              {profileData.logo?.secure_url ? (
                <div className="mb-4">
                  <img
                    src={profileData.logo.secure_url}
                    alt="Company Logo"
                    className="w-24 h-24 object-cover rounded-lg mx-auto border-2 border-gray-200"
                  />
                  <p className="text-sm text-gray-600 mt-2">Current Logo</p>
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
              )}

              {isEditing && (
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="logo-upload"
                    onChange={(e) => {
                      // Handle file upload logic here
                      console.log('File selected:', e.target.files[0]);
                      // You'll need to implement file upload to your backend
                    }}
                  />
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center px-4 py-2 rounded-lg cursor-pointer text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </label>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: primaryColor }} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Address Information</h2>
        <p className="text-gray-600">Company addresses and locations</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-xl" style={{ backgroundColor: primaryColorLight }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: primaryColor }}>
            <Building2 className="w-5 h-5 mr-2" />
            Registered Office
          </h3>
          <textarea
            value={profileData.registeredOffice}
            onChange={(e) => handleInputChange('registeredOffice', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg transition-all resize-none ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            style={inputStyle}
            disabled={!isEditing}
            rows={3}
            placeholder="Enter registered office address"
            onFocus={(e) => isEditing && Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        <div className="p-6 rounded-xl" style={{ backgroundColor: primaryColorLight }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: primaryColor }}>
            <Globe className="w-5 h-5 mr-2" />
            Corporate Office
          </h3>
          <textarea
            value={profileData.corporateOffice}
            onChange={(e) => handleInputChange('corporateOffice', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg transition-all resize-none ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            style={inputStyle}
            disabled={!isEditing}
            rows={3}
            placeholder="Enter corporate office address"
            onFocus={(e) => isEditing && Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        <div className="p-6 rounded-xl" style={{ backgroundColor: primaryColorLight }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: primaryColor }}>
            <MapPin className="w-5 h-5 mr-2" />
            Custom Address
          </h3>
          <textarea
            value={profileData.customAddress}
            onChange={(e) => handleInputChange('customAddress', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg transition-all resize-none ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            style={inputStyle}
            disabled={!isEditing}
            rows={3}
            placeholder="Enter custom address (optional)"
            onFocus={(e) => isEditing && Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading profiles</div>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Company Profile Management
          </h1>
          <p className="text-lg text-gray-600">
            {isEditing ? 'Edit your company profile' : 'View your company profile'}
          </p>
        </div>

        {/* Profile Selection */}
        {profiles && profiles.length > 0 && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Profile
            </label>
            <select
              value={profileId || ''}
              onChange={(e) => {
                const selectedProfile = profiles.find(p => p._id === e.target.value);
                if (selectedProfile) {
                  handleProfileSelect(selectedProfile);
                }
              }}
              className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a profile</option>
              {profiles.map((profile) => (
                <option key={profile._id} value={profile._id}>
                  {profile.companyName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Action Buttons - No Delete Option */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* <button
            onClick={handleNewProfile}
            className="px-6 py-3 rounded-lg font-medium transition-all text-white"
            style={{ backgroundColor: '#10b981' }}
          >
            New Profile
          </button> */}

          {profileId && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 rounded-lg font-medium transition-all text-white"
              style={{ backgroundColor: '#10b981' }}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1,  2].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                  style={{
                    backgroundColor: currentStep >= step ? primaryColor : '#d1d5db',
                    color: currentStep >= step ? 'white' : '#6b7280'
                  }}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className="w-12 h-1 mx-2"
                    style={{
                      backgroundColor: currentStep > step ? primaryColor : '#d1d5db'
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep3()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Step {currentStep} of 3
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={isAdding || isUpdating}
                  className="px-6 py-3 rounded-lg font-medium transition-all text-white disabled:opacity-50"
                  style={{ backgroundColor: '#10b981' }}
                >
                  {isAdding || isUpdating ? 'Saving...' : 'Save Profile'}
                </button>
              )}
            </div>

            <button
              onClick={nextStep}
              disabled={currentStep === 3}
              className="flex items-center px-6 py-3 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: currentStep === 3 ? '#d1d5db' : primaryColor,
                color: currentStep === 3 ? '#6b7280' : 'white',
                cursor: currentStep === 3 ? 'not-allowed' : 'pointer'
              }}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;