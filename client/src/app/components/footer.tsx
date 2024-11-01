import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 flex flex-row justify-around items-center">
          <div className="text-center ">
            <h2 className="text-3xl font-bold text-white mb-2">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-400">
              Stay updated with the latest Linux tips and open-source news
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#11FFBD]"
              />
              <button
                className="font-medium text-gray-700 px-6 py-2 rounded-r-md 
                bg-gradient-to-r from-[#AAFFA9] to-emerald-400 transition duration-300"
              >
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
                Kernel Hub is your go-to resource for Linux tips, open-source
                news, and community discussions.
              </p>
            </div>

            {/* Row 2 */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <ul className="text-gray-400">
                <li className="mb-2">
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/community" className="hover:text-white">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="hover:text-white">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>

            {/* Row 3 */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
              <ul className="text-gray-400">
                <li className="mb-2">
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/tutorials" className="hover:text-white">
                    Tutorials
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/documentation" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-.27 17.64c-4.14 0-7.5-3.36-7.5-7.5 0-.29.03-.57.06-.85 2.07 2.11 4.43 2.72 7.2 2.72v.06c0-1.86 1.51-3.39 3.39-3.39 1.28 0 2.39.72 3.02 1.76.61-.13 1.17-.34 1.7-.63-.19.6-.57 1.1-1.07 1.42.55-.06 1.09-.21 1.58-.42-.38.55-.86 1.02-1.43 1.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                {/* Repeat Link for other social icons */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
