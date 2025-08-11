import { useState } from 'react';
import { Plus, Linkedin, Facebook, Twitter } from 'lucide-react';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  
  const tabs = [
    'Overview', 'Address', 'Department', 'Designation', 
    'Announcements', 'Policies', 'Admin', 'Statutory', 'My Plan'
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white" style={{ backgroundColor: '#06425F' }}>
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-white text-xl font-semibold">COMPANY PROFILE</h1>
            <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
              <span>▶</span>
              <span>Getting Started</span>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mt-4 flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'text-white border-white'
                    : 'text-gray-300 border-transparent hover:text-white hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - Company Logo */}
        <div className="w-80 p-6">
          <div className="bg-white rounded border-2 border-dashed border-gray-300 p-8 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus size={32} className="text-blue-500" />
              </div>
              <p className="text-gray-500 text-sm">Your Company Logo comes here</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">codcra</h2>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              {/* Overview Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">OVERVIEW</h3>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registered Company Name
                      </label>
                      <p className="text-gray-900">Code Crafter</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Official Email
                      </label>
                      <p className="text-gray-900"></p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <p className="text-gray-900">None</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Industry Type
                      </label>
                      <p className="text-gray-900"></p>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand Name
                      </label>
                      <p className="text-gray-900">codcra</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Official Contact
                      </label>
                      <p className="text-gray-900"></p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Domain Name
                      </label>
                      <p className="text-gray-900">codcra</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator Line */}
              <hr className="border-gray-200 my-8" />

              {/* Social Profile Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">SOCIAL PROFILE</h3>
                
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                    <Linkedin size={24} className="text-white" />
                  </div>
                  
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                    <Facebook size={24} className="text-white" />
                  </div>
                  
                  <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                    <Twitter size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;