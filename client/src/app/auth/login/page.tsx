"use client";

import { useState } from "react";
import axios from "axios";
import Bg from "../../image/work.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {backend_link} from "@/app/constants/constant";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_link}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-row">
          <div className="w-1/2 h-[100vh] overflow-hidden bg-gradient-to-b from-[#AAFFA9] to-[#11FFBD] flex justify-center items-center">
            {/* image  */}
            <Image src={Bg} alt="bg-image" className="h-full w-full object-cover"></Image>
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <div className="flex flex-col items-center">
              <h1 className="text-[3rem] font-bold pb-8">
                Kernel <span className="text-[#AAFFA9]"> Hub</span>
              </h1>
              <p className="text-[2.8rem] font-medium">Welcome Back</p>
              <p className="text-[1.2rem]">Please login to your account</p>
            </div>
            <div className="flex items-center justify-center mt-8">
              <form
                className="flex flex-col w-1/2 gap-4"
                onSubmit={handleLogin}
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input py-3 px-4 rounded-lg bg-gray-800 text-gray-200"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input py-3 px-4 rounded-lg bg-gray-800 text-gray-200"
                />
                <p className="flex items-center justify-center text-gray-400 font-medium">
                  Forgot Password?
                </p>
                <button
                  type="submit"
                  className="py-3 px-4 rounded-lg bg-[#AAFFA9] text-gray-800 font-medium"
                >
                  Login
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
                    <Link href="/auth/register">Register</Link>
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
