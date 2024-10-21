"use client";
import React from "react";
import Image from "next/image";
import ProfilePic from "../image/profile-pic.png";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Optionally redirect to the login page or home
    router.push("/auth/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-xl font-bold">
          Kernel Hub
        </a>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white border-[#11FFBD] border-b-4">
              Home
            </a>
          </li>

          <li>
            <a href="/services" className="text-white hover:text-gray-300">
              Resources
            </a>
          </li>
          <li>
            <a href="/contact" className="text-white hover:text-gray-300">
              Community
            </a>
          </li>
          <li>
            <a href="/contact" className="text-white hover:text-gray-300">
              Feedback
            </a>
          </li>
          <li>
            <a href="/about" className="text-white hover:text-gray-300">
              About
            </a>
          </li>
        </ul>
        <div className="flex flex-row gap-4 justify-center items-center">
          <button
            onClick={handleLogout}
            className="button-64"
          >
             <span className="text-sm py-2 px-6 font-medium hover:text-gray-700 hover:font-medium">Logout</span>
          </button>
          <div className="h-9 w-9 overflow-hidden flex justify-center items-center ">
            <Image
              src={ProfilePic}
              alt="User Profile"
              className="rounded-full object-cover border-2 border-emerald-300 cursor-pointer"
              layout="fixed"
              onClick={() => router.push('/profile')}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
