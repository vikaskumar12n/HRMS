import { Navigate, useLocation } from 'react-router';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import orkInformation from '../viewProfile/WorkAddForm.jsx'
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom";
import { useGetAllEmployeeDetailQuery, useGetOneEmployeeQuery } from '../../../rtk/employeeApi.js';
import { useGetOneEmployeeWorkQuery } from '../../../rtk/employeeworck.js';
import { useGetOneEmployeeBankQuery } from '../../../rtk/employeeBank.js';



export default function EmployeeAbout() {
  const{id}=useParams()   
  const { data, isLoading, error } = useGetOneEmployeeQuery({id});
    const{data:workData}=useGetOneEmployeeWorkQuery({id})
    const{data:bankData}=useGetOneEmployeeBankQuery({id});
  
  const location = useLocation();
  const employeeData = location.state?.employeeData;
  const[personal,setPersonal]=useState({});
  const[work,setWork]=useState({});
  const[bank,setBank]=useState({});
  const navigate=useNavigate();
    
  
 
  useEffect(()=>{
     if(data){
         setPersonal({
          dob:'15/06/2002',
          gender: data.gender,
          address: data.address,
          country: data.country,
          state: data.state,
          city: data.city,
          qualification: data.qualification,
          experience: data.experience,
          maritalStatus: data.maritalStatus,
          children: data.children || 'N/a',
          emergencyContact: data.emergencyContact || 'N/a',
          emergencyContactName: data.emergencyContactName || 'N/a',
          emergencyContactRelation: data.emergencyContactRelation || 'N/a'
         }) 
     }
     if(workData){
      setWork({
        department:workData?.department||"N/A",
        position:workData?.jobPosition||"N/A",
        shiftInfo:workData?.shiftInformation||"N/A",
        workType:workData?.workType||"N/A",
        employeeType:workData?.employeeType||"N/A",
        manager:workData?.reportingManager||"N/xcA",
        company:workData?.company||"N/A",
        location:workData?.workLocation||"N/A",
        endDate:workData?.endDate||"N/A",
        joiningDate:new Date( workData?.joiningDate).toLocaleDateString("en-IN"),
        // tags:workData?.tags||"N/A",
        salary:workData?.salary||"N/A"

      })
     }
     if(bankData){
      setBank({
        name:bankData.bankName,
        accountNumber:bankData.accountNumber,
        branch:bankData.branch,
        code1:bankData.bankCode,
        address:bankData.bankAddress,
        country:bankData.country,
        ifscCode:bankData.ifscCode||"NAA",
      })
     }
  },[data,workData,bankData])


  const InfoItem = ({ label, value }) => (
    <div className="mb-4 w-full">
      <div className="text-gray-500 text-sm flex items-center w-full">
        <span className="mr-1">
          {label === 'Date of Birth' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
          {label === 'Gender' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          )}
        </span>
        {label}
      </div>
      <div className="text-gray-900">{value}</div>
    </div>
  );

  const infoSection = (title, items) => (
    <div className="p-4 bg-white rounded-md shadow-sm mb-4">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div>
        {items.map((item, index) => (
          <InfoItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );

  const workEdit = () => {
console.log('chal rha hai')
    navigate(`/employee/work/${id}`)
  };

  const bankEdit=()=>{
       navigate(`/employee/bank/${id}`);
  }

  return (
    <div>
      <div className="p-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Personal Information */}
          <div className="bg-white rounded-md shadow-sm p-4">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <InfoItem label="Date of Birth" value={personal.dob} />
            <InfoItem label="Gender" value={personal.gender} />
            <InfoItem label="Address" value={personal.address} />
            <InfoItem label="Country" value={personal.country} />
            <InfoItem label="State" value={personal.state} />
            <InfoItem label="City" value={personal.city} />
            <InfoItem label="Qualification" value={personal.qualification} />
            <InfoItem label="Experience" value={personal.experience} />
            <InfoItem label="Marital Status" value={personal.maritalStatus} />
            <InfoItem label="Children" value={personal.children} />
            <InfoItem label="Emergency Contact" value={personal.emergencyContact} />
            <InfoItem label="Emergency Contact Name" value={personal.emergencyContactName} />
            <InfoItem label="Emergency Contact Relation" value={personal.emergencyContactRelation} />
          </div>

          {/* Work Information */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-md shadow-sm p-1 mb-4">
              <div className="flex justify-end">
                <button onClick={()=>workEdit()}>
                  <FiEdit className="text-2xl text-blue-500" />
                </button>
              </div>
              <div className="flex items-center mb-4">
                <svg
                  // xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium">Work Information</h3>
                <div className="ml-auto h-2 w-2 bg-red-500 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    Department
                  </div>
                  <div className="text-gray-900">{work.department}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Job Position
                  </div>
                  <div className="text-gray-900">{work.position}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Shift Information
                  </div>
                  <div className="text-gray-900">{work.shiftInfo}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Work Type
                  </div>
                  <div className="text-gray-900">{work.workType}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Employee Type
                  </div>
                  <div className="text-gray-900">{work.employeeType}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Reporting Manager
                  </div>
                  <div className="text-gray-900">{work.manager}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    Company
                  </div>
                  <div className="text-gray-900">{work.company}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Work Location
                  </div>
                  <div className="text-gray-900">{work.location}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    End Date
                  </div>
                  <div className="text-gray-900">{work.endDate}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Joining Date
                  </div>
                  <div className="text-gray-900">{work.joiningDate}</div>
                </div>
               
                <div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Salary
                  </div>
                  <div className="text-gray-900">{work.salary}</div>
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div className="bg-white rounded-md shadow-sm p-4 py-10">
              <div className='flex justify-end'>
                 <button className='justify-end' onClick={()=>bankEdit()}>
                  <FiEdit className='text-2xl text-blue-500'/>
                 </button>
              </div>
              <h3 className="text-lg font-medium mb-4">Bank Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="Bank Name" value={bank.name} />
                <InfoItem label="Account Number" value={bank.accountNumber} />
                <InfoItem label="Branch" value={bank.branch} />
                <InfoItem label="Bank Code" value={bank.code1} />
                <InfoItem label="Bank Address" value={bank.address} />
                <InfoItem label="Country" value={bank.country} />
                <InfoItem label="Bank IFSC" value={bank.ifscCode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
