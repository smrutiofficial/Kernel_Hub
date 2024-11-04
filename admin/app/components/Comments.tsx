import { SiCrowdsource } from "react-icons/si";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Pagination from "./Pagination";
import moment from "moment";
import { backend_link } from "@/app/constants/constant";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BlogComments {
  author: {
    email: string;
    name: string;
  };
  _id: string;
  body: string;
  createdAt: string;
}

interface BlogResponse {
  comments: BlogComments[];
  currentPage: number;
  totalPages: number;
}

const Comments = () => {
  const [blogComments, setBlogComments] = useState<BlogComments[]>([]);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [cpage, setCpage] = useState(1);
  const [totalpage, SetTotalpage] = useState(0);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get<BlogResponse>(
          `${backend_link}/api/comments?page=${cpage}`
        );
        setBlogComments(response.data.comments);
        setCpage(response.data.currentPage);
        SetTotalpage(response.data.totalPages);
        
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, [cpage]);

  const handleDelete = async (commentId: string) => {
    try {
      await axios.delete(`${backend_link}/api/comments/${commentId}`);
      setBlogComments(blogComments.filter((cmt) => cmt._id !== commentId));
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <div className="p-10 h-svh overflow-y-scroll relative text-white">
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl flex items-center gap-2">
          <SiCrowdsource />
          Comments <span>/</span>
        </p>
      </div>

      <div className="h-[86%]">
        <div className="flex flex-row justify-between mt-4 font-bold capitalize text-md bg-gray-800 rounded-md border border-gray-600 py-1">
          <div className="flex flex-row gap-4 w-[90%] py-1 justify-center items-center ">
            <div className="w-[5%]">
              <p className="text-center">id</p>
            </div>
            <div className="w-[35%]">
              <p className="">Comments</p>
            </div>
            <div className="w-[35%] flex flex-row justify-around">
              <p className="w-[50%] text-center">User ID</p>
              <p className="w-[50%] text-center">User Name</p>
            </div>
            <div className="w-[15%]">
              <p className="text-center">Created At</p>
            </div>
          </div>
          <div className="w-[10%] flex flex-row justify-center items-center gap-4 capitalize text-md bg-gray-800">
            Actions
          </div>
        </div>

        {blogComments.map((cmt) => (
          <div
            key={cmt._id}
            onMouseEnter={() => setHoveredPostId(cmt._id)}
            onMouseLeave={() => setHoveredPostId(null)}
            className="flex mt-2 flex-row justify-between hover:border hover:bg-lime-100 hover:bg-opacity-10 hover:border-gray-500 border border-gray-600 rounded-md relative transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex flex-row gap-4 w-[90%] rounded-md py-1 justify-center items-center ">
              <div className="w-[5%]">
                <p className="text-center">
                  {((cpage - 1) * 12 + blogComments.indexOf(cmt) + 1)
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>
              <div className="w-[35%] max-w-[35%]">
                <p className="">{cmt.body}</p>
              </div>
              <div className="w-[35%] flex flex-row justify-around">
                <p className="w-[50%] text-center">{cmt.author?.email}</p>
                <p className="w-[50%] text-center">{cmt.author?.name}</p>
              </div>
              <div
                className={`border w-[15%] py-1 px-2 rounded-md border-gray-500 ${
                  hoveredPostId === cmt._id
                    ? "bg-yellow-400 bg-opacity-50 text-gray-100"
                    : ""
                }`}
              >
                <p className="text-center">
                  {moment(cmt.createdAt).format("Do MMM YYYY")}
                </p>
              </div>
            </div>
            <div className="w-[10%] flex flex-row justify-center items-center gap-4 text-xl">
              <AlertDialog>
                <AlertDialogTrigger>
                  <MdDelete
                    className={`h-[70%] w-8 p-1 rounded-md ${
                      hoveredPostId === cmt._id
                        ? "bg-red-400 text-gray-700"
                        : "hover:bg-red-400 hover:text-gray-700"
                    }`}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      Deleting this comment is a permanent action and cannot be
                      undone. This will remove the comment from the post and
                      cannot be recovered.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-red-400 text-white border hover:bg-red-500 hover:bg-opacity-45 hover:text-white border-transparent">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-gray-800 text-white hover:bg-gray-500 hover:bg-opacity-45 hover:text-white border border-transparent"
                      onClick={() => handleDelete(cmt._id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
  );
};

export default Comments;
