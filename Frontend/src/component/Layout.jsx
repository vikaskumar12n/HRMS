import React from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import TopHeader from './TopHeader';

const Layout = () => {
  return (
    <div className="flex h-screen">
      <SideBar/>
      <div className="flex flex-col flex-1">
         <TopHeader/>
        <div className="flex-1 overflow-auto p-5 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
