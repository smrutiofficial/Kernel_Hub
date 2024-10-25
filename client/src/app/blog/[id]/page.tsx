/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";
import axios from "axios";
import Image from "next/image";

export default function PostPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null); // To store user info, including profile picture
  const [comment, setComment] = useState(""); // For new comment input
  const [comments, setComments] = useState<any[]>([]); // To store all comments
  const [paramid, setparamid] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  // Fetch post data
  useEffect(() => {
    setparamid(params.id);
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${params.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await res.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  // Fetch user data (profile pic, etc.)
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/auth/me",
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );

          setProfile({
            name: response.data.name,
            email: response.data.email,
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

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/comments/${paramid}`
        );
        if (res.ok) {
          const data = await res.json();
          setComments(data);
          console.log(data);
        }
      } catch (err) {
        console.error("Failed to fetch comments");
      }
    };

    fetchComments();
  }, [paramid]);

  const handlePostComment = async () => {
    const token = localStorage.getItem("token");
    if (!comment || !token) return;
  
    try {
      await axios.post(
        `http://localhost:5000/api/comments/`,
        {
          body: comment,
          postId: params.id,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
  
      // Refetch comments
      const res = await fetch(`http://localhost:5000/api/comments/${paramid}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
  
      setComment(""); // Clear the textarea
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {post ? (
          <>
            <p>Date: {new Date(post.timestamp).toLocaleDateString()}</p>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="bg-gray-500 w-2/3 mt-6 rounded-md h-[32rem] overflow-hidden">
              {/* <Image src="" alt="" layout="fill" objectFit="cover" /> */}
            </div>

            <div className="mt-4 flex gap-2">
              {post.tags.map((tag: string) => (
                <button
                  key={tag}
                  className="border-2 border-[#AAFFA9] rounded-md mb-4 py-2 px-4"
                >
                  {tag}
                </button>
              ))}
            </div>
            <p className="mt-4 w-2/3">{post.content}</p>

            {/* User Profile Picture and Comment Input */}
            <div className="mt-6 flex items-center ">
              <div className="flex flex-col w-2/3">
                <div className="mb-6 flex flexrow gap-6 items-center">
                  {/* user profile */}
                  <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                  <div className="">
                    <p className="capitalize font-bold tracking-wider text-lg text-gray-400">
                      {profile.name}
                    </p>
                    <p className="text-gray-500">{profile.email}</p>
                  </div>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full resize-none h-40 border px-6 py-6 rounded-md bg-gray-700 focus:border-[#AAFFA9]"
                />
                <button
                  onClick={handlePostComment}
                  className="mt-4 px-12 py-4 w-max 
                  bg-gradient-to-r from-[#AAFFA9] to-emerald-400 text-gray-600 font-bold rounded-md"
                >
                  Post Comment
                </button>
              </div>
            </div>

            {/* Display Comments */}
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Comments</h2>
              {comments.length > 0 ? (
                comments.map((cmt) => (
                  <div key={cmt._id} className="py-2">
                    <p className="font-semibold">
                      {cmt.author?.name || "Unknown"}
                    </p>
                    <p>{cmt.body}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </>
        ) : (
          <p>Post not found</p>
        )}
      </div>
      <Footer />
    </>
  );
}
