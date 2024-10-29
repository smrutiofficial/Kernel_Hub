"use client";

import { useState } from "react";
import axios from "axios";
// import { useRouter } from 'next/router';
import Bg from "../../image/berny-transformed.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Simple validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("https://kernel-hub.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      router.push("/auth/login");
      // router.push('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <div className="flex flex-row">
          <div className="w-1/2 h-[100vh] overflow-hiddenflex justify-center items-center">
            {/* image  */}
            <Image src={Bg} alt="bg-image" className="w-full h-full object-cover"></Image>
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <div className="flex flex-col items-center">
              <h1 className="text-[3rem] font-bold pb-8">
                Kernel <span className="text-[#AAFFA9]"> Hub</span>
              </h1>
              <p className="text-[2.8rem] font-medium">Create an Account</p>
              <p className="text-[1.2rem]">Please register to get started</p>
            </div>
            <div className="flex items-center justify-center mt-8">
              <form
                className="flex flex-col w-1/2 gap-4"
                onSubmit={handleRegister}
              >
                <input
                  name="name"
                  type="Name"
                  placeholder="Name"
                  onChange={handleChange}
                  className="input py-3 px-4 rounded-lg bg-gray-800 text-gray-200"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="input py-3 px-4 rounded-lg bg-gray-800 text-gray-200"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="input py-3 px-4 rounded-lg bg-gray-800 text-gray-200"
                />
                <p className="flex items-center justify-center text-gray-400 font-medium">
                  Forgot Password?
                </p>
                <button
                  type="submit"
                  className="py-3 px-4 rounded-lg bg-[#AAFFA9] text-gray-800 font-medium"
                >
                  Register
                </button>
                <p className="flex items-center justify-center text-gray-400 text-sm font-medium mt-8">
                  Or Continue With
                </p>
                <button
                  type="submit"
                  className="py-3 px-4 rounded-lg bg-red-500 text-white font-medium"
                >
                  Sign with Google
                </button>
                <p className="flex items-center justify-center text-gray-300 font-medium mt-4">
                  Don&apos;t have an account ?&nbsp;
                  <span className="text-[#AAFFA9]">
                    <Link href="/auth/login">Login</Link>
                  </span>
                </p>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
