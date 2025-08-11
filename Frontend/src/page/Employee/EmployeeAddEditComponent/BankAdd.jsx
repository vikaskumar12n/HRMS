import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  useBankAddMutation,
  useGetOneEmployeeBankQuery,
} from "../../../rtk/employeeBank";
import {
  Banknote,
  Hash,
  Landmark,
  LocateFixed,
  Globe,
  ScanLine,
  XCircle,
  Save,
} from "lucide-react";

const EmployeeBankInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [bankAdd, { isLoading }] = useBankAddMutation();
  const { data: bankData } = useGetOneEmployeeBankQuery({ id });

  const [data, setData] = useState({
    bankName: "",
    accountNumber: "",
    branch: "",
    bankCode: "",
    bankAddress: "",
    country: "",
    ifscCode: "",
  });

  useEffect(() => {
    if (bankData) {
      setData({
        bankName: bankData.bankName,
        accountNumber: bankData.accountNumber,
        branch: bankData.branch,
        bankCode: bankData.bankCode,
        bankAddress: bankData.bankAddress,
        country: bankData.country,
        ifscCode: bankData.ifscCode,
      });
    }
  }, [bankData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{9,18}$/.test(data?.accountNumber)) {
  alert("Account number must be 9–18 digits only")
  return ;
}
if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data?.ifscCode)) {
  alert("Invalid IFSC format (e.g., SBIN0000123)");
  return ;
}

    try {
      const result = await bankAdd({ data, id }).unwrap();
      if (result.success) {
        navigate("?tab=other");
      }
    } catch (error) {
      alert(error?.message || "Something went wrong");
      console.error("Failed to submit bank data:", error);
    }
  };

  return (
    <div className=" rounded-lg p-6 pb-0 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        {/* <Banknote className="w-5 h-5 mr-2" /> */}
        Employee Bank Information
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <ClipLoader size={28} color="#06425F" />
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Landmark className="inline h-4 w-4 mr-1" />
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                value={data.bankName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06425F]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Hash className="inline h-4 w-4 mr-1" />
                Account Number
              </label>
              <input
                type="number"
                name="accountNumber"
                value={data.accountNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06425F]"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <LocateFixed className="inline h-4 w-4 mr-1" />
                Branch
              </label>
              <input
                type="text"
                name="branch"
                value={data.branch}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06425F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                name="bankCode"
                value={data.bankCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06425F]"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Globe className="inline h-4 w-4 mr-1" />
                Country
              </label>
              <input
                type="text"
                name="country"
                value={data.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06425F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Address
              </label>
              <input
                type="text"
                name="bankAddress"
                value={data.bankAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06425F]"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <ScanLine className="inline h-4 w-4 mr-1" />
              IFSC Code
            </label>
            <input
              type="text"
              name="ifscCode"
              value={data.ifscCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06425F]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between bg-gray-50 py-3 px-2 border-t border-gray-200 gap-4 pt-4">
           
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 transition"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </button>
             <button
              type="submit"
              className="flex items-center bg-[#06425F] text-white px-5 py-2 rounded-md hover:bg-[#04364b] transition"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EmployeeBankInfo;
