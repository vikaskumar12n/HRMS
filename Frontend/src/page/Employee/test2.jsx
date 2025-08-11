import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAddEmployeeMutation,
  useEmployeeEditMutation,
} from "../../rtk/employeeApi";
import { ClipLoader } from "react-spinners";

const EmployeeAdd = () => {
  const [employeeEdit,{isLoading:editLoading}] = useEmployeeEditMutation();
  const [addEmployee, { isLoading, isError, isSuccess }] =
    useAddEmployeeMutation();
  const location = useLocation();
  const employeeData = location.state?.editEmployee;
  // console.log("new vala",employeeData);

  const navigate = useNavigate();
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
    maritalStaus: "",
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
        // photo:employeeData.photo,
      }));
    }
  }, [employeeData]);

  const handleChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangefile = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.files[0] });
  };

  //  console.log("data",data);

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    // return;
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
      // console.log("data++",formData);
      // retu
      const result = await addEmployee(formData).unwrap();
      if (result.success) navigate("/employee/list");
    }
  };

  if (isLoading||editLoading) {
    return(
      <div className="flex justify-center items-center h-screen">
      <ClipLoader color="blue" size={30} />
    </div>
    ) 
  }

  return (
    <div className="container mx-auto mt-1 p-4 bg-white shadow-lg rounded-lg pb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {employeeData ? "Edit Employee" : "Add Employee"}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email & Role */}
        {/* Name, Phone */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="name"
              value={data.name}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              maxLength={20}
              minLength={3}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="number"
              onChange={handleChange}
              name="mobile"
              value={data.mobile}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              maxLength={10}
              minLength={10}
              pattern="^[6789]\d{9}$"
              required
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={data.email}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              maxLength={50}
              minLength={3}
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Work Email
            </label>
            <input
              type="email"
              onChange={handleChange}
              name="workEmail"
              value={data.workEmail}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              maxLength={50}
              minLength={3}
            />
          </div>

          {/* <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select onChange={handleChange} name='role' value={data.role} className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white">
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
        </div>
        {/* Department, Designation */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              DOB
            </label>
            <input
              type="Date"
              onChange={handleChange}
              value={data.dob}
              name="dob"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              maxLength={15}
              minLength={10}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              onChange={handleChange}
              name="gender"
              value={data.gender}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>

        {/* Salary, Joining Date */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={data.address}
              name="address"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="city"
              value={data.city}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={data.state}
              name="state"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Qualification
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="qualification"
              value={data.qualification}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={data.experience}
              name="experience"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              onChange={handleChange}
              value={data.maritalStatus}
              name="maritalStatus"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Merital Status</option>
              <option value="married">Married</option>
              <option value="unMarried">UnMarried</option>
            </select>
          </div>
        </div>
        {/* Password, Profile Image */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={data.password}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              onChange={handleChangefile}
              name="photo"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 w-fit"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)} // or use a specific path like navigate("/employees")
            className="bg-gray-400 text-white py-2 px-5 rounded-md hover:bg-gray-500 w-fit"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeAdd;
