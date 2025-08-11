import React, { useState } from "react";
import TableComponent from "../../helper/TableComponent";
import {
  useGetLeaveDetailQuery,
  useLeaveCreateMutation,
  useLeaveDeleteMutation,
  useLeaveUpdateMutation,
} from "../../rtk/leaveApi";
import { ClipLoader } from "react-spinners"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { isleaveConfirm } from "../../helper/SweetAlrertIsConfirm";

export default function EmployeeLeave() {
  const { data: leaveData, isLoading } = useGetLeaveDetailQuery();
  const [leavCeate, { isLoading: leaveLoading }] = useLeaveCreateMutation();
  const [deleteLeave, { isLoading: deleteLoading }] = useLeaveDeleteMutation()
  const [leaveUpdate, { isLoading: leaveUpdateLoading }] = useLeaveUpdateMutation();
  // console.log("leavedata:", leaveData?.employeeData?.name
  // );
  const [errors, setErrors] = useState({});
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [editLeaveId, setEditLeaveId] = useState(null);

  const [formData, setFormData] = useState({
    breakDown: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Leave Type", accessor: "leavetype" },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    { header: "Status", accessor: "status" },
    { header: "Description", accessor: "description" },
    { header: "Action", accessor: "action" },

  ];

  const handleEdit = (leaveItem) => {
    console.log("Edit clicked", leaveItem);
    setEditLeaveId(leaveItem);
    setFormData({
      breakDown: leaveItem.breakDown || "",
      leaveType: leaveItem.leaveType || "",
      startDate: leaveItem.startDate?.split("T")[0] || "",
      endDate: leaveItem.endDate?.split("T")[0] || "",
      description: leaveItem.description
    })
    setShowLeaveForm(true);
  };

  const handleDelete = async (leaveId) => {
    const isConfirm = await isleaveConfirm()
    if (isConfirm) {
      console.log("Delete clicked", leaveId);
      const response = await deleteLeave({ leaveId })
    }

  };

  const data = leaveData?.leaveData.map((e) => ({
    leavetype: e.leaveType,
    startDate: new Date(e.startDate).toLocaleDateString("en-IN"),
    endDate: new Date(e.endDate).toLocaleDateString("en-IN"),
    status: e.status,
    description: e.description,
    name: leaveData?.employeeData?.name,
    action: (
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(e)}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          <FaEdit className="size-6" />
        </button>
        <button
          onClick={() => handleDelete(e._id)}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          <MdDelete className="size-6" />
        </button>
      </div>
    ),

  })) || [];

  const handleCreateClick = () => {
    setShowLeaveForm(true);
  };
  const closeLeaveForm = () => {
    setShowLeaveForm(false);
  };
  const attendanceRequist = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.leaveType) newErrors.leaveType = "Leave type is required";
    if (!formData.breakDown) newErrors.breakDown = "Breakdown is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 3) {
      newErrors.description = "Minimum 3 characters required";
    } else if (formData.description.length > 30) {
      newErrors.description = "Maximum 30 characters allowed";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    let response;
    const realFormData = new FormData();
    realFormData.append("breakDown", formData.breakDown);
    realFormData.append("leaveType", formData.leaveType);
    realFormData.append("startDate", formData.startDate);
    realFormData.append("endDate", formData.endDate);
    realFormData.append("description", formData.description);
    const id = leaveData?.employeeData?.id;
    if (editLeaveId) {
      let id = editLeaveId._id;
      response = await leaveUpdate({ id, formData: realFormData })
      console.log();
    } else {
      response = await leavCeate({ id, formData: realFormData });
    }
    if (response.data.success) {
      setShowLeaveForm(false)
    }
  };

  if (leaveLoading || deleteLoading || leaveUpdateLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={30} color="blue" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Employee Leave</h2>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={handleCreateClick}
          >
            CREATE
          </button>
        </div>

        <TableComponent columns={columns} data={data} itemsPerPage={10} />

        {showLeaveForm && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Leave Request</h3>
                <button
                  onClick={closeLeaveForm}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <form className="space-y-4" onSubmit={attendanceRequist}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>{leaveData?.employeeData?.name}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Leave Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2"
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={handelChange}
                      required
                    >
                      <option value="">select</option>
                      <option value="Casual">Casual</option>
                      <option value="Sick">Sick</option>
                      <option value="Earned">Maternity</option>
                      <option value="Maternity">Paternity</option>
                      <option value="Paternity">holiday</option>
                    </select>
                    {errors.leaveType && <p className="text-red-500 text-sm mt-1">{errors.leaveType}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handelChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Breakdown <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2"
                      name="breakDown"
                      value={formData.breakDown}
                      onChange={handelChange}
                      required
                    >
                      <option value="">select</option>
                      <option value="full">Full Daya</option>
                      <option value="first_haf">First Half</option>
                      <option value="second_haf">Second Half</option>
                    </select>
                  </div>
                </div>

                <div className="grid  gap-4 h-full">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      name="endDate"
                      
                      value={formData.endDate}
                      onChange={handelChange}
                      
                    >
                      End date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handelChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      min={formData.startDate}
                      required
                    />
                    {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date Breakdown <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>Full Day</option>
                      <option>First Half</option>
                      <option>Second Half</option>
                    </select>
                  </div> */}
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachment
                  </label>
                  <input type="file" className="w-full border border-gray-300 rounded-md p-2" />
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handelChange}
                    className="w-full border border-gray-300 rounded-md p-2 h-24"
                    placeholder="Description"
                    required
                    minLength={3}
                    maxLength={30}
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeLeaveForm}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    // onClick={attendanceRequist}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
