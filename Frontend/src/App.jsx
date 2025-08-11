import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Layout from "./component/Layout";
import About from "./page/About/About";
import EmployeeList from "./page/Employee/EmployeeList";
import EmployeeDetail from "./page/Employee/EmployeeDetail";
import EmployeeAdd from "./page/Employee/EmployeeAdd";
import Policy from "./page/Policy/Policy";
import EmployeeAddPolicy from "./page/Policy/AddPolicy";
import AuthLogin from "./page/Auth/Login";
import EmployeeAttendance from "./page/EmployeeAttendance/EmployeeAttendance";
import { ToastContainer } from "react-toastify";
import AttendanceLogs from "./page/EmployeeAttendance/AttendanceLogs";
import EmployeeOverview from "./page/Employee/EmployeeOverview";
import LeaveLogs from "./page/LeaveList/LeaveLogs";
import LeaveRules from "./page/LeaveList/LeaveRules";
import AttendanceRules from "./adminPages/AttendanceRules";
import Onboarding from "./page/Onboarding/Onboarding";
import Recruitment from "./page/Recruitment/Recruitment";
import Notification from "./page/Notification/Notification";
import Payroll from "./page/Payroll/Payroll";
import Policies from "./page/About/Policies";
import TermCondition from "./page/About/TermCondition";
import ProtectedAuth from "./page/Auth/ProtectedAuth";
import Unauthorized from "./component/Unauthorized";
import GetPolicy  from  "./page/Policy/Policy"
import EmployeeAddTerm from "./page/Term-Condition/AddTermCondition"
import EmployeeDashboard from "./page/Employee/Dashboard/EmployeeDashboard";
import EmployeeLayout from "./EmployeeComponents/Employee.Layout";
import UserDashboard from './page/Home/UserDashboard';
// import HomeDashboard from './page/Home/HomeDashboard'; // Missing import add kiya

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* <Route path="/home" element={<HomeDashboard />} /> */}

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="employee/list" element={<EmployeeList />} />
          <Route path="employee/details/:id" element={<EmployeeDetail />} />
        </Route>

        <Route element={<ProtectedAuth isPrivate={true} allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="employee/list" element={<EmployeeList />} />
            <Route path="employee/details/:id" element={<EmployeeDetail />} />
            <Route path="employee/overview/:id" element={<EmployeeOverview />} />
            <Route path="employee/edit/:id" element={<EmployeeAdd />} />
            <Route path="employee/add" element={<EmployeeAdd />} />
            <Route path="employee/policy" element={<Policy />} />
            <Route path="employee/add/policy" element={<EmployeeAddPolicy />} />
            <Route path="attendance/logs" element={<AttendanceLogs />} />
            <Route path="attendance/rules" element={<AttendanceRules />} />
            <Route path="attendance/employee" element={<EmployeeAttendance />} />
            <Route path="leave/logs" element={<LeaveLogs />} />
            <Route path="leave/rules" element={<LeaveRules />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="recruitment" element={<Recruitment />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="notification" element={<Notification />} />
            {/* <Route path="policies" element={<GetPolicy />} />
            <Route path="add/policies" element={<EmployeeAddPolicy />} /> */}
            {/* <Route path="term-condition" element={<TermCondition />} />
            <Route path="add/term-condition" element={<EmployeeAddTerm />} /> */}s
          </Route>
        </Route>

        <Route element={<ProtectedAuth isPrivate={true} allowedRoles={["employee"]} />}>
          <Route path='/employee/dashboard' element={<EmployeeLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path='employee/overview/:id' element={<EmployeeOverview basePath='/employee/dashboard' />} />
            <Route path='notification' element={<Notification basePath='/employee/dashboard' />} />
            <Route path="employee/edit/:id" element={<EmployeeAdd basePath='/employee/dashboard' />} />
            <Route path="policies" element={<Policies />} />
            <Route path="term-condition" element={<TermCondition />} />
            <Route path="about" element={<About />} />
          </Route>
        </Route>

        <Route element={<ProtectedAuth isPrivate={false} />}>
          <Route path="/" element={<AuthLogin />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
