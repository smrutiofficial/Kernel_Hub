import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Popupblog from "./Popupblog";
import { SiGoogletagmanager } from "react-icons/si";
import Pagination from "./Pagination";
import moment from "moment";

interface BlogPost {
  _id:string;
  id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string; // Added createdAt property
}

interface BlogResponse {
  posts: BlogPost[];
  currentPage: number; // Added currentPage property
  totalPages: number; // Added totalPages property
}

const ManageBlog = () => {
  const [sortOption, setSortOption] = useState<string>("newest");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null); 
  const [popupst,setPopupst]=useState("hidden");// Added state for hoveredPostId
  const [cpage,setCpage]=useState(1)
  const [totalpage,SetTotalpage]=useState(0);
  const [cpost,setCpost]=useState("");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get<BlogResponse>(
          `https://kernel-hub.onrender.com/api/posts?sort=${sortOption}&page=${cpage}`
        );
        setBlogPosts(response.data.posts); // Now correctly accessing posts
        setCpage(response.data.currentPage);
        SetTotalpage(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, [sortOption,cpage]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`https://kernel-hub.onrender.com/api/posts/${postId}`);
      setBlogPosts(blogPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <>
      <Popupblog popupst={popupst} setPopupst={setPopupst} cpost={cpost} blogPosts={blogPosts} setBlogPosts={setBlogPosts}/>
      <div className="p-10 h-svh overflow-y-scroll relative">
        <div className="flex flex-row justify-between items-center">
        <p className="text-xl flex flex-row gap-2 items-center "> <span className="flex flex-row gap-2 items-center hover:text-[#AAFFA9] cursor-pointer"><SiGoogletagmanager/> Manage Blog</span>  <span>/</span>
        </p>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="bg-gray-800 w-36 border-2 rounded-md py-2 px-4 border-[#AAFFA9]"
          >
            <option value="newest">Newest</option>
            <option value="popular">Popular (by no of comments)</option>
            <option value="a-z">A-Z</option>
          </select>
        </div>

        <div className="h-[86%]">
          <div className="flex flex-row justify-between mt-4 font-bold capitalize text-md bg-gray-800 rounded-md border border-gray-600 py-1">
            <div className="flex flex-row gap-10 w-[90%] py-1 justify-center items-center px-4">
              <p className="max-w-10 w-10">id</p>
              <div className="w-[70%] max-w-[70%]">
                <p className="">Title</p>
              </div>
              <div className="py-1 px-2">
                <p>Created At</p>
              </div>
              {/* <p>Updated At: {new Date(post.updatedAt).toLocaleDateString()}</p> */}
            </div>

            <div className="w-[10%] flex flex-row justify-center items-center gap-4 capitalize text-md bg-gray-800">
              Actions
            </div>
          </div>

          {blogPosts.map((post) => (
            <div
              key={post._id}
              onMouseEnter={() => setHoveredPostId(post._id)}
              onMouseLeave={() => setHoveredPostId(null)}
              className="flex mt-2 flex-row justify-between hover:border hover:bg-lime-100 hover:bg-opacity-10 hover:border-gray-500 border border-gray-600 rounded-md relative transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="flex flex-row gap-10 w-[90%] rounded-md py-1 justify-center items-center px-4">
                <p className="max-w-10 w-10">
                {((cpage - 1) * 12 + blogPosts.indexOf(post) + 1).toString().padStart(2, "0")}
                </p>
                <div className="w-[70%] max-w-[70%]">
                  <p className="">{post.title}</p>
                </div>
                <div
                  className={`border py-1 px-2 rounded-md border-gray-500
              ${
                hoveredPostId === post._id ? "bg-yellow-400 bg-opacity-50 text-gray-100" : ""
              } `}
                >
                  <p>{moment(post.createdAt).format("Do MMM YYYY")}</p>
                </div>
                {/* <p>Updated At: {new Date(post.updatedAt).toLocaleDateString()}</p> */}
              </div>

              <div className="w-[10%] flex flex-row justify-center items-center gap-4 text-xl">
                <RiEdit2Fill
                  onClick={() => {
                    setPopupst("block")
                    setCpost(post._id);
                  }}

                  className={`h-[70%] w-8 rounded-md p-1 ${
                    hoveredPostId === post._id
                      ? "bg-[#AAFFA9] text-gray-700"
                      : "hover:bg-[#AAFFA9]"
                  } ${
                    hoveredPostId === post._id
                      ? "text-gray-700"
                      : "hover:text-gray-700"
                  }`}
                />
                <MdDelete
                  onClick={() => handleDelete(post._id)}
                  className={`h-[70%] w-8 p-1 rounded-md ${
                    hoveredPostId === post._id
                      ? "bg-red-400 text-gray-700"
                      : "hover:bg-red-400 hover:text-gray-700"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
        <Pagination 
          currentPage={cpage} 
          totalPages={totalpage} 
          setcpage={setCpage} 
        />
      </div>
    </>
  );
};

export default ManageBlog;
