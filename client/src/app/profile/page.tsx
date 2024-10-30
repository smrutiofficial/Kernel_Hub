"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Preloader from "@/app/components/preloader";
import {backend_link} from "@/app/constants/constant"

const Page = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // State to handle success message
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, [setLoading]);
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            `${backend_link}/api/auth/me`,
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );

          setProfile({
            name: response.data.name,
            email: response.data.email,
            password: "", // Do not set the password from the response
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
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get token from local storage
    try {
      await axios.put(`h${backend_link}/api/auth/me`, profile, {
        headers: {
          "x-auth-token": token, // Include the token in the header
        },
      });
      setSuccess("Profile updated successfully!"); // Set success message
    } catch (err) {
      console.error(err);
      setError("Failed to update profile."); // Handle error
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="">
          <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-8">
              <p className="text-2xl font-bold mb-6">Profile Information</p>
              <div className="h-40 w-40 bg-gray-500 rounded-full mb-10"></div>
              <form
                className="flex flex-col w-1/3 gap-4"
                onSubmit={handleSubmit}
              >
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
                <button
                  type="submit"
                  className="py-3 px-4 rounded-lg bg-gradient-to-r from-[#AAFFA9] to-emerald-500 text-gray-900 font-bold"
                >
                  UPDATE
                </button>
              </form>
              {success && <p className="text-green-500">{success}</p>}{" "}
              {/* Display success message */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
