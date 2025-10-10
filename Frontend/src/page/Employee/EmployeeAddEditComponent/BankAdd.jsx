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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

  // Validation function
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "bankName":
        if (!value.trim()) {
          error = "Bank name is required";
        } else if (value.trim().length < 2) {
          error = "Bank name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s&.-]+$/.test(value)) {
          error = "Bank name can only contain letters, spaces, &, ., and -";
        }
        break;

      case "accountNumber":
        if (!value.trim()) {
          error = "Account number is required";
        } else if (!/^\d{9,18}$/.test(value)) {
          error = "Account number must be 9-18 digits only";
        }
        break;

      case "branch":
        if (value.trim() && value.trim().length < 2) {
          error = "Branch name must be at least 2 characters";
        } else if (value.trim() && !/^[a-zA-Z0-9\s&.-]+$/.test(value)) {
          error = "Branch name contains invalid characters";
        }
        break;

      case "bankCode":
        if (value.trim() && value.trim().length < 2) {
          error = "Account holder name must be at least 2 characters";
        } else if (value.trim() && !/^[a-zA-Z\s.]+$/.test(value)) {
          error = "Account holder name can only contain letters, spaces, and dots";
        }
        break;

      case "country":
        if (value.trim() && value.trim().length < 2) {
          error = "Country name must be at least 2 characters";
        } else if (value.trim() && !/^[a-zA-Z\s]+$/.test(value)) {
          error = "Country name can only contain letters and spaces";
        }
        break;

      case "bankAddress":
        if (value.trim() && value.trim().length < 5) {
          error = "Bank address must be at least 5 characters";
        } else if (value.trim() && !/^[a-zA-Z0-9\s,.-]+$/.test(value)) {
          error = "Bank address contains invalid characters";
        }
        break;

      case "ifscCode":
        if (value.trim() && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
          error = "Invalid IFSC format (e.g., SBIN0000123)";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(data).forEach((field) => {
      const error = validateField(field, data[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Validate field on change
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(data).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);

    // Check if there are any errors
    if (Object.keys(formErrors).length > 0) {
      alert("Please fix all validation errors before submitting");
      return;
    }

    // Additional validation (existing)
    if (!/^\d{9,18}$/.test(data?.accountNumber)) {
      alert("Account number must be 9–18 digits only");
      return;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data?.ifscCode)) {
      alert("Invalid IFSC format (e.g., SBIN0000123)");
      return;
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
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#06425F] ${
                  errors.bankName && touched.bankName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                required
              />
              {errors.bankName && touched.bankName && (
                <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
              )}
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
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#06425F] ${
                  errors.accountNumber && touched.accountNumber
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                required
              />
              {errors.accountNumber && touched.accountNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>
              )}
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
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#06425F] ${
                  errors.branch && touched.branch
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.branch && touched.branch && (
                <p className="text-red-500 text-xs mt-1">{errors.branch}</p>
              )}
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
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#06425F] ${
                  errors.bankCode && touched.bankCode
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.bankCode && touched.bankCode && (
                <p className="text-red-500 text-xs mt-1">{errors.bankCode}</p>
              )}
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
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#06425F] ${
                  errors.country && touched.country
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.country && touched.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
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
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#06425F] ${
                  errors.bankAddress && touched.bankAddress
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.bankAddress && touched.bankAddress && (
                <p className="text-red-500 text-xs mt-1">{errors.bankAddress}</p>
              )}
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
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#06425F] ${
                errors.ifscCode && touched.ifscCode
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.ifscCode && touched.ifscCode && (
              <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>
            )}
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