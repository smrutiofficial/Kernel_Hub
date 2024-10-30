"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import Post from "./components/post";
import Postrb from "./components/post_rb";
import {backend_link} from "@/app/constants/constant";
interface Post {
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

interface ApiResponse {
  posts: Post[];
  totalPages: number;
}
export default function Home() {
  // const [activeButton, setActiveButton] = useState("All");
  const [activebtn, setActiveBtn] = useState("All");
  const [activeButton, setActiveButton] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [total_post, SetTotal_post] = useState(1);
  const [postData, setPostData] = useState<Post[]>([]);
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  // const buttons = ["All", "Ubuntu", "Fedora", "Open Source", "Vim", "Tutorial"];
  const totalpage = (message: string) => {
    SetTotal_post(Number(message)); 
  };

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      router.push("/");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backend_link}/api/posts?page=${currentPage}&sort=${activeButton}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ApiResponse = await response.json();
        console.log(data.posts);

        setPostData(data.posts);
        SetTotal_post(data.totalPages);
        // Extract all tags and create a unique list
        const allTags = data.posts.flatMap((post: Post) => post.tags);
        const uniqueTagsList = ["All", ...new Set(allTags)];

        // Update the uniqueTags state
        setUniqueTags(uniqueTagsList);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [router, currentPage, activeButton]);

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/?page=${newPage}&sort=${activeButton}`);
  };

  const handleSortChange = async (sortOption: string) => {
    setActiveButton(sortOption);
    router.push(`/?page=1&sort=${sortOption}`);
  };
  const handlertClick = (buttonName: string) => {
    setActiveBtn(buttonName); // Set the clicked button as active
  };
  return (
    <>
      <div className="overflow-hidden relative">
        <div className="h-[40rem] w-[40rem] bg-[#AAFFA9] blur-[15rem] -z-10 absolute  bottom-[35%] left-[15%]"></div>

        <div className="h-[40rem] w-[40rem] bg-emerald-500 blur-[15rem] -z-10 absolute  bottom-[25%] left-[50%]"></div>

        <div className="w-svw h-8 bg-gradient-to-r from-[#AAFFA9] to-emerald-500 flex justify-center items-center relative">
          <p className="text-gray-600 font-medium">
            Ubuntu{" "}
            <span className="text-yellow-300 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.5)]">
              24.10{" "}
            </span>
            loaded with new features 👋🏻! let&apos;s view new updates .🥳
          </p>
        </div>
        <Navbar />
        <div className="h-80 w-80 bg-[#AAFFA9] blur-[15rem] absolute -z-10 top-[22rem] left-[30%]"></div>
        <div className="h-80 w-80 bg-emerald-500 blur-[15rem] absolute -z-10 top-[22rem] left-[48%]"></div>
        <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4">
            Become a Better Linux User
          </h2>
          <p className="text-xl text-gray-400 mb-6 w-full px-6 text-center">
            Kernel Hub is your go-to resource for Linux tips, open-source news,
            and community discussions. We&apos;re passionate about empowering
            users with knowledge and fostering a collaborative environment.!
          </p>
          <div className="flex items-center rounded-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-[400px] py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#11FFBD]"
            />
            <button
              className="text-gray-700 font-medium px-4 py-2 rounded-r-md 
          bg-gradient-to-r from-[#AAFFA9] to-emerald-400 transition duration-300"
            >
              Subscribe
            </button>
          </div>
          <div className="mt-8 font-mono text-sm">
            <span className="text-green-500">➜</span>{" "}
            <span className="text-blue-500">~</span>{" "}
            <span className="text-yellow-500">$</span> Stay powered with our
            updates!
          </div>
        </div>

        {/* Recent blog posts */}
        <div className="container mx-auto px-4 py-4">
          <h3 className="text-2xl font-bold mb-8">Recent Blog Posts</h3>
          <Postrb />
          <h3 className="text-2xl font-bold mb-2 mt-16">All Blog Posts</h3>

          <div className="w-full h-16 mb-6 flex flex-row items-center justify-between">
            <div className="flex flex-row gap-4">
              {uniqueTags.map((buttonName) => (
                <button
                  key={buttonName}
                  className={`border-2 px-4 py-1 rounded-md text-lg font-medium ${
                    activebtn === buttonName
                      ? "border-[#AAFFA9] bg-[#AAFFA9] text-gray-700"
                      : "bg-gray-800 text-gray-00 border-[#AAFFA9]"
                  }`}
                  onClick={() => handlertClick(buttonName)}
                >
                  {buttonName}
                </button>
              ))}
            </div>
            <div className="rounded-md w-[15rem] h-10 flex flex-row justify-center items-center gap-2">
              <p className="w-auto font-medium">Sort by : </p>
              <select
                className="form-select w-1/2 mt-1 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-100 border border-[#AAFFA9] py-1 px-2 rounded-md bg-gray-800"
                onChange={(e) => handleSortChange(e.target.value)}
                defaultValue="newest"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="a-z">A-Z</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Post postData={postData} totalpage={totalpage} />
          </div>
          <hr className="w-full mt-[2rem] mb-2 opacity-50" />
          <div className="flex justify-between items-center space-x-4 mt-8">
            <button
              className="px-4 py-2 border border-[#AAFFA9] bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300 flex items-center"
              onClick={async () => {
                if (currentPage > 1) {
                  await handlePageChange(currentPage - 1);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: total_post }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 ${
                      page === currentPage
                        ? "bg-[#AAFFA9] text-gray-800 font-bold rounded-md"
                        : "text-white rounded-md hover:bg-gray-600 transition duration-300"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              className="px-4 py-2 border border-[#AAFFA9] bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300 flex items-center"
              onClick={async () => {
                if (currentPage < total_post) {
                  await handlePageChange(currentPage + 1);
                }
              }}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full h-4 mt-2 bg-gradient-to-r from-[#AAFFA9] to-emerald-500"></div>
        <Footer />
      </div>
    </>
  );
}
