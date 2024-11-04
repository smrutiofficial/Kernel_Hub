import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdNewLabel } from "react-icons/md";
import { backend_link } from "@/app/constants/constant";
type Tag = {
  _id: string;
  tagname: string;
  __v: number;
};


const Newblog = () => {
  const [image, setImage] = useState<File | null>(null); // Specify type as string | null
  const [filename, setFilename] = useState("No file chosen yet...");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [tagarray, setTagarray] = useState<string[]>([]);
  const [tagvalue, setTagvalue] = useState<Tag[]>([]);
  const [status, setStatus] = useState("Publish");
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
      setImage(e.target.files[0]);
    }
  };
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`${backend_link}/api/tags`);
        setTagvalue(res.data); // Set the state with the data
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Loading...");
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("image", image as Blob);
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("tags", tagarray.join(","));
      formData.append("content", content);

      await axios.post(`${backend_link}/api/posts/newpost`, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          } else {
            // Handle case where total is undefined
            setProgress(0); // Optionally, keep progress as 0 if the total is undefined
          }
        },
      });

      setStatus("Post");
      alert("Your post was successfully published");
    } catch (error: unknown) {
      setStatus("Publish");
      setProgress(0);
      if (axios.isAxiosError(error)) {
        console.error(
          "Error posting data:",
          error.response?.data.posts || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handeltags = (newItem: string) => {
    setTagarray((prevItems) => [...prevItems, newItem]);
  };
  return (
    <div className="p-10 w-full h-[99%] overflow-scroll text-white">
      <p className="text-xl flex items-center gap-2 ">
        <MdNewLabel className="text-2xl" />
        New Blog <span>/</span>
      </p>

      <div className="flex flex-col items-center w-full mt-10">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-4 w-full items-center"
        >
          <div className="w-full flex flex-col items-center">
            <input
              type="text"
              name="title"
              placeholder="Enter Post Title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 border-2 border-gray-500 font-bold px-10 w-[90%] h-16 bg-gray-800 block rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <textarea
              name="slug"
              placeholder="Enter Slug For Post"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 w-[90%] resize-none h-28 py-4 border-2 border-gray-500 px-10 font-bold bg-gray-800 block rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
            />
          </div>
          <div className="w-[90%] flex-row items-end gap-4 flex">
            <div className="w-full flex flex-row  items-end">
              {image && (
                <div className=" relative">
                  <div className="h-36 w-[18rem] flex justify-center items-center mr-4 rounded-md relative overflow-hidden bg-gray-800 object-cover">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt=""
                      width={100}
                      height={100}
                      className="object-cover relative w-[95%] h-[90%]"
                    />
                  </div>
                  {image.size > 800 * 1024 ? (
                    <p className="text-sm text-red-500 mt-2 bg-gray-800 absolute bottom-2 right-8 font-bold">
                      File must be under 800 KB
                    </p>
                  ) : (
                    <p className="text-sm text-[#AAFFA9] mt-2 bg-gray-800 absolute bottom-2 right-8 font-bold">
                      {(image.size / 1024).toFixed(2)} KB
                    </p>
                  )}
                </div>
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
              <div className="flex flex-row justify-center items-center gap-4 w-full">
                {tagarray && tagarray.length > 0 ? (
                  tagarray.map((itemof, index) => (
                    <p
                      key={index}
                      className="border border-[#AAFFA9] py-2 px-4 rounded-md mb-2"
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
                  <option key={tag._id} value={tag.tagname} onClick={() => handeltags(tag.tagname)}>
                    {tag.tagname}
                  </option>
                ))}

                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <textarea
              id="content"
              name="content"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 border-2 border-gray-500 px-10 py-4 font-bold w-[90%] min-h-[30rem] h-[70rem] max-h-[50rem] block resize-none bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
              placeholder="Write your blog content here im markdown ...."
            ></textarea>
          </div>
          <div className="w-[90%] flex justify-end">
            <button
              type="submit"
              disabled={status === "Loading..."}
              className={`inline-flex justify-center text-gray-800 mt-4 rounded-md border bg-[#AAFFA9] border-transparent py-4 text-sm w-[25%] font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                status === "Loading..."
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed" // Styling for disabled state
                  : "bg-[#AAFFA9] text-gray-700 hover:bg-emerald-200"
              }`}
            >
              {status} {status === "Loading..." && `${progress}%`}
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newblog;
