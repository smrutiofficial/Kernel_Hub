import React from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const Dashboard = () => {
  return (
    <div className="p-10 h-full overflow-hidden relative">
      <div className="h-[28rem] w-[28rem] bg-emerald-200 blur-[10rem] top-[10%] left-[15%] absolute -z-9"></div>
      <div className="h-[35rem] w-[35rem] bg-orange-200 blur-[10rem] bottom-[10%] right-[15%] absolute -z-9"></div>

      <div className="mb-4 relative">
        <p className="text-xl flex items-center gap-2"><TbLayoutDashboardFilled/>DashBoard <span>/</span></p>
      </div>
      {/* layout */}

      <div className="w-full h-[92%] flex flex-row justify-between relative">
        <div className="w-[40%]">
          {/*  */}
          <div className="w-full h-full flex flex-col justify-between">
            <div className="bg-gray-800 rounded-lg h-[32%] p-8 flex flex-col justify-between">
              {/* web analices */}
              <div className="">
                <p className="text-xl font-bold text-[#AAFFA9]">Website Analytics</p>
                <p className="text-gray-400">Total 28.5% Conversion Rate</p>
              </div>
              <div className="">
                <p className=" font-bold mb-2 text-xl text-[#AAFFA9]">Traffic</p>
                <div className="w-[72%] grid grid-cols-2 grid-rows-2 h-max gap-x-6 gap-y-4 mt-2">
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
              <div
                className="bg-gray-800 rounded-lg w-[48.7%] h-full"
              ></div>
              <div
                className="rounded-lg w-[48.7%] h-full bg-gray-800"
              ></div>
            </div>
            <div
              className="rounded-lg h-[32%] bg-gray-800"
            ></div>
          </div>
        </div>
        <div className="w-[59%] flex flex-col justify-between">
          {/*  */}
          <div
            className="h-[32%] rounded-lg bg-gray-800
          "
          ></div>
          <div className="h-[65.8%] bg-gray-800 rounded-lg p-10">
            <p className="text-xl font-bold text-[#AAFFA9]">Notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
