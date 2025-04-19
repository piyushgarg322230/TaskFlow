import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';
import { directUrl } from "./Common"; // Adjust the import path as necessary

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="  p-4 font-sans ">
      <div className="container mx-auto flex justify-between items-center ">
          <Link to={`${directUrl.Home}`} className="text-2xl font-extrabold text-gray-700 tracking-wide md:ml-4">
            Task<span className="text-indigo-500">Flow</span>
          </Link>

        {/* <div className="hidden md:flex space-x-6 text-lg font-medium ">
              <a href="#github" className="text-black hover:text-indigo-500 transition ">GitHub</a>
            </div> */}

        <div className="hidden md:flex items-center space-x-4 font-medium mr-8 ">
          <Link to={`${directUrl.Home}`} className="text-black hover:text-indigo-500 transition ">Home</Link>
          <Link to={`${directUrl.about}`} className="text-black hover:text-indigo-500 transition ">About</Link>
          <Link to={`${directUrl.contact}`} className="text-black hover:text-indigo-500 transition ">Features</Link>
          {/* <Link to="#login" className="text-black">Log in</Link> */}

          <Link to={`${directUrl.login}`} className="text-black">Log in</Link>
          <Link to={`${directUrl.login}`} className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
            Get started
          </Link>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col text-lg space-y-4 mt-4  shadow-md p-4 font-medium">
          <Link to={`${directUrl.Home}`} className="text-black hover:text-indigo-500 transition">Home</Link>
          <Link to={`${directUrl.about}`} className="text-black hover:text-indigo-500 transition">About</Link>
          <Link to={`${directUrl.contact}`} className="text-black hover:text-indigo-500 transition">Features</Link>
          {/* <Link to="#github" className="text-black hover:text-indigo-500 transition">GitHub</Link> */}
          <Link to={`${directUrl.login}`} className="text-black">Log in</Link>
          <Link to={`${directUrl.login}`} className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition text-center">
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
}
