"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";

export default function PostPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${params.id}`); // Using full localhost URL
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await res.json();
        setPost(data);
        setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {post ? (
          <>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            {/* <img src={`/images/${post.image}`} alt={post.title} className="my-4" /> */}
            <p className="mt-4">{post.content}</p>
            <div className="mt-8">
              <p>Tags: {post.tags.join(", ")}</p>
              <p>Comments: {post.comments}</p>
              <p>Date: {new Date(post.timestamp).toLocaleDateString()}</p>
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
