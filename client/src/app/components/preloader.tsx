// components/Preloader.js
import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center flex-col gap-6 justify-center bg-gray-900 bg-opacity-75 z-50">
       <p className="text-white text-6xl font-bold">
          Kernel <span className="text-[#AAFFA9]">Hub</span>
        </p>
      <div className="w-12 h-12 border-4 border-[#AAFFA9] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Preloader;
