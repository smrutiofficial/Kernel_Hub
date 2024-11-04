"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
// import { useRouter } from 'next/router';
import Bg from "../../image/berny-transformed.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { backend_link } from "@/app/constants/constant";

export default function Register() {
  const refs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [otp, setOtp] = useState("hidden");
  const [otpString, setOtpString] = useState("");
  // const [otpinput, setOtpinput] = useState(new Array(6).fill(""));
  const otpinput = Array(6).fill("");
  const [otpArr, setOtpArr] = useState(otpinput);

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
      await axios.post(`${backend_link}/api/auth/register`, {
        name,
        email,
      });
      setOtp("flex");
      // localStorage.setItem("token", res.data.token);
      // router.push("/auth/login");
      // router.push('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const Registeruser = async () => {
    const { name, email, password } = formData;

    // Simple validation
    if (!name || !email || !password || otpString.length < 6) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post(`${backend_link}/api/auth/register/complete`, {
        name,
        email,
        otp:otpString,
        password,
      });
      setOtp("hidden");
      router.push("/auth/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Registration failed");
      } else {
        setError("An unknown error occurred.");
      }
    }
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOtpChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = event.target.value;

    if (!/^\d?$/.test(val)) return; // Allow only single digit input

    // refs.current[index + 1]?.focus();
    const newOtpArr = [...otpArr];
    newOtpArr[index] = val;
    setOtpArr(newOtpArr);
    // Update the OTP string
    setOtpString(newOtpArr.join("")); // Join the array to form a string

    if (val) {
      refs.current[index + 1]?.focus();
    } else {
      // If the input is empty (backspace pressed), focus on the previous input
      refs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (refs.current[0]) {
      refs.current[0].focus();
    }
  }, [refs]);
  return (
    <>
      <div className=" relative">
        <div className="flex flex-row text-white">
          <div className="w-1/2 h-[100vh] overflow-hiddenflex justify-center items-center">
            {/* image  */}
            <Image
              src={Bg}
              alt="bg-image"
              className="w-full h-full object-cover"
            ></Image>
          </div>

          <div className="w-1/2 flex flex-col justify-center bg-gray-900 relative">
            <div
              className={`bg-gray-800 ${otp} h-full w-full absolute flex-col items-center justify-center`}
            >
              <div className="flex flex-col items-center">
                <h1 className="text-[3rem] font-bold pb-8 text-white">
                  Kernel <span className="text-[#AAFFA9]"> Hub</span>
                </h1>
                <p className="text-[2.8rem] font-medium text-white">
                  Verify Your Email
                </p>
                <p className="text-[1.2rem] text-white mb-10 mt-2 text-center">
                  Enter the code sent to your email to complete <br /> your
                  account setup.
                </p>
              </div>
              {/* input otp */}
              <div className="">
                {/* <input
                  className="bg-transparent w-12 h-12 outline-none border-2 border-gray-200 rounded-md"
                  type="text"
                /> */}
                {otpinput.map((value, index) => (
                  <input
                    key={index}
                    className="bg-transparent mr-4 focus:border-2 focus:border-[#AAFFA9] text-center text-white  w-12 h-12 outline-none border-2 border-gray-200 rounded-xl"
                    type="text"
                    ref={(el) => {
                      refs.current[index] = el;
                    }}
                    // ref={refs[index]}
                    value={otpArr[index]}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength={1}
                  />
                ))}
              </div>

              <button
                onClick={Registeruser}
                className="text-gray-600 px-10 py-2 rounded-md bg-[#AAFFA9] mt-8"
              >
                Submit
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-[3rem] font-bold pb-8">
                Kernel <span className="text-[#AAFFA9]"> Hub</span>
              </h1>
              <p className="text-[2.8rem] font-medium">Create an Account</p>
              <p className="text-[1.2rem]">Please register to get started</p>
            </div>
            <div className="flex items-center justify-center mt-8">
              <form
                onSubmit={handleRegister}
                className="flex flex-col w-1/2 gap-4"
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
                  Next
                </button>
                <p className="flex items-center justify-center text-gray-400 text-sm font-medium mt-8">
                  Or Continue With
                </p>
                <button
                  type="submit"
                  onClick={() => setOtp("flex")}
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
