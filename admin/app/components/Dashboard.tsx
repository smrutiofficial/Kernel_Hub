import React from "react";

const Dashboard = () => {
  return (
    <div className="p-10 h-full overflow-hidden relative">
      <div className="h-[28rem] w-[28rem] bg-emerald-200 blur-[10rem] top-[10%] left-[15%] absolute -z-9"></div>
      <div className="h-[28rem] w-[28rem] bg-cyan-200 blur-[10rem] bottom-[10%] right-[15%] absolute -z-9"></div>

      <div className="mb-4 relative">
        <p className="text-2xl font-bold">DashBoard</p>
      </div>
      {/* layout */}

      <div className="w-full h-[92%] flex flex-row justify-between relative">
        <div className="w-[40%]">
          {/*  */}
          <div className="w-full h-full flex flex-col justify-between">
            <div className="bg-gradient-to-r to-[#141E30] from-[#243B55] rounded-lg h-[32%] p-8 flex flex-col justify-between">
              {/* web analices */}
              <div className="">
                <p className="text-xl font-bold">Website Analytics</p>
                <p className="text-gray-400">Total 28.5% Conversion Rate</p>
              </div>
              <div className="">
                <p className=" font-bold mb-2 text-xl">Traffic</p>
                <div className="w-[72%] grid grid-cols-2 grid-rows-2 h-max gap-x-6 gap-y-4 mt-2">
                  <div className="text-sm flex flex-row gap-4 justify-between">
                    <p className="">Session</p>
                    <p className="border px-4 rounded-md font-bold bg-gray-800">
                      20
                    </p>
                  </div>
                  <div className="text-sm flex flex-row gap-4 justify-between">
                    <p className="">Page Views</p>
                    <p className="border px-4 rounded-md font-bold bg-gray-800">
                      5579
                    </p>
                  </div>
                  <div className="text-sm flex flex-row gap-4 justify-between">
                    <p className="">Total User</p>
                    <p className="border px-4 rounded-md font-bold bg-gray-800">
                      143
                    </p>
                  </div>
                  <div className="text-sm flex flex-row gap-4 justify-between">
                    <p className="">Comments</p>
                    <p className="border px-4 rounded-md font-bold bg-gray-800">
                      4211
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-row h-[32%]">
              <div
                className="bg-gradient-to-r border-[#2C3E50] 
              from-[#141E30] to-[#243B55]
               border rounded-lg w-[48.7%] h-full"
              ></div>
              <div
                className="rounded-lg w-[48.7%] h-full bg-gradient-to-r
            to-[#141E30] from-[#243B55]
              border border-[#2C3E50]"
              ></div>
            </div>
            <div
              className="rounded-lg h-[32%] bg-gradient-to-r 
            to-[#141E30] from-[#243B55]"
            ></div>
          </div>
        </div>
        <div className="w-[59%] flex flex-col justify-between">
          {/*  */}
          <div
            className="h-[32%] rounded-lg bg-gradient-to-r
          from-[#141E30] to-[#243B55]
          "
          ></div>
          <div className="h-[65.8%] bg-gradient-to-r from-[#141E30] to-[#243B55] rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
