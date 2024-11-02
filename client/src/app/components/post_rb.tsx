/* eslint-disable @next/next/no-img-element */
import React from "react";
import Postr from "./post_r";
import { FaArrowTrendUp } from "react-icons/fa6";
import moment from "moment";
import Link from "next/link";
import {upload_link} from "@/app/constants/constant"
import { useRouter } from "next/navigation";

interface PostData {
  _id: number;
  id: number;
  title: string;
  slug:string;
  content: string;
  image: string;
  tags: string[];
  comments: number;
  timestamp: string; // or Date if needed
}

interface PostProps {
  postData: PostData[];
  // totalpage: (message: string) => void; // Add this line
}

const Post_rb = ({ postData }: PostProps) => {
  const router = useRouter();
  return (
    <div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 relative
        after:content-[''] after:absolute after:h-full 
        after:w-full after:bg-gradient-to-r after:from-[#AAFFA9] after:via-transparent  after:to-emerald-500 after:t-1/2 after:l-1/2 
        after:translate-1/2 after:-z-10 p-[0.5rem] after:rounded-md
        
        before:content-[''] before:absolute before:h-full 
        before:w-full before:bg-gradient-to-r  before:from-[#AAFFA9] before:via-transparent before:to-emerald-500 before:t-1/2 before:l-1/2 
        before:translate-1/2 before:-z-10 before:rounded-md before:blur-md"
      >
        {postData.length > 0 && (
          <div
            key={postData[0]._id}
            onClick={()=>{
              router.push(`/blog/${postData[0]._id}`)
            }}
            className="bg-gray-900 cursor-pointer rounded-lg shadow-md p-4 max-h-[40rem] "
          >
            <div className="bg-gray-700 w-full h-[22rem] rounded-md overflow-hidden">
              <img
                src={`${upload_link}/${postData[0].image}`}
                alt=""
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <div className="">
                <Link
                  href={`/blog/${postData[0]._id}`}
                  className="flex flex-row gap-4 justify-between items-start hover:text-[#AAFFA9]"
                >
                  <h1 className="text-lg mb-2 font-bold h-16 py-2 overflow-hidden">
                    {postData[0].title}
                  </h1>
                  <p className="text-3xl">
                    <FaArrowTrendUp />
                  </p>
                </Link>
              </div>
              <p className="text-md h-12 overflow-hidden">
                {postData[0].content}
              </p>
              {postData[0].tags.map((tag) => (
                <button
                  key={tag}
                  className="border border-[#AAFFA9] text-[#AAFFA9] px-2 py-1 mt-4 mr-2 rounded-md text-sm"
                >
                  {tag}
                </button>
              ))}
              <div className="flex items-center mt-4 text-sm text-gray-100">
                <span className="flex items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <p className="text-gray-400">
                    {postData[0].comments} comments
                  </p>
                </span>
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-400">
                    {moment(postData[0].timestamp).format("Do MMM YYYY")}
                  </p>
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-900 rounded-lg shadow-md ">
          <div className="flex flex-col justify-center items-center">
            {/*  */}
            <Postr postData={postData} />
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post_rb;
