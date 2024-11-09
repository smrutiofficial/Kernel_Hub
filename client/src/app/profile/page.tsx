/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Preloader from "@/app/components/preloader";
import { backend_link } from "@/app/constants/constant";
// import Image from "next/image";

const Page = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
            image: response.data.image,
            password: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    if (profile.password) formData.append("password", profile.password);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await axios.put(
        `${backend_link}/api/auth/me`,
        formData,
        { headers: { "x-auth-token": token, "Content-Type": "multipart/form-data" } }
      );
      setSuccess("Profile updated successfully!");
      setProfile((prevProfile) => ({
        ...prevProfile,
        image: response.data.user.image,
      }));
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    }
  };

  if (loading) return <Preloader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-8">
        <p className="text-2xl font-bold mb-6">Profile Information</p>
        <div className="h-40 w-40 bg-gray-500 rounded-full mb-10 overflow-hidden">
          {profile.image ? (
            <img src={profile.image} alt="Profile Image" className="w-full h-full object-cover" />
          ) : (
            <p>No Image</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-1/3 gap-4">
          <input type="file" name="image" className="text-white text-center" onChange={handleImageChange} />
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="input py-3 px-4 rounded-lg bg-gray-800 text-gray-200"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="input py-3 px-4 rounded-lg bg-gray-800 text-gray-200"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleInputChange}
            className="input py-3 px-4 rounded-lg bg-gray-800 text-gray-200"
            placeholder="Password"
          />
          <button type="submit" className="py-3 px-4 rounded-lg bg-gradient-to-r from-[#AAFFA9] to-emerald-500 text-gray-900 font-bold">
            UPDATE
          </button>
        </form>
        {success && <p className="text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default Page;
