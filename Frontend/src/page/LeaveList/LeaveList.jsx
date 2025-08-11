import React from "react";
import TableComponent from "../../helper/TableComponent";
import { useApproveLeaveMutation, useGetEmployeeLeaveQuery, useRejectLeaveMutation } from "../../rtk/leaveApi";
import { ClipLoader } from "react-spinners";

export default function LeaveList() {
  const { data: allLeave, isLoading } = useGetEmployeeLeaveQuery();
  const [leaveApproved, { isLoading: leaveLoading }] = useApproveLeaveMutation();
  const [rejectLeave,{isLoading:rejectLoading}]=useRejectLeaveMutation()

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Reason", accessor: "reason" },
    { header: "FromDate", accessor: "fromdate" },
    { header: "ToDate", accessor: "todate" },
    { header: "Status", accessor: "status" },
    { header: "Action", accessor: "action" }
  ];

  const handleApprove = async (id) => {
    try {
      console.log("a++i", id);
      const response = await leaveApproved({ id });
      // console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleReject = async(id) => {
    try {
      console.log("i++", id);
      const response=await rejectLeave({id});
      console.log(response);
      
    } catch (err) {
      console.log(err.message);
    }
  };

  const data = allLeave ? allLeave?.map((val) => {
    let name = val.employeeId?.name || "";
    let mobile = val.employeeId?.mobile || "";
    let email = val.employeeId?.email || "";
  
    return {
      reason: val.description,
      fromdate: new Date(val.startDate).toLocaleDateString("en-IN"),
      todate: new Date(val.endDate).toLocaleDateString("en-IN"),
      name,
      mobile,
      email,
      status: val.status, 
      action: (
        <div className="flex gap-2">
          {val.status === "Approved" ? (
            <div className="flex justify-center items-center bg-[#075271] text-white px-4 py-1 rounded w-full">
              ✔️
            </div>
          ) : val.status === "Rejected" ? (
            <div className="flex justify-center items-center bg-red-300 text-white px-4 py-1 rounded w-full">
              ❌
            </div>
          ) : (
            <>
              <button
                onClick={() => handleApprove(val._id)}
                className=" bg-[#075271] text-white px-4 py-1 rounded hover:bg-[#075290] w-1/2"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(val._id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 w-1/2"
              >
                Reject
              </button>
            </>
          )}
        </div>
      )
    };
  }) : [];
  

   if(isLoading||leaveLoading||rejectLoading){
    return(
      <div className=" flex justify-center items-center h-screen">
         <ClipLoader size={30} color="blue"/>
      </div>
    )
   }

  return (
    <div>
      <TableComponent columns={columns} data={data} itemsPerPage={10} />
    </div>
  );
}
