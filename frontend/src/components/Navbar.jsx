import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home after logout
    window.location.reload(); // Ensure state updates everywhere
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold text-teal-800">
            tracne
          </Link>
          <div className="flex items-center space-x-12">
            <Link to="/" className="text-gray-500 hover:text-teal-700 hover:bg-teal-50 hover: rounded-2xl px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/track" className="text-gray-500 hover:text-teal-700 hover:bg-teal-50 hover: rounded-2xl  px-3 py-2 text-sm font-medium">
              Track
            </Link>
            <Link to="/analysis" className="text-gray-500 hover:text-teal-700 hover:bg-teal-50 hover: rounded-2xl px-3 py-2 text-sm font-medium">
              Dashboard
            </Link>
            {isLoggedIn ? (
              <div className="relative">
                <FaRegUserCircle
                  size={28}
                  className="cursor-pointer text-teal-700 hover:text-gray-600"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-lg "
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 cursor-pointer hover: rounded-2xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-teal-600 text-white px-4 hover:bg-teal-700 py-2 rounded-2xl text-sm font-medium">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
