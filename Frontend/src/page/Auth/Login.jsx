import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsLoginQuery, useLoginApiMutation } from "../../rtk/login";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useUserContext } from "../UseContext/useContext";
import { toast } from "react-toastify";

const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loginApi, { isLoading: LoginLoading }] = useLoginApiMutation();
  const { data: isLoginData, isLoading ,refetch } = useIsLoginQuery();
  const { setUser} = useUserContext();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await loginApi(data).unwrap();
      if (response.success) {
        toast.success("Login successful!");
          setUser(response)
          localStorage.clear();
          localStorage.setItem('userData',JSON.stringify(response))
        const role = response?.data?.role?.toLowerCase();
        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "employee") {
          navigate("/employee/dashboard");
        }
      }
    } catch (error) {
      toast.error(error.message || "Login Failed. Please try again.");
    }
  };

 useEffect(() => {
  const checkLogin = async () => {
    const result = await refetch();
    if (result?.isSuccess) {
        toast.success("Login successful!");
      const role = result.data.role.toLowerCase();
      if (role === "admin") navigate("/dashboard");
      if (role === "employee") navigate("/employee/dashboard");
    }
  };

  checkLogin();
}, [refetch, navigate]);

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7feff] to-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-200 transition-all">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to continue to your dashboard
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#075271] focus:border-[#075271]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#075271] focus:border-[#075271]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={login}
            disabled={LoginLoading || isLoading}
            className="w-full py-3 px-4 bg-[#075271] hover:bg-[#06425f] disabled:bg-[#075271]/70 text-white text-sm font-medium rounded-lg shadow-md flex items-center justify-center"
          >
            {(LoginLoading || isLoading) ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span> {isLoading? ' Loading..':' Signing In...'} </span>
              </>
            ) : (
              <>
                <span>Sign In </span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* <div className="mt-6 text-sm text-center text-gray-600">
          <p>
            Forgot your password?{" "}
            <a href="#" className="text-[#075271] font-medium hover:underline">
              Reset here
            </a>
          </p>
        </div> */}

        <div className="mt-8 text-center text-xs text-gray-400">
          Developed by{" "}
          <span className="text-[#075271] font-semibold">
            <a href="https://codecrafter.co.in">Code Crafter Web Solutions</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
