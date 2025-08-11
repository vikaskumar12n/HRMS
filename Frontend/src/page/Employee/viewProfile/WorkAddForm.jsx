import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWorkAddMutation } from "../../../rtk/employeeworck";
import { useParams } from "react-router-dom";
import { useGetOneEmployeeWorkQuery } from "../../../rtk/employeeworck";
import { ClipLoader } from "react-spinners";
const EmployeeWorkAddForm = () => {
  const { id } = useParams();
  const {
    data: workdata,
    isLoading,
    error,
  } = useGetOneEmployeeWorkQuery({ id });

  const [workAdd,{isLoading:workLoading}] = useWorkAddMutation();
  const location = useLocation();
  const employeeData = location.state?.editEmployee;

  const { data: workData } = useGetOneEmployeeWorkQuery({ id });
  const navigate = useNavigate();
  const [data, setData] = useState({
    department: "",
    shiftInformation: "",
    employeeType: "",
    company: "",
    jobPosition: "",
    workType: "",
    reportingManager: "",
    workLocation: "",
    joiningDate: "",
    salary: "",
  });

  useEffect(() => {
    if (workData) {
      setData({
        department: workData?.department || "N/A",
        shiftInformation: workData?.shiftInformation || "",
        employeeType: workData?.employeeType || "",
        company: workData?.company || "",
        jobPosition: workData?.jobPosition || "",
        workType: workData?.workType || "",
        reportingManager: workData?.reportingManager || "",
        workLocation: workData?.workLocation || "",
        joiningDate: workData?.joiningDate
        ? new Date(workData.joiningDate).toISOString().split("T")[0]
        : "",
        salary: workData?.salary || "",
      });
    }
  }, [workData]);

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

      
    const result = await workAdd({ data, id }).unwrap();
    if (result.success) {
      navigate(`/employee/details/${id}`);
    }
  };

  if(workLoading){
     return(
      <div className="flex justify-center items-center h-screen">
          <ClipLoader size={30} color="blu"/>
      </div>
     )
  }

  return (
    <div className="container mx-auto mt-1 p-4 bg-white shadow-lg rounded-lg pb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {employeeData ? "Add Work Information " : "Add Work Information"}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email & Role */}
        {/* Name, Phone */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="department"
              value={data.department}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              maxLength={20}
              minLength={3}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Ship Information
            </label>
            <select
              onChange={handleChange}
              name="shiftInformation"
              value={data.shiftInformation}
              className="mt-1 block w-full border  border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="">select</option>
              <option value="InternShip">InternShip</option>
              <option value="Permanent">Permanent</option>
            </select>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Employee Type
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="employeeType"
              value={data.employeeType}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              maxLength={50}
              minLength={3}
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <select
              onChange={handleChange}
              name="company"
              value={data.company}
              className="bg-white border border-md mt-1 block w-full p-2 rounded-md border-gray-300"
            >
              <option value="select">Select Company</option>
              <option value="CodeCrafter">CodeCrafter</option>
            </select>
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
              Job Position
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={data.jobPosition}
              name="jobPosition"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              maxLength={15}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Work Type
            </label>
            <select
              onChange={handleChange}
              name="workType"
              value={data.workType}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="">Select Work Type</option>
              <option value="Remote">Remote</option>
              <option value="OnSite">OnSite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Salary, Joining Date */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Reporting Manager
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={data.reportingManager}
              name="reportingManager"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Work Location
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="workLocation"
              value={data.workLocation}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Joining Date
            </label>
            <input
              type="Date"
              onChange={handleChange}
              value={data.joiningDate}
              name="joiningDate"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="Number"
              onChange={handleChange}
              name="salary"
              value={data.salary}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => navigate(`/employee/details/${id}`)}
            className="bg-gray-400 text-white py-2 px-5 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeWorkAddForm;
