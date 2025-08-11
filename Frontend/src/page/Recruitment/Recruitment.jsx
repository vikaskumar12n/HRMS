import React from "react";
import { Hammer, Clock } from "lucide-react";

const Recruitment = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-[#06425F] max-w-md w-full">
        <div className="flex justify-center mb-4">
          <Hammer className="w-10 h-10 text-[#06425F]" />
        </div>
        <h1 className="text-2xl font-semibold text-[#06425F] mb-2">
          Recruitment Feature is Coming Soon!
        </h1>
        <p className="text-gray-600 mb-4">
          We’re currently working hard on this feature. It will be available in a future update.
        </p>
        <div className="flex justify-center items-center space-x-2 text-sm text-[#06425F] font-medium">
          <Clock className="w-4 h-4" />
          <span>Work in Progress</span>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
