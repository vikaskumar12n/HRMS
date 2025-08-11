import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";
import { useLeaveCreateMutation } from "../../../rtk/leaveApi";

function LeaveRequestModal({ onClose }) {
  const { id } = useParams();

  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
    breakDown: "full",
  });

  const [error, setError] = useState("");
  const [leaveCreate, { isLoading }] = useLeaveCreateMutation();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const { startDate, endDate, reason } = form;

    if (!startDate || !endDate || !reason.trim()) {
      setError("All fields are required.");
      return false;
    }
    if (startDate < today || endDate < today) {
      setError("Dates cannot be in the past.");
      return false;
    }
    if (endDate < startDate) {
      setError("End date cannot be before start date.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await leaveCreate({ id, formData: form }).unwrap();
      alert("Leave requested successfully");
      onClose();
    } catch (err) {
      alert(`${err.message || 'Submission failed. Try again.'}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-2">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between border-gray-300 border-b px-4 py-2">
          <h2 className="text-lg font-semibold text-[#06425F]">Request Leave</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-3 text-sm">
          <div>
            <label className="block mb-1 text-gray-600">Leave Type</label>
            <select
              name="leaveType"
              value={form.leaveType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#06425F]"
            >
              {["Casual", "Sick", "Earned", "Maternity", "Paternity", "unpaid"].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 text-gray-600">Start Date</label>
              <input
                type="date"
                name="startDate"
                min={today}
                value={form.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#06425F]"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-gray-600">End Date</label>
              <input
                type="date"
                name="endDate"
                min={form.startDate || today}
                value={form.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#06425F]"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Break Type</label>
            <select
              name="breakDown"
              value={form.breakDown}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#06425F]"
            >
              <option value="full">Full Day</option>
              <option value="first_half">First Half</option>
              <option value="second_half">Second Half</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Reason</label>
            <textarea
              name="reason"
              rows={2}
              value={form.reason}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#06425F]"
              placeholder="Explain briefly..."
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-300 px-4 py-2">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-[#06425F] text-white px-4 py-1.5 text-sm rounded hover:bg-[#04384d] transition"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequestModal;
