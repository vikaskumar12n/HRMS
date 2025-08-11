import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Mail,
  Building,
  Phone,
  MapPin,
  Heart,
  Lock,
  Image,
  X,
  Save,
  ArrowRight,
  UserPlus,
  Home,
  Award,
  Eye,
  EyeOff
} from "lucide-react";
import {
  useAddEmployeeMutation,
  useEmployeeEditMutation,
} from "../../rtk/employeeApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneEmployeeQuery } from "../../rtk/employeeApi.js";
import WorkInfoForm from "./EmployeeAddEditComponent/WorkInfoForm.jsx";
import EmployeeBankInfo from "./EmployeeAddEditComponent/BankAdd.jsx";
import OtherInfoForm from "./EmployeeAddEditComponent/OtherInfoForm.jsx";
import { useSearchParams } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
const EmployeeAdd = () => {

const [searchParams] = useSearchParams();
const tab = searchParams.get("tab");

  const { id } = useParams();
  const [employeeEdit, { isLoading: editLoading }] = useEmployeeEditMutation({
    id,
  });
  const [addEmployee, { isLoading, isError, isSuccess }] =
    useAddEmployeeMutation();
  const { data: employeeData, error } = useGetOneEmployeeQuery({ id });
  const [activeTab, setActiveTab] = useState(tab || 'personal');
    const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate()
  const [data, setData] = useState({
    fname: "",
    lname: "",
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
    photo: null,
    joiningDate: "",
  });

  const tabs = [
    { id: "personal", name: "Personal Information", icon: User },
    { id: "address", name: "Address Details", icon: Home  },
    { id: "work", name: "Work Details", icon: Building , disabled:id?false:true},
    { id: "bank", name: "Bank Details", icon: Award,disabled:id?false:true },
    { id: "other", name: "Other Details", icon: Heart,disabled:id?false:true },
  ];

  useEffect(() => {
      document.querySelector("input[name='fname']")?.focus();
    if (id && employeeData) {
      setData((prev) => ({
        ...prev,
        fname: employeeData.name,
        email: employeeData.email,
        workEmail: employeeData.workEmail,
        mobile: employeeData.mobile,
        dob: employeeData.dob,
        gender: employeeData.gender,
        photo: employeeData?.employeeImage?.secure_url || null,
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
  }, [employeeData, id]);

useEffect(() => {
  if (tab) {
    setActiveTab(tab);
  }
}, [tab]);


const generatePassword = () => {
  setShowPassword(true)
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+";
  const allChars = upper + lower + numbers + symbols;

  let password = "";
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 4; i < 8; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

const handleCancel = () =>{
  setData({
    fname: "",
    lname: "",
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
    photo: null,
    joiningDate: "",
  })
}

const getMaxDOB = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split("T")[0]; 
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangefile = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    try {
      let name = data.fname
      e.preventDefault();
      if(data.lname){
name = data.fname + ' ' + data.lname ;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", data?.email);
      formData.append("workEmail", data?.workEmail);
      formData.append("mobile", data?.mobile);
      formData.append("dob", data?.dob);
      formData.append("gender", data?.gender);
      formData.append("address", data?.address);
      formData.append("city", data?.city);
      formData.append("state", data?.state);
      formData.append("qualification", data?.qualification);
      formData.append("experience", data?.experience);
      formData.append("maritalStatus", data?.maritalStatus);
      formData.append("password", data?.password);
      formData.append("photo", data?.photo);

      if (employeeData) {
        const id = employeeData._id;
        const result = await employeeEdit({ id, formData }).unwrap();
        if (result.success) {
          alert('Employee Update Successfull !')
          navigate(`/dashboard/employee/edit/${id}?tab=work`);
        }
      } else {
        console.log(formData)
        const result = await addEmployee(formData).unwrap();
        console.log(result)
         alert('Employee Resigter Successfull !')
        if (result.success) navigate(`/dashboard/employee/edit/${result?.data?._id}?tab=work`);
      }
    } catch (error) {
      alert(error?.message || 'Internal Server Error')
      console.error("API Error:", error);
    }
  };

  const nextTab = () => {
    if (activeTab === "personal") {
      setActiveTab("address");
    }
  };

  const isTabComplete = (tabId) => {
    switch (tabId) {
      case "personal":
        return (
          data.fname && data.workEmail && data.mobile && data.dob && data.gender
        );
      case "address":
        return data.address && data.city && data.state;
      default:
        return false;
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fname"
            value={data.fname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
            placeholder="Enter first name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
             name="lname"
            value={data.lname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Mail className="inline h-4 w-4 mr-1" />
            Official Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="workEmail"
            value={data.workEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
            placeholder="Enter official email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Phone className="inline h-4 w-4 mr-1" />
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            value={data.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
            placeholder="Enter 10 digit phone number"
            pattern="^[6789]\d{9}$"
            maxLength="10"
            required
          />
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
          placeholder="Enter personal email"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline h-4 w-4 mr-1" />
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dob"
            max={getMaxDOB()}
            value={data.dob}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={data.gender === "male"}
                onChange={handleChange}
                className="mr-2 text-[#06425F] focus:ring-[#06425F]"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={data.gender === "female"}
                onChange={handleChange}
                className="mr-2 text-[#06425F] focus:ring-[#06425F]"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={data.gender === "other"}
                onChange={handleChange}
                className="mr-2 text-[#06425F] focus:ring-[#06425F]"
              />
              Other
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Heart className="inline h-4 w-4 mr-1" />
            Marital Status
          </label>
          <select
            name="maritalStatus"
            value={data.maritalStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
          >
            <option value="">Select marital status</option>
            <option value="married">Married</option>
            <option value="unmarried">Unmarried</option>
          </select>
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience (Years)
          </label>
          <input
            type="number"
            name="experience"
            min={0}
            max={50}
            value={data.experience}
            // onChange={handleChange}
             onChange={(e) => {
    const value = e.target.value;
    if (value === '' || Number(value) >= 0) {
      handleChange(e);
    }
  }}
  onKeyDown={(e) => {
    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
      e.preventDefault(); 
    }
  }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
            placeholder="Enter years of experience"
          />
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <Lock className="inline h-4 w-4 mr-1" />
        Password
      </label>
      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={data.password}
          onChange={handleChange}
          className="w-full px-3 py-2 pr-10  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-24 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
        <button
          type="button"
          onClick={() => setData({ ...data, password: generatePassword() })}
          className="ml-2 text-sm text-white bg-[#06425F] px-2 py-2 rounded-md hover:bg-[#05364b]"
        >
          Generate
        </button>
      </div>
    </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Image className="inline h-4 w-4 mr-1" />
            Profile Photo
          </label>
          <input
            type="file"
            name="photo"
            onChange={handleChangefile}
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <MapPin className="inline h-4 w-4 mr-1" />
          Full Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          value={data.address}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent resize-none"
          placeholder="Enter complete address"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
            placeholder="Enter city"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#06425F] focus:border-transparent"
            placeholder="Enter state"
            required
          />
        </div>
      </div>
    </div>
  );

  if (isLoading || editLoading) {
    return (
        <div className='flex justify-center items-center h-[90vh]'>
                <ClipLoader/>
            </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg mb-6 overflow-hidden">
          <div className="bg-[#06425F] text-white px-6 py-4">
            <div className="flex items-center">
              <UserPlus className="h-6 w-6 mr-3" />
              <div>
                <h1 className="text-xl font-semibold">
                  {employeeData ? "Edit Employee" : "Add New Employee"}
                </h1>
                <p className="text-blue-100 text-sm">
                  Complete the employee information
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 px-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isCompleted = isTabComplete(tab.id);

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
        if (!tab.disabled) {
          setActiveTab(tab.id);
          navigate(`?tab=${tab.id}`); 
        }
      }}
                    disabled={tab.disabled}
                    className={`
                      flex items-center py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      ${
                        isActive
                          ? "border-[#06425F] text-[#06425F]"
                          : tab.disabled
                          ? "border-transparent text-gray-400 cursor-not-allowed"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.name}
                    {isCompleted && !isActive && (
                      <div className="ml-2 w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6">
            {activeTab === "personal" && renderPersonalInfo()}
            {activeTab === "address" && renderAddressInfo()}
            {activeTab === "work" && <WorkInfoForm />}
            {activeTab === "bank" && <EmployeeBankInfo />}
            {activeTab === "other" && < OtherInfoForm/>}
          </div>

          {/* Action Buttons */}
          {activeTab == "personal" || activeTab=="address"? (
<div className="bg-gray-50 px-6 py-4 border-t border-gray-200">

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center px-4 cursor-pointer py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Reset
              </button>

              <div className="flex space-x-3">
                {activeTab === "personal" && (
                  <button
                    type="button"
                    onClick={nextTab}
                    disabled={!isTabComplete("personal")}
                    className="flex items-center px-4 py-2 bg-[#06425F] text-white rounded-md hover:bg-[#053649] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next: Address
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                )}

                {activeTab === "address" && (
                  <button
                    onClick={onSubmit}
                    disabled={isLoading || !isTabComplete("personal")}
                    className="flex items-center px-6 py-2 bg-[#06425F] text-white rounded-md hover:bg-[#053649] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Employee
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
          ): ''}
          
        </div>
      </div>
    </div>
  );
};

export default EmployeeAdd;
