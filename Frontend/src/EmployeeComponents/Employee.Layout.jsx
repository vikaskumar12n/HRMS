import { Outlet } from 'react-router-dom';
import EmployeeSidebaar from './Employee.SideBar';
import EmployeeTopbar from './Employee.Topbar';

const EmployeeLayout = () => {
  return (
    <div className="flex h-screen">
      <EmployeeSidebaar/>
      <div className="flex flex-col flex-1">
         <EmployeeTopbar/>
        <div className="flex-1 overflow-auto p-5 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;
