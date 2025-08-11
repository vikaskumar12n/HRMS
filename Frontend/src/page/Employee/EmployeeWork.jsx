
import React from 'react'
import TableComponent from '../../helper/TableComponent'
import { useGetAllEmployeeWorkQuery } from '../../rtk/employeeworck'
import { ClipLoader } from 'react-spinners'
export default function EmployeeWorkType() {
  const {data,isLoading}=useGetAllEmployeeWorkQuery()

    // console.log("bhi maidata hu",data)
    const columns=[
        {header:"Name",accessor:"name"},
        {header:"Work Type",accessor:"worktype"},
        {header:"Department",accessor:"department"}
    ]
        console.log(data)
   
        const tableData = data && Array.isArray(data) && data.map((emp) => ({
            name: emp.employeeId?.name || "N/A",
            worktype: emp.workType,
            department:emp.department
          }));
          
          console.log(tableData)

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
