import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 max-w-[1600px] mx-auto animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
