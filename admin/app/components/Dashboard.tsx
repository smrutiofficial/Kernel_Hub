import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { backend_link } from "@/app/constants/constant";

const Dashboard = () => {
  interface Health {
    status: string;
    data: {
      database: {
        status: string;
        responseTime: string;
      };
      cloudinary: {
        status: string;
      };
      server: {
        uptime: string;
        memoryUsage: string;
      };
    };
  }
  const [health, setHealth] = useState<Health | null>(null);
  useEffect(() => {
    const featchhealth = async () => {
      try {
        const health = await axios.get(`${backend_link}/api/healthcheck`);
        setHealth(health.data);
      } catch (err) {
        console.log(err);
      }
    };
    featchhealth();
  }, []);

  return (
    <div className="p-10 h-full overflow-hidden relative text-white">
      <div className="h-[28rem] w-[28rem] bg-emerald-200 blur-[10rem] top-[10%] left-[15%] absolute -z-9"></div>
      <div className="h-[35rem] w-[35rem] bg-orange-200 blur-[10rem] bottom-[10%] right-[15%] absolute -z-9"></div>

      <div className="mb-4 relative">
        <p className="text-xl flex items-center gap-2 text-white">
          <TbLayoutDashboardFilled />
          DashBoard <span>/</span>
        </p>
      </div>
      {/* layout */}

      <div className="w-full h-[92%] flex flex-row justify-between relative">
        <div className="w-[40%]">
          {/*  */}
          <div className="w-full h-full flex flex-col justify-between">
            <div className="bg-gray-800 rounded-lg h-[32%] p-8 flex flex-col justify-between">
              {/* web analices */}
              <div className="">
                <p className="text-xl font-bold text-[#AAFFA9]">
                  Website Analytics
                </p>
                <p className="text-gray-400">Total 28.5% Conversion Rate</p>
              </div>
              <div className="">
                <p className=" font-bold mb-2 text-xl text-[#AAFFA9]">
                  Traffic
                </p>
                <div className="w-[72%] grid grid-cols-2 grid-rows-2 h-max gap-x-6 gap-y-4 mt-2 text-white">
                  <div className="text-sm flex flex-row gap-4 justify-between">
                    <p className="">Session</p>
                    <p className="border border-gray-600 px-4 rounded-md font-bold bg-gray-800">
                      0
                    </p>
                  </div>
                  <div className="text-sm flex flex-row gap-4 justify-between">
                    <p className="">Page Views</p>
                    <p className="border border-gray-600 px-4 rounded-md font-bold bg-gray-800">
                      0
                    </p>
                  </div>
                  <div className="text-sm flex flex-row gap-4 justify-between">
                    <p className="">Total User</p>
                    <p className="border border-gray-600 px-4 rounded-md font-bold bg-gray-800">
                      0
                    </p>
                  </div>
                  <div className="text-sm flex flex-row gap-4 justify-between">
                    <p className="">Comments</p>
                    <p className="border border-gray-600 px-4 rounded-md font-bold bg-gray-800">
                      0
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-row h-[32%]">
              <div className="bg-gray-800 rounded-lg w-[48.7%] h-full p-8">
                <p className="text-xl font-bold text-[#AAFFA9]">Active Users</p>
              </div>

              <div className="rounded-lg w-[48.7%] h-full bg-gray-800 py-6">
                <div className="text-xl font-bold text-[#AAFFA9] flex flex-col justify-center items-center">
                  <div className="w-24 h-24 bg-gray-600 rounded-full"></div>
                  <p className="text-md font-normal text-white mt-2">
                    Smruti Praksh Rout
                  </p>
                  <p className="text-sm font-normal text-gray-300">
                    smrutiprakashrout3@gmail.com
                  </p>
                  <button className="text-sm bg-gray-600 px-4 py-2 rounded-md mt-3">
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <div className="rounded-lg h-[32%] bg-gray-800 py-6 px-20">
              <p className="text-xl mb-2 font-bold text-[#AAFFA9] -mx-10">
                Health Check
              </p>
              {health ? (
                <div className="flex flex-col gap-2">
                  <p className="flex items-center justify-between px-10">
                    Server Status:{" "}
                    <span className="bg-[#AAFFA9] bg-opacity-25 px-4 py-1 rounded-md flex flex-row items-center gap-4">
                      {" "}
                      {health.status}{" "}
                      <span className="h-2 w-2 bg-green-500  rounded-full animate-pulse"></span>
                    </span>
                  </p>

                  <p className="flex items-center justify-between px-10">
                    Database Status:{" "}
                    <span className="bg-green-500 bg-opacity-25 px-4 py-1 rounded-md flex flex-row items-center gap-4">
                      {" "}
                      {health.data.database.status}{" "}
                      <span className="h-2 w-2 bg-green-500  rounded-full animate-ping"></span>
                    </span>
                  </p>
                  <p className="flex items-center justify-between px-10">
                    Cloudinary Status:{" "}
                    <span className="bg-green-500 bg-opacity-25 px-4 py-1 rounded-md flex flex-row items-center gap-4">
                      {" "}
                      {health.data.cloudinary.status}{" "}
                      <span className="h-2 w-2 bg-green-500  rounded-full animate-ping"></span>
                    </span>
                  </p>

                  <p className="flex items-center justify-between px-10">
                    Response Time:
                    <span
                      className={`${
                        parseInt(health.data.database.responseTime) <= 50
                          ? "bg-green-500"
                          : parseInt(health.data.database.responseTime) <= 100
                          ? "bg-yellow-500"
                          : parseInt(health.data.database.responseTime) <= 200
                          ? "bg-orange-500"
                          : "bg-red-500"
                      } bg-opacity-25 px-4 py-1 rounded-md flex flex-row items-center gap-4`}
                    >
                      {health.data.database.responseTime}
                      <span
                        className={`h-2 w-2 ${
                          parseInt(health.data.database.responseTime) <= 50
                            ? "bg-green-500"
                            : parseInt(health.data.database.responseTime) <= 100
                            ? "bg-yellow-500"
                            : parseInt(health.data.database.responseTime) <= 200
                            ? "bg-orange-500"
                            : "bg-red-500"
                        } rounded-full animate-bounce`}
                      ></span>
                    </span>
                  </p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-[59%] flex flex-col justify-between">
          {/*  */}
          <div
            className="h-[32%] rounded-lg bg-gray-800 p-10
          "
          >
            <p className="text-xl font-bold text-[#AAFFA9]">Monitoring</p>
          </div>
          <div className="h-[65.8%] bg-gray-800 rounded-lg p-10">
            <p className="text-xl font-bold text-[#AAFFA9]">Notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
