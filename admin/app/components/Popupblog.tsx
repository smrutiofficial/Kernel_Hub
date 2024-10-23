import React from "react";
import Image from "next/image";
import { SiGoogletagmanager } from "react-icons/si";
import { MdCancel } from "react-icons/md";

interface PopupblogProps {
  popupst: string; // Add this line to include popupst
  setPopupst: React.Dispatch<React.SetStateAction<string>>; // Add this line to include setPopupst
}

const Popupblog: React.FC<PopupblogProps> = ({ popupst, setPopupst }) => {
  //   const [updateblog, setUpdateblog] = useState("block");
  const [image, setImage] = React.useState<string | null>(null);
  const [filename, setFilename] = React.useState("No file chosen yet...");

  return (
    <div
      className={`bg-gray-700 w-full h-full relative ${popupst} overflow-hidden transition-all duration-500 ease-in-out transform ${
        popupst === "block" ? "translate-y-0" : "translate-y-[-100%]"
      }`}
    >
      <div className="p-10 w-full">
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
            <span>Update</span>
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

        {image && (
          <div className="h-36 w-48 rounded-md overflow-hidden bg-gray-800 absolute mt-52">
            <Image src={image} alt="" layout="fill" objectFit="cover" />
          </div>
        )}
        <div className="flex flex-col items-center w-full mt-12">
          <form className="flex flex-col gap-4 w-full items-center">
            <div className="w-full flex flex-col items-center">
              <input
                type="text"
                name="title"
                placeholder="Enter Post Title"
                id="title"
                className="mt-1 border-2 border-gray-500 font-bold px-10 w-2/3 h-16 bg-gray-800 block rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
              />
            </div>
            <div className="w-full flex flex-col items-center">
              <textarea
                name="slug"
                placeholder="Enter Slug For Post"
                id="slug"
                className="mt-1 w-2/3 resize-none h-28 py-4 border-2 border-gray-500 px-10 font-bold bg-gray-800 block rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
              />
            </div>
            <div className="w-2/3 flex-row items-center gap-4 flex">
              <div className="w-full flex flex-row  items-center">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={({ target: { files } }) => {
                    if (files && files[0]) {
                      setFilename(files[0].name);
                      setImage(URL.createObjectURL(files[0]));
                    }
                  }}
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
                className="mt-1 border-2 border-gray-500 px-10 py-4 font-bold w-2/3 h-[12rem] block resize-none bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-[#AAFFA9] focus:border-[#AAFFA9] sm:text-sm"
                placeholder="Write your blog content here im markdown ...."
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center mt-4 rounded-md border border-transparent bg-[#AAFFA9] py-4 text-sm w-2/3 text-gray-700 font-bold shadow-sm hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:border-[#AAFFA9] focus:ring-offset-2"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popupblog;
