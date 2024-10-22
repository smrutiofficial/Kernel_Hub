import React from "react";

const Dashboard = () => {
  return (
    <div className="p-10 h-full overflow-hidden">
      <div className="mb-4">
        <p className="text-2xl font-bold">DashBoard</p>
      </div>
      <div className="border w-full h-[43%] flex flex-row">
        <div className="border w-1/3 h-full py-10 px-20">total users</div>
        <div className="border w-1/3 h-full py-10 px-20">toals post</div>
        <div className="border w-1/3 h-full py-10 px-20">total comments</div>
      </div>

      <div className="flex w-full mt-6 border h-2/4">
        <div className="border h-full w-[66.5%] p-16">
          <p className="">Recent Comments</p>
        </div>
        <div className="border flex flex-col w-[33.5%]">
          <div className="border h-full w-full p-16">Server uptime</div>
          <div className="border h-full w-full p-16">Admin Profile</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
