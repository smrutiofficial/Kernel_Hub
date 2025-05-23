/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import moment from "moment";
import Link from "next/link";
import { upload_link } from "@/app/constants/constant";
import { useRouter } from "next/navigation";

// Define the type for Post data
interface PostData {
  _id: number;
  id: number;
  title: string;
  content: string;
  image: string;
  tags: string[];
  comments: number;
  timestamp: string; // or Date if needed
}

interface PostProps {
  postData: PostData[];
}

const Postr = ({ postData }: PostProps) => {
  // Filter only postData[1] and postData[2]
  const filteredData = postData.slice(1, 3);
  const router = useRouter();

  return (
    <>
      {filteredData.map((post) => (
        <div key={post._id}
        onClick={()=>{
          router.push(`/blog/${post._id}`)
        }}
        className="flex flex-row w-full cursor-pointer">
          <div className="w-1/2 py-4 pl-4 overflow-hidden">
            <div className="bg-gray-700 h-[17.5rem] overflow-hidden object-cover rounded-tl-lg rounded-bl-lg">
              <img
                src={`${upload_link}/${post.image}`}
                alt={`Cover for ${post.title}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-1/2 py-4 pr-4 overflow-hidden">
            <div className="bg-gray-800 p-4 h-full rounded-tr-lg rounded-br-lg">
              <div>
                <Link href={`/blog/${post._id}`} className="flex hover:text-[#AAFFA9] flex-row gap-4 justify-between items-start">
                  <h1 className="text-lg mb-2 font-bold h-16 py-2 overflow-hidden">{post.title}</h1>
                  <p className="text-3xl">
                    <FaArrowTrendUp />
                  </p>
                </Link>
              </div>
              <p className="h-20 py-1 overflow-hidden">{post.content}</p>
              <div className="h-14 overflow-hidden">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    className="border border-[#AAFFA9] text-[#AAFFA9] px-2 py-1 mt-4 mr-2 rounded-md text-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
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
                  <p className="text-gray-400">{post.comments} comments</p>
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
                    {moment(post.timestamp).format("Do MMM YYYY")}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Postr;
