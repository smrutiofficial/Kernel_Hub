import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTags } from "react-icons/fa6";
import { backend_link } from "@/app/constants/constant";

interface Tag {
  _id: string;
  tagname: string;
}

const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await axios.get(`${backend_link}/api/tags`);
      setTags(res.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;

    try {
      await axios.post(`${backend_link}/api/tags`, { tagname: newTag });
      setNewTag(""); // Clear input field
      fetchTags(); // Refresh tag list
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  return (
    <div className="text-white p-10 text-xl">
      <p className="flex gap-2 items-center">
        <FaTags />
        Manage Tags <span>/</span>
      </p>
      <div className="border border-gray-600 w-1/2 h-[3rem] mt-10 flex justify-between rounded-md">
        <input
          type="text"
          placeholder="Please type Tag name"
          className="w-[80%] px-8 bg-transparent outline-none"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button
          onClick={handleAddTag}
          className="w-[20%] text-gray-600 px-8 border border-[#AAFFA9] h-full bg-[#AAFFA9] text-md"
        >
          Add Tag
        </button>
      </div>
      <div>
        <div className="mt-6 flex flex-row gap-4 capitalize">
          {tags.map((res) => (
            <p key={res._id} className="border w-fit border-[#AAFFA9] text-[#AAFFA9] px-6 py-2 rounded-md">
              {res.tagname}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
