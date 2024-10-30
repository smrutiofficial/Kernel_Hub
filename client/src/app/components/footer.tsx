import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div>
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 flex flex-row justify-around items-center">
          <div className="text-center ">
            <h2 className="text-3xl font-bold text-white mb-2">Subscribe to Our Newsletter</h2>
            <p className="text-gray-400">Stay updated with the latest Linux tips and open-source news</p>
          </div>
          <div className="flex justify-center">
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#11FFBD]"
              />
              <button className="font-medium text-gray-700 px-6 py-2 rounded-r-md 
                bg-gradient-to-r from-[#AAFFA9] to-emerald-400 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 py-8">
        <div className="container mx-auto w-[64%]">
          <div className="flex flex-wrap justify-between">
            {/* Row 1 */}
            <div className="w-full md:w-1/4 mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">Kernel Hub</h3>
              <p className="text-gray-400">
                Kernel Hub is your go-to resource for Linux tips, open-source news, and community discussions.
              </p>
            </div>

            {/* Row 2 */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <ul className="text-gray-400">
                <li className="mb-2">
                  <Link href="/" className="hover:text-white">Home</Link>
                </li>
                <li className="mb-2">
                  <Link href="/about" className="hover:text-white">About</Link>
                </li>
                <li className="mb-2">
                  <Link href="/resources" className="hover:text-white">Resources</Link>
                </li>
                <li className="mb-2">
                  <Link href="/community" className="hover:text-white">Community</Link>
                </li>
                <li>
                  <Link href="/feedback" className="hover:text-white">Feedback</Link>
                </li>
              </ul>
            </div>

            {/* Row 3 */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
              <ul className="text-gray-400">
                <li className="mb-2">
                  <Link href="/blog" className="hover:text-white">Blog</Link>
                </li>
                <li className="mb-2">
                  <Link href="/tutorials" className="hover:text-white">Tutorials</Link>
                </li>
                <li className="mb-2">
                  <Link href="/documentation" className="hover:text-white">Documentation</Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">FAQ</Link>
                </li>
              </ul>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  {/* Insert SVG for social icon here */}
                </Link>
                {/* Repeat Link for other social icons */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
