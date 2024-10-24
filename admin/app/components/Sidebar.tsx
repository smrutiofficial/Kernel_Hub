"use client";

import React, { useState } from "react";

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdNewLabel } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { FaCommentAlt } from "react-icons/fa";
import { SiCrowdsource } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

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

  return (
    <div className="bg-gray-800 w-[20%] h-full flex flex-col items-center justify-between py-16">
      <div className="w-full flex flex-col items-center">
      <div className="">
        <p className="text-3xl font-bold mb-8">
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
          className="border-2 w-2/3 flex items-center hover:bg-red-400 justify-center font-bold border-gray-700 gap-6 rounded-md py-3 text-white mb-4"
        >
          <IoLogOut className="text-3xl"/>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
