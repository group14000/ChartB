import React from "react";
import { IoIosNotifications } from "react-icons/io";

const AppHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 shadow">
      <div className="flex items-center mb-4 sm:mb-0">
        <img src="/logo.svg" alt="logo" className="h-12 sm:h-10 md:h-12 lg:h-14 xl:h-16 mx-auto sm:mx-0" />
      </div>
      <div className="flex items-center space-x-4">
        <IoIosNotifications className="text-2xl sm:text-xl md:text-2xl lg:text-3xl text-gray-600 cursor-pointer hover:text-gray-800" />
        <div className="w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden">
          <img
            src="/avatar.svg"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
