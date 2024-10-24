import React, { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import Image from "next/image";

// Define the type for Post data
interface PostData {
  id: number;
  title: string;
  content: string;
  image: string;
  tags: string[];
  comments: number;
  timestamp: string; // or Date if needed
}

interface PostProps {
  pid: number;
}

const Postr = ({ pid }: PostProps) => {
  const [postData, setPostData] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/posts?sort=newest`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPostData(data.posts[pid]);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [pid]);

  function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1)
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;

    return `${Math.floor(seconds)} seconds ago`;
  }
  return (
    <>
      {postData && (
        <div key={postData.id} className="flex flex-row w-full ">
          <div className="w-1/2 py-4 pl-4 overflow-hidden">
            {/* Content for the first div */}
            <div className=" bg-gray-700 h-[17.5rem] overflow-hidden object-cover rounded-tl-lg rounded-bl-lg">
              <Image
                src=""
                alt={`Cover for ${postData.title}`}
                width={100}
                height={100}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="w-1/2 py-4 pr-4 overflow-hidden">
            <div className="bg-gray-800 p-4 h-full rounded-tr-lg rounded-br-lg">
              {/* Content for the first column */}
              <div className="flex flex-row gap-4 justify-between items-start">
                <h1 className="text-lg mb-2 font-bold h-16 py-2 overflow-hidden">
                  {postData.title}
                </h1>
                <p className="text-3xl">
                  <FaArrowTrendUp />
                </p>
              </div>
              <p className="h-20 py-1 overflow-hidden">{postData.content}</p>
              <div className="h-14 overflow-hidden">
              {postData.tags.map((tag: string) => (
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
                  <p className="text-gray-400">{postData.comments} comments</p>
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
                    {timeAgo(new Date(postData.timestamp))}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Postr;
