import React, { useState } from 'react';
import { useGetAllEmployeeQuery } from '../../rtk/employeeApi';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { GrFormView } from 'react-icons/gr';
import { CiSearch } from 'react-icons/ci';
import { useDeleteEmployeeMutation } from '../../rtk/employeeApi';
import { isConfirm } from '../../helper/SweetAlrertIsConfirm';
import { useNavigate } from 'react-router';
import { ClipLoader } from 'react-spinners';

const EmployeeList = () => {
  const { data, isLoading, error } = useGetAllEmployeeQuery();

  console.log(data);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const navigate = useNavigate();

  const getInitials = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleDelete = async (id) => {
    const isConfirmed = await isConfirm();
    if (isConfirmed) {
      const data = await deleteEmployee(id).unwrap();
      alert("Employee Data Deleted! ")
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/employee/edit/${id}`);
  };

  const employeeDetail = (employee) => {
    let id = employee._id;
    navigate(`/dashboard/employee/overview/${id}`, { state: { employeeData: employee } });
  };

  const adddEmployee = (e) => {
    navigate('/dashboard/employee/add');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={30} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error Loading Employee...</p>;
  }
  

     
 
  const filteredEmployee = data?.all_data?.filter((employee) => {
    const matchesSearch = searchQuery === '' || employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === '' || roleFilter === employee.role;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="px-6 py-2 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm px-6 py-2 mb-2">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Employee Overview</h1>
            <dv className='flex gap-10 mt-2'>
            <p className="text-gray-600 text-sm">Number of Employees: <span className='font-bold'> {data?.summary?.totalEmployees || 0}</span></p>
            <p className="text-gray-600 text-sm">Number of Present Employees: <span className='font-bold'> {data?.summary?.present || 0}</span></p>
            <p className="text-gray-600 text-sm">Number of Absent Employees: <span className='font-bold'> {data?.summary?.onLeave || 0}</span></p>

            </dv>
          </div>
          <button
            onClick={adddEmployee}
            className="bg-[#06425F] hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
          >
            <span className="text-lg">+</span>
            Add Employee
          </button>
        </div>

        {/* Filters Section */}
        {/* <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="includeInactive" className="rounded" />
              <label htmlFor="includeInactive" className="text-sm text-gray-600">
                Include Inactive Employees
              </label>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-red-500">Invalid Email: 0</span>
              <span className="text-blue-500">Mobile Users: 2</span>
              <span className="text-green-500">Signed in: 3</span>
              <span className="text-gray-500">Not Signed in: 1</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors">
              CONFIRM PROBATION
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors">
              RESEND ACTIVATION
            </button>
          </div>
        </div> */}
      </div>

      {/* Search and Actions Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <CiSearch className="absolute right-3 top-2.5 text-gray-400 text-xl" />
          </div>

          <div className="flex items-center gap-2">
            {/* <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm flex items-center gap-1 hover:bg-blue-600 transition-colors">
              <span>📝</span> Bulk Edit
            </button>
            <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm flex items-center gap-1 hover:bg-blue-600 transition-colors">
              <span>✉️</span> Mail
            </button>
            <button className="bg-red-500 text-white px-3 py-2 rounded text-sm flex items-center gap-1 hover:bg-red-600 transition-colors">
              <span>🗑️</span> Delete
            </button> */}
            {/* <button className="bg-red-500 text-white px-3 py-2 rounded text-sm flex items-center gap-1 hover:bg-red-600 transition-colors">
              <span></span> Import
            </button> */}
            {/* <button className="bg-[#06425F] text-white px-5 py-2 rounded text-sm flex items-center gap-1 hover:bg-blue-600 transition-colors">
              <span></span> Export
            </button> */}
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-gray-600">Show</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      {/* <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center gap-4">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Signed In</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Manager</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Grade</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Department</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Work Location</option>
          </select>
          <div className="ml-auto">
            <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Sort By</option>
            </select>
          </div>
        </div>
      </div> */}

      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
               
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SR</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Department</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Designation</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Grade</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee Manager</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployee?.length > 0 ? (
                filteredEmployee.map((employee, index) => (
                  <tr key={employee._id || index} className="hover:bg-gray-50 transition-colors">
                    {/* <td className="px-4 py-4">
                      <input type="checkbox" className="rounded" />
                    </td> */}
                    <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                    <td className="p-4 text-sm text-gray-900 font-medium">{employee.registrationId.slice(-4)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            employee.bgColor || 'bg-[#06425F]'
                          }`}
                        >
                          {(<img className='rounded-full' src={employee?.employeeImage?.secure_url}/>) || getInitials(employee.name)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{employee.department || 'IT'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{employee.designation || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{employee.grade || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{employee.manager || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => employeeDetail(employee)}
                          className="text-[#06425F] hover:text-blue-800 transition-colors hover:bg-slate-200 rounded-full p-0.5"
                          title="View Details"
                        >
                          <GrFormView className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleEdit(employee?._id)}
                          className="text-[#06425F] hover:text-blue-800 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <MdDelete className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                    No employees found.....
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
            <span className='bg-white'>  1 to {Math.min(filteredEmployee?.length)} </span> of {filteredEmployee?.length || 0}
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              
              </button>
              <span className="px-3 py-1 text-sm">Page 1 of 1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;