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
    <div className="max-w-4xl mx-auto px-6 py-10  min-h-screen">
      <h1 className="text-4xl font-bold text-[#AAFFA9] mb-6 text-center">
        Join the Kernel Hub Community
      </h1>

      <p className="text-lg text-gray-300 mb-4">
        Kernel Hub is more than just a blog; it’s a vibrant community of Linux and open-source enthusiasts dedicated to sharing knowledge, supporting one another, and advancing the world of open technology. Join us to connect, collaborate, and grow as we build the future of Linux together.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-300 mb-2">Ways to Connect</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>
            <strong>Community Forum:</strong> Dive into discussions, ask questions, and help others by sharing your knowledge. Our forum is the heart of the Kernel Hub community, where users of all levels connect.
          </li>
          <li>
            <strong>Social Media:</strong> Follow us on Twitter, Reddit, and other social platforms to stay updated on Linux news, tips, and trends.
          </li>
          <li>
            <strong>Events & Meetups:</strong> Join virtual and in-person events organized by Kernel Hub. These events include workshops, webinars, and meetups to help you learn, network, and collaborate.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-300 mb-2">Contribute to Kernel Hub</h2>
        <p className="text-gray-400">
          Our community thrives on contributions! Whether you want to submit articles, create tutorials, or help with coding projects, Kernel Hub welcomes your input. Contributions are a fantastic way to give back to the open-source community and grow your own skills.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-300 mb-2">Community Guidelines</h2>
        <p className="text-gray-400">
          To maintain a welcoming and productive environment, we ask all community members to follow our guidelines. We encourage respect, inclusivity, and a collaborative spirit. Remember, everyone is here to learn and share!
        </p>
      </section>

      <p className="text-lg text-[#AAFFA9] font-semibold mt-6 text-center">
        Join us today and become a part of the Kernel Hub journey. Together, we can make Linux and open-source software accessible, powerful, and fun for everyone!
      </p>
    </div>
    <Footer/>
    </>
  )
}

export default page