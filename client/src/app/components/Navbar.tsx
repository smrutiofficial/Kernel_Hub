/* eslint-disable @next/next/no-img-element */
"use client";
import React,{useState,useEffect} from "react";
// import Image from "next/image";
import ProfilePic from "../image/profile-pic.png";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {backend_link} from "@/app/constants/constant";
import axios from "axios";

interface Profile {
  name: string;
  email: string;
  image?: string; // Make `image` optional
}
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  
    // profile info
    const [profile, setProfile] = useState<Profile>({
      email:"",
      name:"",
      image: "",
    });
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
  // Get the current pathname

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Optionally redirect to the login page or home
    router.push("/auth/login");
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${backend_link}/api/auth/me`, {
            headers: { "x-auth-token": token },
          });
          setProfile({
            email:response.data.email,
            name:response.data.name,
            image: response.data.image,
          });
        } catch (err) {
          console.error(err);
          // setError("Failed to fetch profile data.");
        }
      } else {
        // setError("No token found.");
      }
      // setLoading(false);
    };

    fetchProfile();
  }, []);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-white text-3xl font-bold">
            Kernel <span className="text-[#AAFFA9]">Hub</span>
          </p>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <p
                className={`${
                  pathname === "/" 
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#AAFFA9] to-emerald-500"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
              >
                Home
              </p>
            </Link>
          </li>

          <li>
            <Link href="/resources">
              <p
                className={`${
                  pathname === "/resources"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#AAFFA9] to-emerald-500"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
              >
                Resources
              </p>
            </Link>
          </li>
          <li>
            <Link href="/community">
              <p
                className={`${
                  pathname === "/community"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#AAFFA9] to-emerald-500"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
              >
                Community
              </p>
            </Link>
          </li>
          <li>
            <Link href="/feedback">
              <p
                className={`${
                  pathname === "/feedback"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#AAFFA9] to-emerald-500"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
              >
                Feedback
              </p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p
                className={`${
                  pathname === "/about"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#AAFFA9] to-emerald-500"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
              >
                About
              </p>
            </Link>
          </li>
        </ul>
        <div className="flex flex-row gap-4 justify-center items-center">
          <button onClick={handleLogout} className="button-64">
            <span className="text-sm py-2 px-6 font-medium hover:text-gray-700 hover:font-medium">
              Logout
            </span>
          </button>
          <div 
          className="h-10 w-10 overflow-hidden flex justify-center items-center ">
            
            {profile?.image ? (
              <img
                src={profile.image}
                onClick={() => router.push("/profile")}
                alt="Profile Image"
                className="rounded-full w-full h-full object-cover border-2 border-emerald-300 cursor-pointer"
              />
            ) : (
              <img
                src={ProfilePic.src} // Use ProfilePic.src for fallback
                onClick={() => router.push("/profile")}
                alt="Default Profile Image"
                className="rounded-full w-full h-full object-cover border-2 border-emerald-300 cursor-pointer"
              />
            )}
            
            {/* <Image
              src={ProfilePic}
              alt="User Profile"
              className="rounded-full object-cover border-2 border-emerald-300 cursor-pointer"
              layout="fixed"
              onClick={() => router.push('/profile')}
            /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
