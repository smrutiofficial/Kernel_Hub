import React from "react";

const Dashboard = () => {
  return (
    <div className="p-10 h-full overflow-hidden">
      <div className="mb-4">
        <p className="text-2xl font-bold">DashBoard</p>
      </div>
      <div className="w-full h-[43%] flex flex-row">
        <div className="w-1/3 h-full py-10 px-4">
          <div className="bg-gray-800 rounded-xl overflow-hidden border-4 border-gray-600 relative w-full h-full flex flex-col justify-center items-center gap-8">
            <div className="w-32 h-32 bg-[#AAFFA9] absolute blur-3xl -z-1"></div>
            <div className="w-32 h-32 bg-orange-500 translate-x-14 absolute blur-3xl -z-1"></div>
            <p className="text-4xl relative font-bold">Total Posts</p>
            <p className="text-3xl relative font-bold">32</p>
          </div>
        </div>
        <div className="w-1/3 h-full py-10 px-4">
          <div className="bg-gray-800 overflow-hidden border-4 border-gray-600 relative rounded-xl w-full h-full flex flex-col justify-center items-center gap-6">
            <div className="w-32 h-32 bg-teal-500 absolute blur-3xl -z-1"></div>
            <div className="w-32 h-32 bg-purple-500 translate-x-14 absolute blur-3xl -z-1"></div>
            <p className="text-4xl relative font-bold">Total User</p>
            <p className="text-3xl relative font-bold">276</p>
          </div>
        </div>
        <div className="w-1/3 h-full py-10 px-4">
          <div className="bg-gray-800 overflow-hidden border-4 border-gray-600 relative rounded-xl w-full h-full flex flex-col justify-center items-center gap-6">
            <div className="w-32 h-32 bg-red-400 absolute blur-3xl -z-1"></div>
            <div className="w-32 h-32 bg-blue-400 translate-x-14 absolute blur-3xl -z-1"></div>

            <p className="text-4xl relative font-bold">Total Comments</p>
            <p className="text-3xl relative font-bold">325</p>
          </div>
        </div>
      </div>

      <div className="flex w-[101%] h-2/4 p-5 -mt-8 gap-8">
        <div className="border-4 border-gray-600 h-full w-[66.5%] bg-gray-800 p-16 rounded-3xl">
          Recent Comments
        </div>
        <div className="flex gap-8 flex-col w-[33.5%] items-end">
          <div className="h-full w-[99.5%] p-16 border-4 border-gray-600 rounded-xl border-dashed bg-gray-800">
            Server uptime
          </div>
          <div className="border-4 border-gray-600 h-full rounded-xl w-[99.5%] bg-gray-800 border-dashed p-16">
            Admin Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
