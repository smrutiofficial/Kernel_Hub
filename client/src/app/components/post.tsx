import { FaArrowTrendUp } from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useState} from 'react';

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
  currentPage: number;
  totalpage: (message: string) => void; // Add this line
}

const Post = ({currentPage,totalpage}: PostProps) => {
  const [postData, setPostData] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts?page=${currentPage}&limit=12`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPostData(data.posts);
        // console.log(data.totalPages);
        totalpage(data.totalPages);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [currentPage,totalpage]);

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
      {postData.map((postItem: PostData) => (
        <div
          key={postItem.id}
          className="flex flex-col items-center justify-center flex-wrap mb-6 relative
        after:content-[''] after:absolute after:h-full 
        after:w-full after:bg-gradient-to-r 

        after:odd:via-transparent 
        after:odd:from-gray-900 
        after:even:from-gray-900
        after:even:to-gray-900
        after:odd:to-gray-900 

        after:t-1/2 after:l-1/2 
        after:translate-1/2 after:-z-10 p-[0.5rem] after:rounded-md 
        before:content-[''] before:absolute before:h-full 
        before:w-full before:bg-gradient-to-r  

        before:even:via-transparent 
      before:odd:from-[#A5FECB] 
      before:even:from-[#A5FECB]
      before:even:to-[#A5FECB]
      before:odd:to-[#A5FECB]

        before:t-1/2 before:l-1/2 
        before:translate-1/2 before:-z-10 before:rounded-md before:blur-sm
        "
        >
          {" "}
          <div className="w-full h-[13rem]">
            <div className="overflow-hidden bg-gray-700 h-full rounded-tl-lg rounded-tr-lg">
              <Image
                src={postItem.image}
                alt={`Cover for ${postItem.title}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="bg-gray-800 p-4 rounded-bl-lg rounded-br-lg h-64">
              <div className="flex flex-row gap-4 justify-center items-center">
                <h1 className="text-lg mb-2 font-bold h-16 py-2 overflow-hidden">
                  {postItem.title}
                </h1>
                <p className="text-3xl">
                  <FaArrowTrendUp />
                </p>
              </div>
              <p className="text-sm text-gray-400 h-16 overflow-hidden">
                {postItem.content}
              </p>
              {postItem.tags.map((tag) => (
                <button
                  key={tag}
                  className="border border-[#AAFFA9] text-[#AAFFA9]
                             px-2 py-1 mt-4 mr-2 rounded-md text-sm"
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
                  <p className="text-gray-400">{postItem.comments} comments</p>
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
                    {timeAgo(new Date(postItem.timestamp))}
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

export default Post;
