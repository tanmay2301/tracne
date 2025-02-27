import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); 
    window.location.reload(); // Ensure state updates everywhere
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full h-20 z-50"> {/* Increased height */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between"> {/* Increased height */}
          <Link to="/" className="text-3xl font-extrabold text-teal-800"> {/* Larger font */}
            tracne
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FaBars size={32} /> {/* Larger icon */}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-16"> {/* Increased spacing */}
            <Link to="/" className="text-gray-500 hover:text-teal-700 hover:bg-teal-50 hover: rounded-2xl px-4 py-3 text-lg font-medium"> {/* Larger text and padding */}
              Home
            </Link>
            <Link to="/track" className="text-gray-500 hover:text-teal-700 hover:bg-teal-50 hover: rounded-2xl px-4 py-3 text-lg font-medium"> {/* Larger text and padding */}
              Track
            </Link>
            <Link to="/analysis" className="text-gray-500 hover:text-teal-700 hover:bg-teal-50 hover: rounded-2xl px-4 py-3 text-lg font-medium"> {/* Larger text and padding */}
              Dashboard
            </Link>
            {isLoggedIn ? (
              <div className="relative">
                <FaRegUserCircle
                  size={36} /* Larger icon */
                  className="cursor-pointer text-teal-700 hover:text-gray-600"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div
                    className="absolute right-0 mt-3 w-28 bg-white rounded-2xl shadow-lg" /* Larger dropdown */
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center px-6 py-3 text-lg text-gray-700 hover:bg-teal-50 cursor-pointer hover: rounded-2xl" /* Larger text and padding */
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-teal-600 text-white px-6 hover:bg-teal-700 py-3 rounded-2xl text-lg font-medium"> {/* Larger text and padding */}
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-2 sm:px-5"> {/* Increased padding */}
            <Link 
              to="/" 
              className="block text-gray-500 hover:text-teal-700 hover:bg-teal-50 rounded-2xl px-4 py-3 text-xl font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/track" 
              className="block text-gray-500 hover:text-teal-700 hover:bg-teal-50 rounded-2xl px-4 py-3 text-xl font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Track
            </Link>
            <Link 
              to="/analysis" 
              className="block text-gray-500 hover:text-teal-700 hover:bg-teal-50 rounded-2xl px-4 py-3 text-xl font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-xl font-medium text-gray-700 hover:bg-teal-50 rounded-2xl" 
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="block text-center bg-teal-600 text-white px-4 hover:bg-teal-700 py-3 rounded-2xl text-xl font-medium" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}