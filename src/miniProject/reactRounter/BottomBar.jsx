import React from "react";
import { FaFacebookF, FaDiscord, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";

const BottomBar = () => {
  return (
    <footer className="w-full  py-4 mt-10 font-sans text-xl" >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6" data-aos="fade-up" data-aos-delay="100">

        {/* Logo Section */}
        <div className="text-center md:text-left mb-2 md:mb-0 md:pl-12">
          <h2 className="text-3xl font-extrabold text-gray-700 ">
            Task<span className="text-indigo-500">Flow</span>
          </h2>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:justify-center items-center md:space-x-40 text-sm text-gray-700 text-cente  font-medium ">
          <div className="mb-4 md:mb-0  md:text-left">
            <h3 className="font-semibold text-gray-800 mb-4 font-medium ">RESOURCES</h3>
            <a href="#" className="block hover:text-indigo-500 mb-4">Home</a>
            <a href="#" className="block hover:text-indigo-500 mb-4">About</a>
          </div>
          <div className="mb-4 md:mb-0 md:text-left">
            <h3 className="font-semibold text-gray-800 mb-4 font-medium ">FOLLOW US</h3>
            <a href="#" className="block hover:text-indigo-500 mb-4">GitHub</a>
            <a href="#" className="block hover:text-indigo-500 mb-4">Discord</a>
          </div>
          <div className="mb-4 md:mb-0 md:text-left">
            <h3 className="font-semibold text-gray-800 mb-4 font-medium ">LEGAL</h3>
            <a href="#" className="block hover:text-indigo-500 mb-4">Privacy Policy</a>
            <a href="#" className="block hover:text-indigo-500 mb-4">Terms & Conditions</a>
          </div>
        </div>


        {/* Social Icons */}
        {/* <div className="flex space-x-4 text-gray-700 text-xl">
          <a href="#" className="hover:text-indigo-500"><FaFacebookF /></a>
          <a href="#" className="hover:text-indigo-500"><FaDiscord /></a>
          <a href="#" className="hover:text-indigo-500"><FaTwitter /></a>
          <a href="#" className="hover:text-indigo-500"><FaGithub /></a>
          <a href="#" className="hover:text-indigo-500"><FaDribbble /></a>
        </div> */}

      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <p className="text-center text-gray-500 mt-4 md:justify-center items-center text-sm">© 2025 Made By Piyush Garg. All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default BottomBar;
