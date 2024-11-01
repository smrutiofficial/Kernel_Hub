"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";
import axios from "axios";
import moment from "moment";
import { backend_link, upload_link } from "@/app/constants/constant";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import Image from "next/image";
import bg from "@/app/image/grain.jpg";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import Preloader from '@/app/components/preloader';
import ReactionBar from "@/app/components/ReactionBar";

export default function PostPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [user, setUser] = useState<any>(null);
  const [comment, setComment] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([]);
  const [paramid, setParamId] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    _id:""
  });
  

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, [setLoading]);
  const [status, setStatus] = useState("Post Comment"); // New status state
  const [progress, setProgress] = useState(0); // New progress state
  const [processedContent, setProcessedContent] = useState("");

  useEffect(() => {
    setParamId(params.id);
    const fetchPost = async () => {
      try {
        const res = await fetch(`${backend_link}/api/posts/${params.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await res.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
        setLoading(false);
      }
    };
    fetchPost();
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${backend_link}/api/comments/${params.id}`);
        setComments(res.data);
      } catch (err) {
        console.log("Failed to fetch comments:", err);
      }
    };
    
    fetchComments();
  }, [params.id]);
  // featch profile data of a current user
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(`${backend_link}/api/auth/me`, {
            headers: { "x-auth-token": token },
          });
          setProfile({
            name: response.data.name,
            email: response.data.email,
            _id:response.data._id
          });
        } catch (err) {
          console.error(err);
          setError("Failed to fetch profile data.");
        }
      } else {
        setError("No token found.");
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);
  // featch comment data of the blog


  // applying styleing to the body
  useEffect(() => {
    const processContent = async () => {
      if (post?.content) {
        const file = await unified()
          .use(remarkParse)
          .use(remarkRehype)
          .use(rehypeDocument, { title: "👋🌍" })
          .use(rehypeFormat)
          .use(rehypeStringify)
          .use(rehypePrettyCode, {
            theme: "tokyo-night",
            transformers: [
              transformerCopyButton({
                visibility: "always",
                feedbackDuration: 3_000,
              }),
            ],
          })
          .process(post.content);

        setProcessedContent(String(file));
      }
    };
    processContent();
  }, [post?.content]);

  const handlePostComment = async () => {
    const token = localStorage.getItem("token");
    if (!comment || !token) return;

    setStatus("Loading..."); // Set status to "Loading..."
    setProgress(0); // Reset progress to 0

    try {
      await axios.post(
        `${backend_link}/api/comments/`,
        {
          body: comment,
          postId: params.id,
        },
        {
          headers: { "x-auth-token": token },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || progressEvent.loaded;
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / total
            );
            setProgress(percentCompleted);
          },
        }
      );

      const res = await fetch(`${backend_link}/api/comments/${paramid}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }

      setStatus("Post Comment"); // Reset status after success
      setComment(""); // Clear the textarea
    } catch (err) {
      console.error("Failed to post comment", err);
      setStatus("Failed to post comment"); // Show error status
    }
  };

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
     {loading ? <Preloader /> : 
     
     
 <div className="">
  <Navbar />
      <div className="w-full h-full relative">
        <Image
          src={bg}
          alt=""
          layout="cover"
          className="opacity-[3%] mix-blend-screen -z-10 absolute object-cover w-full h-full"
        ></Image>
        <div className="container w-[60%] mx-auto px-6 py-12">
          {post ? (
            <>
              <p className="text-gray-400 mb-2 capitalize">{post.slug}</p>
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#AAFFA9] to-emerald-500 w-max">
                <span className="text-gray-400 mr-4">
                  By Smruti Prakash Rout
                </span>{" "}
                {moment(post.timestamp).format("Do MMM YYYY")}
              </p>

              <div
                className=" 
              flex flex-col h-[38rem] mt-6 items-center justify-center flex-wrap mb-6 relative
        after:content-[''] after:absolute after:h-full 
        after:w-full after:bg-gradient-to-r 

        after:via-transparent 
        after:from-gray-900 
        after:to-gray-900

        after:t-1/2 after:l-1/2 
        after:translate-1/2 after:-z-10 p-[0.5rem] after:rounded-md 
        before:content-[''] before:absolute before:h-full 
        before:w-full before:bg-gradient-to-r  

        before:via-transparent 
      before:from-[#A5FECB] 
      before:to-[#A5FECB]
  

        before:t-1/2 before:l-1/2 
        before:translate-1/2 before:-z-10 before:rounded-md before:blur-[15rem]
            "
              >
                <img
                  src={`${upload_link}/${post.image}`}
                  alt=""
                  className="w-[97%] h-[96%] object-cover"
                />
              </div>

              <div className="mt-12 flex gap-4">
                {post.tags.map((tag: string) => (
                  <button
                    key={tag}
                    className="border-2 border-[#AAFFA9] text-transparent bg-clip-text bg-gradient-to-r from-[#AAFFA9] to-emerald-500 w-max rounded-md mb-4 py-2 px-4"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="w-full relative">
                <div
                  className="prose prose-lg prose-slate text-white w-full min-w-full p-4"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </div>
              <ReactionBar postId={post._id} userId={profile._id} reaction={post.reactions}/>
              <hr className="mt-8 opacity-30" />

              <div className="mt-6 flex items-center">
                <div className="flex flex-col w-full">
                  <div className="mb-6 flex flex-row gap-6 items-center">
                    <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                    <div>
                      <p className="capitalize font-bold tracking-wider text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#AAFFA9] to-emerald-500 w-max">
                        {profile.name}
                      </p>
                      <p className="text-gray-500">{profile.email}</p>
                    </div>
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full resize-none h-40 border-2 border-[#aaffa982] px-6 py-6 rounded-md bg-gray-700 focus:border-[#AAFFA9]"
                  />
                  <button
                    onClick={handlePostComment}
                    className="mt-8 mb-4 px-12 py-4 w-max bg-gradient-to-r from-[#AAFFA9] to-emerald-400 text-gray-600 font-bold rounded-md"
                  >
                    {status} {status === "Loading..." && `${progress}%`}
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-xl -mb-2 font-bold flex items-center">
                  {comments.length} Comments{" "}
                  <span className="ml-8 text-gray-300 flex items-center gap-2 font-medium text-sm px-4 py-1 rounded-md bg-green-500 bg-opacity-15">
                    0 <span>Online</span>{" "}
                    <div className="w-2 h-2 ml-2 animate-ping bg-green-500 rounded-full">
                      {" "}
                    </div>
                  </span>
                </h2>
                <p className="text-gray-400 my-4">
                  We welcome and encourage thoughtful, respectful, and
                  community-centered discussions.
                </p>
                {comments.length > 0 ? (
                  comments.map((cmt) => (
                    <div
                      key={cmt._id}
                      className="py-2 bg-gray-700 mb-4 rounded-md bg-opacity-35 px-8 w-full"
                    >
                      <div className="flex flex-row gap-4">
                        <p className="font-semibold text-[#AAFFA9] capitalize">
                          {cmt.author?.name || "Unknown"}
                        </p>
                        <p className="text-gray-500">
                          {moment(cmt.createdAt).fromNow()}
                        </p>
                      </div>
                      <p className="ml-6 mt-2 capitalize">{cmt.body}</p>
                    </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
            </>
          ) : (
            <p>Post not found</p>
          )}
        </div>
      </div>
      <Footer />
 </div>
     
     
     }
      
    </>
  );
}
