"use client"

import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Comments from "./components/Comments";
import Manage_blog from "./components/Manage_blog";
import Resources from "./components/Resources";
import Newblog from "./components/Newblog";
import Services from "./components/Services";

export default function Home() {
  const [sidev,setSidev]=useState("Dashboard");
  const handleContents = (res:string) => {    
    setSidev(res)
  };
  return (
    <>
      <div className="h-screen w-screen flex flex-row overflow-hidden">
        <Sidebar handlecontents={handleContents} />
        <div className="bg-gray-700 w-[80%] h-full">
          {/* contents */}
          {sidev === "Dashboard" && <Dashboard />}
          {sidev === "All Comments" && <Comments />}
          {sidev === "Manage Blog" && <Manage_blog />}
          {sidev === "Resources" && <Resources />}
          {sidev === "New Blog" && <Newblog />}
          {sidev === "Services" && <Services />}
        </div>
      </div>
    </>
  );
}
