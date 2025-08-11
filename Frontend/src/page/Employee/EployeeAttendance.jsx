import React from "react";
import TableComponent from "../../helper-component/TableComponent";
import { useGetAllEmployeeQuery } from "../../rtk/employeeApi";
// import { tab } from "@material-tailwind/react";


const EmployeeAttendance=()=>{
  const{ data,isLoading,error}=useGetAllEmployeeQuery()
  
//    console.log("dataa++++",data)

    const columns=[
        {header:'Name',accessor:"name"},
        {header:"Phone",accessor:"phone"},
        {header:"Email",accessor:"email"},
        {header:"Attendance",accessor:"attendance"},
    ]

     const  tableData=(data??[]).map((emp)=>{

        return{
             name:emp.name||"",
             phone:emp.phone||"",
             email:emp.email||"",
             attendance:(
                <div className="flex gap-2.5 pl-5">
                    <button className="p-1 bg-blue-500 rounded-sm hover:bg-blue-700" onClick={()=>checkIn(emp._id)}>
                       check In
                     </button>
                     <button className="bg-red-500 p-1 rounded-sm hover:bg-red-600"
                       onClick={()=>checkOut(emp._id)}
                     >
                     chech out
                    </button>  
                    
                </div>
             )
        }

     })

   const checkIn=(id)=>{
            console.log("chechIn",id)     
   }


   const checkOut=(id)=>{
      console.log("checkOut",id);
      
   }

    return(
        <div>
              <TableComponent columns={columns} data={tableData} itemsPerPage={10}/> 
        </div>
    )
}


export default EmployeeAttendance;