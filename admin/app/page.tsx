"use client"

import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Comments from "./components/Comments";
import Manage_blog from "./components/Manage_blog";
import Resources from "./components/Resources";
import Newblog from "./components/Newblog";
import { useRouter } from "next/navigation";
import Services from "./components/Services";
import Tags from "@/app/components/Tags";
export default function Home() {
  const [sidev,setSidev]=useState("Dashboard");
  const handleContents = (res:string) => {    
    setSidev(res)
  };

  const router = useRouter();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      router.push("/");
    }
  },[router])
  return (
    <>
      <div className="h-screen w-screen flex flex-row overflow-hidden relative">
        <Sidebar handlecontents={handleContents} />
        <div className="bg-gray-700 w-[80%] h-full">
          {/* contents */}
          {sidev === "Dashboard" && <Dashboard />}
          {sidev === "All Comments" && <Comments />}
          {sidev === "Manage Blog" && <Manage_blog />}
          {sidev === "Manage Tags" && <Tags />}
          {sidev === "Resources" && <Resources />}
          {sidev === "New Blog" && <Newblog />}
          {sidev === "Services" && <Services />}
        </div>
      </div>
    </>
  );
}
