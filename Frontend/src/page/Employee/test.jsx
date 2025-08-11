import React, { useState, useEffect } from 'react';
import { User, Calendar, Mail, Phone, MapPin, Building, Award, Heart, Lock, Image, X } from 'lucide-react';

const EmployeeAdd = () => {
  // Simulating the hooks from your original code
  const [isLoading, setIsLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // Mock location and employee data - replace with your actual hooks
  const employeeData = null; // This would come from useLocation().state?.editEmployee

  const [data, setData] = useState({
    name: "",
    email: "",
    workEmail: "",
    mobile: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    qualification: "",
    experience: "",
    maritalStatus: "",
    password: "",
    photo: "",
  });

  useEffect(() => {
    if (employeeData) {
      setData((prev) => ({
        ...prev,
        name: employeeData.name,
        email: employeeData.email,
        workEmail: employeeData.workEmail,
        mobile: employeeData.mobile,
        dob: employeeData.dob,
        gender: employeeData.gender,
        address: employeeData.address,
        city: employeeData.city,
        state: employeeData.state,
        qualification: employeeData.qualification,
        experience: employeeData.experience,
        maritalStatus: employeeData.maritalStatus,
        password: employeeData.passwords || "",
        joiningDate: employeeData.joiningDate
          ? employeeData.joiningDate.split("T")[0]
          : "",
      }));
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangefile = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(employeeData ? 'Employee updated successfully!' : 'Employee added successfully!');
    }, 2000);

    // Your original form submission logic would go here
    /*
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("workEmail", data.workEmail);
    formData.append("mobile", data.mobile);
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("qualification", data.qualification);
    formData.append("experience", data.experience);
    formData.append("maritalStatus", data.maritalStatus);
    formData.append("password", data.password);
    formData.append("photo", data.photo);
    
    if (employeeData) {
      const id = employeeData._id;
      const result = await employeeEdit({ id, formData }).unwrap();
      if (result.success) {
        navigate("/employee/list");
      }
    } else {
      const result = await addEmployee(formData).unwrap();
      if (result.success) navigate("/employee/list");
    }
    */
  };

  const handleCancel = () => {
    // Replace with your navigation logic
    console.log('Cancel clicked');
  };

  if (isLoading || editLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 py-8 border border border-white">
      <div className="w-[900px] mx-auto bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="bg-slate-700 text-white px-10 py-4">
          <h1 className="text-xl font-semibold">
            {employeeData ? "EDIT EMPLOYEE" : "ONBOARDING NEW EMPLOYEE"}
          </h1>
          <div className="flex mt-2">
            <button className="bg-slate-600 px-4 py-1 rounded-t text-sm border-b-2 border-white">
              Mandatory Info
            </button>
            {/* <button className="px-4 py-1 text-sm text-gray-300 hover:text-white">
              Optional Info
            </button> */}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <User className="mr-2 h-5 w-5 text-blue-600" />
                PERSONAL
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter first name"
                    maxLength={20}
                    minLength={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter middle name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Official Email ID
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    value={data.workEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter official email"
                    maxLength={50}
                    minLength={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={data.mobile}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                    pattern="^[6789]\d{9}$"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={data.dob}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Gender
                  </label>
                  <div className="flex space-x-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={data.gender === 'male'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <User className="h-4 w-4 mr-1 text-blue-600" />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={data.gender === 'female'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <User className="h-4 w-4 mr-1 text-pink-600" />
                      Female
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={data.gender === 'other'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Transgender
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Personal Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter personal email"
                  maxLength={50}
                  minLength={3}
                />
              </div>
            </div>

            {/* Work Information Section */}
            {/* <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <Building className="mr-2 h-5 w-5 text-blue-600" />
                WORK
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto-generated"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter department"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub Department
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter sub department"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={data.qualification}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter designation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter job title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting Manager
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter reporting manager"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Location
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select location</option>
                    <option value="office">Office</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select type</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Probation Period
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter probation period"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date of Joining
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div> */}

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Address
                </label>
                <textarea
                  name="address"
                  value={data.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full address"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter state"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Award className="inline h-4 w-4 mr-1" />
                  Experience (Years)
                </label>
                <input
                  type="number"
                  name="experience"
                  value={data.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter years of experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Heart className="inline h-4 w-4 mr-1" />
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={data.maritalStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select marital status</option>
                  <option value="married">Married</option>
                  <option value="unMarried">Unmarried</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Lock className="inline h-4 w-4 mr-1" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Image className="inline h-4 w-4 mr-1" />
                  Profile Image
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChangefile}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => handleCancel(-1)}
                className="flex items-center px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isLoading}
                onClick={onSubmit}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : null}
                NEXT →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAdd;