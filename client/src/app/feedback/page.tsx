"use client"
import {useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const Page = () => {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", { message });
    setSubmitted(true);

    // Reset form field
    setMessage("");
  };
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
    
    {/* -------------------------------------------- */}
    <div className="my-[5rem] max-w-[60%] h-[32rem]max-h[40rem] flex flex-col justify-center gap-6 items-center text-white mx-auto p-6 bg-gray-700 shadow-md rounded-lg">
      <h2 className="w-[90%] text-center text-transparent bg-clip-text bg-gradient-to-r from-[#4dff97] to-[#AAFFA9] text-md mt-4"> <span className='text-4xl text-white '>We’d love to hear your thoughts! </span><br/>Please share any feedback to help us improve your experience.</h2>
      {submitted && (
        <p className="mb-4 text-green-600 font-semibold">
          Thank you for your feedback!
        </p>
      )}
      <form onSubmit={handleSubmit} className="w-[90%]">
        <div>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full px-8 py-8 resize-none h-[18rem] bg-slate-600 outline-none rounded-md focus:outline-none focus:ring  focus:border-[#AAFFA9]"
            placeholder="Enter Your Experience"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-4 mt-6 text-gray-700 bg-[#AAFFA9] font-semibold rounded-md hover:bg-[#AAFFA9]"
        >
          Submit
        </button>
      </form>
    </div>
    {/* -------------------------------------- */}
    <Footer/>
    </>
  )
}

export default Page