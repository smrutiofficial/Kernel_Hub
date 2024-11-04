import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const page = () => {
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
    <Navbar/>
    resources page
    <Footer/>
    </>
  )
}

export default page