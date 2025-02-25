import React from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";



export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex text-center justify-between w-full">
            <Link to="/" className="text-2xl font-extrabold text-teal-800">
              tracne
            </Link>
            <div className="flex items-center justify-center space-x-12">
              <Link to="/" className="text-gray-500 hover:bg-teal-50 hover:rounded-2xl hover:text-teal-700 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/track" className="text-gray-500 hover:bg-teal-50 hover:rounded-2xl hover:text-teal-700 px-3 py-2 rounded-md text-sm font-medium">
                Track
              </Link>
              <Link to="/analysis" className="text-gray-500 hover:bg-teal-50 hover:rounded-2xl hover:text-teal-700 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
              </Link>
              <Link to="/login" className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
