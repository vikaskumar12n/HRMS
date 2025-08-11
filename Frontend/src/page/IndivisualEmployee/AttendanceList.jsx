
import React from 'react'
import TableComponent from '../../helper/TableComponent'
import { useGetAllEmployeeWorkQuery } from '../../rtk/employeeworck'
import { ClipLoader } from 'react-spinners'
import { useGetAttendanceDetailQuery } from '../../rtk/attendance.js'
export default function AttendanceList() {
 
    const{data,isLoading}=useGetAttendanceDetailQuery()
    
    // console.log("data++",data?.employeedata?.[0].name);

    const columns=[
        {header:"Name",accessor:"name"},
        {header:"Date",accessor:"date"},
        {header:"CheckIn",accessor:"checkIn"},
        {header:"CheckOut",accessor:"checkOut"},
        {header:"TotalworkingHour",accessor:"totalworkingHout"},
        {header:"status",accessor:"status"}
    ]
       
   
    const tableData = data?.attandanceData.map((emp) => {
      let status = emp?.status;
      let checkIn =emp?.loginTime
      ? new Date(emp.loginTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "N/A";
      let checkOut =emp?.loginTime
      ? new Date(emp.logoutTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "N/A";
      let totalworkingHout = emp?.workingHours;
    
      if (emp.checkIn === false) {
        status = "absent";
        checkIn = "N/A";
        checkOut = "N/A";
        totalworkingHout = "N/A";
      }
      let date = emp?.createdAt
      ? `${new Date(emp.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}`
      : "N/A";
    
      return {
        name: data?.employeedata?.[0].name, 
        date,
        checkIn,
        checkOut,
        totalworkingHout,
        status,
      };
    });
    
  
         
  return (
    <div>   
        {isLoading?(
            <div className='flex justify-center items-center h-screen'>
                <ClipLoader color="blue" size={30}/>
            </div>
        ):(
            <TableComponent columns={columns} data={tableData} itemsPerPage={10}/>
        )
        }
    </div>
  )
}
