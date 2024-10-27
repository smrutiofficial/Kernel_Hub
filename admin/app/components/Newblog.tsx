import Image from "next/image";
import React,{useState} from "react";
import axios from "axios";
import { MdNewLabel } from "react-icons/md";

const Newblog = () => {
  const [image, setImage] = useState<string | null>(null); // Specify type as string | null
  const [filename, setFilename] = useState("No file chosen yet...");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {

      const formData = {
        image: image || "", 
        title: title,
        slug: slug,
        tags: tags ? tags.split(",").map(tag => tag.trim()) : [], // Array of tags
        content: content,
      };
      console.log(formData);
      
      await axios.post("http://localhost:5000/api/posts/newpost", formData);
      alert("Your post successfully published")
      // Handle success response
    } catch (error: unknown) { // Change type to unknown
      if (axios.isAxiosError(error)) { // Check if it's an Axios error
        console.error("Error posting data:", error.response?.data.posts || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      // Handle error response
    }
  };

  return (
    <div className="p-10 w-full h-[99%] overflow-scroll">
      <p className="text-xl flex items-center gap-2 "><MdNewLabel className="text-2xl"/>New Blog <span>/</span></p>
      {image && (
        <div className="h-36 w-48 rounded-md overflow-hidden bg-gray-800 absolute mt-52">
          <Image src={image} alt="" layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="flex flex-col items-center w-full mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center">
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
          <div className="w-[90%] flex-row items-center gap-4 flex">
            <div className="w-full flex flex-row  items-center">
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
              <select
                id="tags"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-1 border-2 border-dashed border-gray-400 px-10 w-full block h-12 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
              >
                <option value="">Select a tag</option>
                <option value="tag1">Tag 1</option>
                <option value="tag2">Tag 2</option>
                <option value="tag3">Tag 3</option>
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
            type="submit" // Changed from onClick to type="submit"
            className="inline-flex justify-center mt-4 rounded-md border border-transparent bg-[#AAFFA9] py-4 text-sm w-[25%] text-gray-700 font-bold shadow-sm hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:border-[#AAFFA9] focus:ring-offset-2"
          >
            Publish
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newblog;
