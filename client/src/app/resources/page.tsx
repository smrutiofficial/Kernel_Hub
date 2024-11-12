import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import Link from "next/link";
import reft from "@/app/image/web development.svg"
import img2 from "@/app/image/bot.svg"
import img3 from "@/app/image/code documentatio.svg";
import img4 from "@/app/image/Screenshot from 2024-11-11 19-37-12.svg";
import img5 from "@/app/image/communityIcon_n2hvyn96zwk81.svg"

const page = () => {
  const arr =[{
    name:"Quick Ref",
    icon:img3,
    link:""
  },
  {
    name:"Terminal Setup",
    icon:reft,
    link:""
  },
  {
    name:"Development setup",
    icon:img4,
    link:""
  },
  {
    name:"Genome costamization",
    icon:img2,
    link:""
  },
  {
    name:"Neovim Setup",
    icon:img5,
    link:""
  }
]
  return (
    <>
      <div className="w-svw h-8 bg-gradient-to-r from-[#AAFFA9] to-emerald-500 flex justify-center items-center relative">
        <p className="text-gray-600 font-medium">
          Ubuntu{" "}
          <span className="text-yellow-300 [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.5)]">
            24.10{" "}
          </span>
          loaded with new features 👋🏻! let&apos;s view new updates .🥳
        </p>
      </div>
      <Navbar />
      {/* -------------------------------------- */}
      <div className=" w-full h-[40rem] flex justify-center items-center gap-6">


      {arr.map((item, index) => (
          <Link href={item.link} key={index} passHref>
            <div className="gap-4 h-fit w-[15rem] flex flex-col bg-gray-900 rounded-xl justify-center items-center hover:shadow-lg hover:bg-gray-800 transition duration-200">
              <div className="w-[80%] bg-gradient-to-r from-[#aaffa99a] to-[#2d5b2d81] rounded-md h-[60%] mt-8 overflow-hidden">
                <Image
                  src={item.icon} // Fallback icon if none provided
                  className="w-full scale-50 rounded-xl object-cover h-full"
                  alt={item.name}
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-lg font-bold capitalize text-center px-10 h-16 mb-8 flex justify-center items-center text-white">{item.name}</p>
            </div>
          </Link>
        ))}


      </div>
      {/* -------------------------------------- */}
      <Footer />
    </>
  );
};

export default page;
