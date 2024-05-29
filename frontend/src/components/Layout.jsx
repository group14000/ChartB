import React from "react";
import AppHeader from "./AppHeader";

const Layout = ({ children }) => {
  return (
    <div className="flex  bg-gray-100">
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
