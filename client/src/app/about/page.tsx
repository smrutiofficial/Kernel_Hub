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
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-[#AAFFA9] mb-6 text-center">
        About Kernel Hub
      </h1>

      <p className="text-lg text-gray-300 mb-4">
        Welcome to <span className="font-semibold text-[#AAFFA9]">Kernel Hub</span> — your go-to resource for all things Linux and open source! At Kernel Hub, we are dedicated to bringing you the latest news, insights, and tutorials to support the Linux and open-source communities worldwide.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">Our Mission</h2>
        <p className="text-gray-300">
          Our mission is simple: to empower the Linux community and open-source enthusiasts with up-to-date information, practical guides, and a platform for sharing ideas and discoveries. Whether you’re a developer, a hobbyist, or a beginner curious about the world of open-source technology, Kernel Hub has something for you.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>
            <strong>Latest News:</strong> Stay informed with up-to-date reports on Linux kernel updates, GTK developments, desktop environments, and ecosystem news.
          </li>
          <li>
            <strong>Tutorials:</strong> From basic command-line guides to advanced Linux programming, our tutorials are designed to help you develop and refine your skills, whether you’re just starting out or looking to deepen your expertise.
          </li>
          <li>
            <strong>Community Insights:</strong> Learn from the experiences of developers and contributors across the globe. Kernel Hub highlights projects, initiatives, and events that shape the open-source world, providing a window into the thriving community behind the software you love.
          </li>
          <li>
            <strong>Software Reviews:</strong> Discover the latest tools, applications, and utilities for Linux and other open-source platforms. Our reviews focus on practical functionality, usability, and the impact of new software on workflows and productivity.
          </li>
          <li>
            <strong>Kernel & GTK Updates:</strong> Keep up with the most recent advancements in the Linux kernel and GTK. Kernel Hub brings you insights on new features, optimizations, and what they mean for the future of Linux.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">Join Us on the Journey</h2>
        <p className="text-gray-300">
          Kernel Hub is more than just a blog — it’s a community dedicated to supporting and advancing open-source values. We invite you to join us on this journey, explore new possibilities, and contribute to the ever-evolving Linux and open-source landscape.
        </p>
      </section>

      <p className="text-lg text-gray-300 font-semibold mt-6 text-center">
        Thank you for being part of Kernel Hub. Let’s keep building the future of technology together!
      </p>
    </div>
    <Footer/>
    </>
  )
}

export default page