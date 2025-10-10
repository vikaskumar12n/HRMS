import { useIsLoginQuery } from "../../rtk/login";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ProtectedAuth = ({ isPrivate = false, allowedRoles = [] }) => {
  const location = useLocation();
  const { data, isLoading, isSuccess , refetch } = useIsLoginQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const navigate=useNavigate()



 


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
      if (isPrivate && !isLoading && !data?.role) {
    navigate("/", { replace: true });
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

  
  console.log("om nam shivay",isPrivate  );

  console.log(allowedRoles);
  

  console.log(userRole);
  

  {allowedRoles.map((val)=>console.log(val)
  )}
 
  
  
 
  
  
  if (isPrivate && !allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
    console.log("ka ho magur");
    
    return <Navigate to="/unauthorized" replace />;
  }

  if (!isPrivate && isLoggedIn) {
    if (userRole === "admin") return <Navigate to="/dashboard" replace />;
    if (userRole === "employee") return <Navigate to="/employee/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedAuth;
