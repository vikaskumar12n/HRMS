import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Building2, MapPin, Users, Award, Target, Globe } from 'lucide-react';

const About = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: 'Code Crafter Web Solution',
    location: 'Lucknow, Uttar Pradesh',
    established: '2020',
    employees: '25-50',
    industry: 'Web Development & IT Solutions'
  });

  // Static company data
  const companyInfo = {
    name: 'Code Crafter Web Solution',
    tagline: 'Crafting Digital Excellence',
    location: 'Lucknow, Uttar Pradesh, India',
    established: '2020',
    description: 'Code Crafter Web Solution is a leading web development company based in Lucknow, specializing in creating innovative digital solutions for businesses of all sizes. We combine creativity with cutting-edge technology to deliver exceptional web experiences.',
    services: [
      'Custom Web Development',
      'E-commerce Solutions',
      'Mobile App Development',
      'UI/UX Design',
      'Digital Marketing',
      'Cloud Solutions'
    ],
    mission: 'To empower businesses with innovative digital solutions that drive growth and success in the digital age.',
    vision: 'To be the most trusted technology partner for businesses seeking digital transformation.',
    values: ['Innovation', 'Quality', 'Customer Focus', 'Integrity', 'Excellence'],
    team: '25+ Skilled Professionals',
    clients: '100+ Happy Clients',
    projects: '200+ Successful Projects'
  };

  const primaryColor = '#06425F';
  const primaryColorLight = '#06425F20';
  const primaryColorDark = '#043344';

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building2 className="w-16 h-16 mx-auto mb-4" style={{color: primaryColor}} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Information</h2>
        <p className="text-gray-600">Basic details about your company</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="w-full px-4 py-3 rounded-lg transition-all"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 rounded-lg transition-all"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Established Year
          </label>
          <input
            type="text"
            value={formData.established}
            onChange={(e) => handleInputChange('established', e.target.value)}
            className="w-full px-4 py-3 rounded-lg transition-all"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            placeholder="Enter year"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <input
            type="text"
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            className="w-full px-4 py-3 rounded-lg transition-all"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            placeholder="Enter industry"
          />
        </div>
      </div>

      <div className="p-6 rounded-lg" style={{backgroundColor: primaryColorLight}}>
        <h3 className="font-semibold mb-2" style={{color: primaryColor}}>Preview</h3>
        <p style={{color: primaryColor}}>
          {formData.companyName} is located in {formData.location}, established in {formData.established}, 
          operating in {formData.industry}.
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Target className="w-16 h-16 mx-auto mb-4" style={{color: primaryColor}} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Profile</h2>
        <p className="text-gray-600">Mission, vision, and core values</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-xl" style={{backgroundColor: primaryColorLight}}>
            <h3 className="text-lg font-semibold mb-3 flex items-center" style={{color: primaryColor}}>
              <Target className="w-5 h-5 mr-2" style={{color: primaryColor}} />
              Our Mission
            </h3>
            <p className="leading-relaxed" style={{color: primaryColorDark}}>
              {companyInfo.mission}
            </p>
          </div>

          <div className="p-6 rounded-xl" style={{backgroundColor: primaryColorLight}}>
            <h3 className="text-lg font-semibold mb-3 flex items-center" style={{color: primaryColor}}>
              <Globe className="w-5 h-5 mr-2" style={{color: primaryColor}} />
              Our Vision
            </h3>
            <p className="leading-relaxed" style={{color: primaryColorDark}}>
              {companyInfo.vision}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl" style={{backgroundColor: primaryColorLight}}>
            <h3 className="text-lg font-semibold mb-4 flex items-center" style={{color: primaryColor}}>
              <Award className="w-5 h-5 mr-2" style={{color: primaryColor}} />
              Core Values
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {companyInfo.values.map((value, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-medium" style={{color: primaryColor}}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl" style={{backgroundColor: primaryColorLight}}>
            <h3 className="text-lg font-semibold mb-3" style={{color: primaryColor}}>
              Key Statistics
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{color: primaryColorDark}}>Team Size:</span>
                <span className="font-semibold" style={{color: primaryColor}}>{companyInfo.team}</span>
              </div>
              <div className="flex justify-between">
                <span style={{color: primaryColorDark}}>Clients Served:</span>
                <span className="font-semibold" style={{color: primaryColor}}>{companyInfo.clients}</span>
              </div>
              <div className="flex justify-between">
                <span style={{color: primaryColorDark}}>Projects Completed:</span>
                <span className="font-semibold" style={{color: primaryColor}}>{companyInfo.projects}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Users className="w-16 h-16 mx-auto mb-4" style={{color: primaryColor}} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Services & Summary</h2>
        <p className="text-gray-600">What we offer and company overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="p-6 rounded-xl mb-6" style={{backgroundColor: primaryColorLight}}>
            <h3 className="text-xl font-semibold mb-4" style={{color: primaryColor}}>Our Services</h3>
            <div className="grid grid-cols-1 gap-3">
              {companyInfo.services.map((service, index) => (
                <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: primaryColor}}></div>
                  <span className="font-medium" style={{color: primaryColor}}>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="p-6 rounded-xl mb-6" style={{backgroundColor: primaryColorLight}}>
            <h3 className="text-xl font-semibold mb-4" style={{color: primaryColor}}>About Us</h3>
            <p className="leading-relaxed mb-4" style={{color: primaryColorDark}}>
              {companyInfo.description}
            </p>
            <div className="flex items-center mb-2" style={{color: primaryColor}}>
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{companyInfo.location}</span>
            </div>
            <div className="flex items-center" style={{color: primaryColor}}>
              <Building2 className="w-4 h-4 mr-2" />
              <span className="text-sm">Established in {companyInfo.established}</span>
            </div>
          </div>

          <div className="p-6 rounded-xl" style={{backgroundColor: primaryColorLight}}>
            <h3 className="text-lg font-semibold mb-3" style={{color: primaryColor}}>Company Highlights</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                <span style={{color: primaryColorDark}}>Industry Focus</span>
                <span className="font-semibold" style={{color: primaryColor}}>Web Development</span>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                <span style={{color: primaryColorDark}}>Specialization</span>
                <span className="font-semibold" style={{color: primaryColor}}>Digital Solutions</span>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                <span style={{color: primaryColorDark}}>Market</span>
                <span className="font-semibold" style={{color: primaryColor}}>Global</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {companyInfo.name}
          </h1>
          <p className="text-lg text-gray-600">{companyInfo.tagline}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white"
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
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className="text-sm text-gray-500 flex items-center">
              Step {currentStep} of 3
            </div>

            <button
              onClick={nextStep}
              disabled={currentStep === 3}
              className="flex items-center px-6 py-3 rounded-lg font-medium transition-all text-white"
              style={{
                backgroundColor: currentStep === 3 ? '#d1d5db' : primaryColor,
                color: currentStep === 3 ? '#6b7280' : 'white',
                cursor: currentStep === 3 ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (currentStep !== 3) {
                  e.target.style.backgroundColor = primaryColorDark;
                }
              }}
              onMouseLeave={(e) => {
                if (currentStep !== 3) {
                  e.target.style.backgroundColor = primaryColor;
                }
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

export default About;