import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SiGoogletagmanager } from "react-icons/si";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import {backend_link} from "../constants/constant";

// Define the BlogPost interface

interface BlogPost {
  _id: string;
  id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string; // Added createdAt property
}

interface PopupblogProps {
  popupst: string; // Add this line to include popupst
  setPopupst: React.Dispatch<React.SetStateAction<string>>;
  blogPosts: BlogPost[]; // Change the type of blogPosts to BlogPost[]
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  cpost: string; // Assuming cpost is the ID of the post to fetch
  // Add tags to PopupblogProps if needed
}
type Tag = {
  _id: string;
  tagname: string;
  __v: number;
};


const Popupblog: React.FC<PopupblogProps> = ({
  popupst,
  setPopupst,
  cpost,
  blogPosts,
  setBlogPosts,
}) => {
  const [post, setPost] = useState<BlogPost | null>(null); // Specify the type for post
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [filename, setFilename] = React.useState("No file chosen yet...");
  const [tags, setTags] = useState("");
  const [tagarray, setTagarray] = useState<string[]>([]);
  const [tagvalue, setTagvalue] = useState<Tag[]>([]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backend_link}/api/posts/${cpost}`
        );
        setPost(response.data);
        setTagarray(response.data.tags); // Assuming the API returns the post data directly
        setImageUrl(
          `https://res.cloudinary.com/do0qmdmch/image/upload/${response.data.image}`
        );
        console.log(image);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (cpost) {
      fetchData();
    }

    const fetchTags = async () => {
      try {
        const res = await axios.get(`${backend_link}/api/tags`);
        setTagvalue(res.data); // Set the state with the data
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [cpost, image]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;

    try {
      const imageBuffer = imageFile ? await imageFile.arrayBuffer() : null;
      const response = await axios.put(
        `https://kernel-hub.onrender.com/api/posts/${cpost}`,
        {
          title,
          slug,
          content,
          image: imageBuffer,
          tags: tagarray,
        }
      );
      setBlogPosts(
        blogPosts.map((post) => (post._id === cpost ? response.data : post))
      ); // Update the post in the blogPosts state

      console.log("Post updated successfully:", response.data);
      setPopupst("hidden"); // Close the popup after successful update
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  const handeltags = (newItem: string) => {
    console.log("new one");
    setTagarray((prevItems) => [...prevItems, newItem]);
    console.log(tagarray);
  };

  return (
    <div
      className={`bg-gray-700 text-white w-full h-full relative ${popupst} overflow-hidden transition-all duration-500 ease-in-out transform ${
        popupst === "block" ? "translate-y-0" : "translate-y-[-100%]"
      }`}
    >
      <div className="p-10 w-full overflow-y-scroll h-[99%]">
        <div className="flex flex-row justify-between">
          <p className="text-xl flex flex-row gap-2 items-center ">
            {" "}
            <span
              onClick={() => {
                setPopupst("hidden");
              }}
              className="flex flex-row gap-2 items-center hover:text-[#AAFFA9] cursor-pointer"
            >
              <SiGoogletagmanager /> Manage Blog
            </span>
            <span>/</span>
            <span>Update</span> <span>/</span>
            <span>{cpost}</span>
          </p>
          <p
            className="text-xl top-10 cursor-pointer bg-red-400 px-4 py-1 rounded-md flex items-center gap-2"
            onClick={() => {
              setPopupst("hidden");
            }}
          >
            Cancel <MdCancel />
          </p>
        </div>

        <div className="flex flex-col items-center w-full mt-12">
          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-4 w-full items-center"
          >
            <div className="w-full flex flex-col items-center">
              <input
                type="text"
                name="title"
                placeholder="Enter Post Title"
                id="title"
                defaultValue={post?.title || ""} // Assuming post.title is the title of the post
                className="mt-1 border-2 border-gray-500 font-bold px-10 w-[90%] h-16 bg-gray-800 block rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
              />
            </div>
            <div className="w-full flex flex-col items-center">
              <textarea
                name="slug"
                placeholder="Enter Slug For Post"
                id="slug"
                defaultValue={post?.slug || ""} // Assuming post.slug is the slug of the post
                className="mt-1 w-[90%] resize-none h-28 py-4 border-2 border-gray-500 px-10 font-bold bg-gray-800 block rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
              />
            </div>
            <div className="w-[90%] flex-row items-end gap-4 flex">
              <div className="w-full flex flex-row  items-end">
                {imageUrl || image ? (
                  <div className="relative">
                    <div className="h-36 w-[18rem] flex justify-center items-center mr-4 rounded-md relative overflow-hidden bg-gray-800 object-cover">
                      <Image
                        src={
                          imageUrl || (image ? URL.createObjectURL(image) : "")
                        }
                        alt="Post Image"
                        width={800}
                        height={800}
                        className="object-cover relative w-[95%] h-[90%]"
                      />
                    </div>
                    {image && image.size > 800 * 1024 ? (
                      <p className="text-sm text-red-500 mt-2 bg-gray-800 absolute bottom-2 right-8 font-bold">
                        File must be under 800 KB
                      </p>
                    ) : (
                      image && (
                        <p className="text-sm text-[#AAFFA9] mt-2 bg-gray-800 absolute bottom-2 right-8 font-bold">
                          {(image.size / 1024).toFixed(2)} KB
                        </p>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No image selected</p>
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="image"
                  className="w-[90%] py-2.5 px-10 bg-gray-800 rounded-md text-sm font-medium text-gray-900 dark:text-white border-2 border-gray-500 cursor-pointer"
                  hidden
                />
                <div className="w-full h-12 border-dashed bg-gray-800 rounded-md text-sm font-medium text-gray-900 dark:text-white border-2 border-gray-400 cursor-pointer flex flex-row justify-between overflow-hidden">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("image")?.click();
                    }}
                    className="font-bold text-gray-700 bg-[#AAFFA9] px-10"
                  >
                    Choose...
                  </button>
                  <p className="my-auto mx-auto text-gray-400 font-bold pl-4">
                    {filename}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col items-end">
                {/* ----------------------------------------------------------- */}
                <div className="flex flex-row justify-center items-center gap-4 w-full">
                  {tagarray && tagarray.length > 0 ? (
                    tagarray.map((itemof, index) => (
                      <p
                        key={index}
                        className="border-2 text-gray-200 capitalize border-gray-500 py-2 px-4 rounded-md mb-2"
                      >
                        {itemof}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500 border border-dashed px-4 py-2 mb-2 rounded-md">
                      No tag chosen yet
                    </p>
                  )}
                </div>
                <select
                  id="tags"
                  name="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="mt-1 border-2 border-dashed border-gray-400 px-10 w-full block h-12 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
                >
                  <option value="">Select a tag</option>
                  {tagvalue.map((tag) => (
                    <option
                      key={tag._id}
                      value={tag.tagname}
                      onClick={() => handeltags(tag.tagname)}
                    >
                      {tag.tagname}
                    </option>
                  ))}
                  {/* Add more options as needed */}
                </select>
              </div>
              {/* ----------------------------------------------------- */}
            </div>

            <div className="w-full flex flex-col items-center">
              <textarea
                id="content"
                name="content"
                rows={3}
                defaultValue={post?.content || ""} // Assuming post.content is the content of the post
                className="mt-1 border-2 border-gray-500 px-10 py-4 font-bold w-[90%] h-[60rem] block resize-none bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
                placeholder="Write your blog content here im markdown ...."
              ></textarea>
            </div>
            <div className="w-[90%] flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex justify-center mt-4 rounded-md border border-transparent bg-[#AAFFA9] py-4 text-sm w-[25%] text-gray-700 font-bold shadow-sm hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:border-[#AAFFA9] focus:ring-offset-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popupblog;
