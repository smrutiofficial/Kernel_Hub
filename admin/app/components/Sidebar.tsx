"use client";

import React, { useState } from "react";

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdNewLabel } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { FaCommentAlt } from "react-icons/fa";
import { SiCrowdsource } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaTags } from "react-icons/fa6";

const Sidebar = ({
  handlecontents,
}: {
  handlecontents: (item: string) => void;
}) => {
  const [selectedItem, setSelectedItem] = useState<string>("Dashboard");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    // console.log(item);
    handlecontents(item);
  };

  const getItemStyle = (item: string) => {
    return selectedItem === item
      ? "border border-emerald-500 rounded-md bg-[#AAFFA9] py-3 text-gray-800 hover:text-gray-600 mb-4"
      : "border-2 hover:border-gray-600 border-transparent rounded-md py-3 text-white hover:text-gray-300 mb-4";
  };
  const router = useRouter();

  return (
    
    <div className="bg-gray-800 w-[20%] h-full flex flex-col items-center justify-between py-16 overflow-hidden relative">
      <div className="w-full flex flex-col items-center relative">
            <div className="h-40 w-40 bg-emerald-500 blur-[15rem] absolute -z-9 top-10 left-0"></div>
            <div className="h-40 w-40 bg-[#AAFFA9] blur-[15rem] absolute -z-2 -bottom-40 right-0"></div>

      <div className="relative z-10">
        <p className="text-3xl font-bold mb-8 text-white">
          Kernal <span className="text-[#AAFFA9]">Hub</span>
        </p>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col mt-8 w-2/3 cursor-pointer">
          <button
            className={`${getItemStyle(
              "Dashboard"
            )} flex pl-12 gap-6 items-center `}
            onClick={() => handleItemClick("Dashboard")}
          >
            <TbLayoutDashboardFilled className="text-3xl" />
            Dashboard
          </button>
          <button
            className={`${getItemStyle(
              "New Blog"
            )} flex pl-12 gap-6 items-center`}
            onClick={() => handleItemClick("New Blog")}
          >
            <MdNewLabel className="text-3xl" />
            New Blog
          </button>

          <button
            className={`${getItemStyle(
              "Manage Blog"
            )} flex pl-12 gap-6 items-center`}
            onClick={() => handleItemClick("Manage Blog")}
          >
            <SiGoogletagmanager className="text-2xl" />
            Manage Blog
          </button>
          <button
            // href="/all-comments"
            className={`${getItemStyle(
              "All Comments"
            )} flex pl-12 gap-6 items-center`}
            onClick={() => handleItemClick("All Comments")}
          >
            <FaCommentAlt className="text-2xl" />
            All Comments
          </button>
          <button
            // href="/all-comments"
            className={`${getItemStyle(
              "Manage Tags"
            )} flex pl-12 gap-6 items-center`}
            onClick={() => handleItemClick("Manage Tags")}
          >
            <FaTags className="text-2xl" />
            Manage Tags
          </button>
          <button
            // href="/resources"
            className={`${getItemStyle(
              "Resources"
            )} flex pl-12 gap-6 items-center`}
            onClick={() => handleItemClick("Resources")}
          >
            <SiCrowdsource className="text-3xl" />
            Resources
          </button>
          <button
            // href="/services"
            className={`${getItemStyle(
              "Services"
            )} flex pl-12 gap-6 items-center`}
            onClick={() => handleItemClick("Services")}
          >
            <MdDesignServices className="text-3xl" />
            Services
          </button>
        </div>
      </div>
      </div>


      <div className="w-full flex items-center flex-col">
        <button
          onClick={() => {
            localStorage.removeItem("token"); 
            router.push("/auth/login");
          }}
          className="border-2 w-2/3 flex items-center hover:bg-red-400 bg-opacity-100 hover:bg-opacity-70 
          justify-center font-bold border-gray-700 gap-6 rounded-md py-3 text-white mb-4"
        >
          <IoLogOut className="text-3xl"/>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
