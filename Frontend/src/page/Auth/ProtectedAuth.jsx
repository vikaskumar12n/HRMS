// // ProtectedAuth.jsx
// import React, { useEffect, useState } from "react";
// import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { ClipLoader } from "react-spinners";

// // Utility to get userData from localStorage
// const getUserData = () => {
//   try {
//     return JSON.parse(localStorage.getItem("userData"));
//   } catch (e) {
//     return null;
//   }
// };

// const ProtectedAuth = ({ isPrivate = false, allowedRoles = [] }) => {
//   const location = useLocation();
//   const [userData, setUserData] = useState(getUserData());
//   const [loading, setLoading] = useState(true);

//   // 🔁 Re-run on route change or login/logout
//   useEffect(() => {
//     const user = getUserData();
//     setUserData(user);
//     setLoading(false);
//   }, [location.pathname]); // This ensures re-run on route change

//   // ✅ Show loader if required
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <ClipLoader size={40} color="#075271" />
//       </div>
//     );
//   }

//   const isLoggedIn = Boolean(userData?.data?.token);
//   const role = userData?.data?.role?.toLowerCase();

//   // 🔒 Private route but not logged in
//   if (isPrivate && !isLoggedIn) {
//     return <Navigate to="/" replace state={{ from: location }} />;
//   }

//   // ❌ Role not allowed
//   if (isPrivate && role && !allowedRoles.map(r => r.toLowerCase()).includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // 🚫 Public route but already logged in
//   if (!isPrivate && isLoggedIn) {
//     if (role === "admin") return <Navigate to="/dashboard" replace />;
//     if (role === "employee") return <Navigate to="/employee/dashboard" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedAuth;
















import { useIsLoginQuery } from "../../rtk/login";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ProtectedAuth = ({ isPrivate = false, allowedRoles = [] }) => {
  const location = useLocation();
  const { data, isLoading, isSuccess , refetch } = useIsLoginQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [ready, setReady] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    refetch();
  }, [location.pathname]);

  useEffect(() => {
    if (!isLoading && isSuccess && data?.role) {
      const role = data?.role?.toLowerCase();
      setUserRole(role);
      setReady(true);
    }

    if (!isLoading && (!data?.success || !data)) {
      setReady(true);
    }
  }, [isLoading, isSuccess, data]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen">
        
        <ClipLoader size={40} />
      </div>
    );
  }


const isLoggedIn = Boolean(data?.role);

  if (isPrivate && !isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  if (isPrivate && !allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!isPrivate && isLoggedIn) {
    if (userRole === "admin") return <Navigate to="/dashboard" replace />;
    if (userRole === "employee") return <Navigate to="/employee/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedAuth;
