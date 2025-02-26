"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError(""); // Clear error when switching
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isSignIn ? "/api/users/login" : "/api/users/register";
    const payload = isSignIn
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("API Response:", data); // Debugging
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      localStorage.setItem("token", data.token);
      console.log("Token stored:", data.token); // Debugging
      navigate("/track"); // Redirect after login
      window.location.reload()
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-teal-50 to-blue-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <Link to="/" className="text-teal-600 font-light mb-4 inline-block">
          ← Back to Home
        </Link>
        <h2 className="text-2xl font-bold text-teal-800 text-center mb-10 mt-4">
          {isSignIn ? "Sign in to Tracne" : "Create your Tracne account"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div>
              <label className="block mb-1 font-bold text-gray-700">Full Name</label>
              <input name="name" type="text" required placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.name} onChange={handleChange}
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-bold text-gray-700">Email address</label>
            <input name="email" type="email" required placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.email} onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-700">Password</label>
            <input name="password" type="password" required placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.password} onChange={handleChange}
            />
          </div>
          {!isSignIn && (
            <div>
              <label className="block mb-1 font-bold text-gray-700">Confirm Password</label>
              <input name="confirmPassword" type="password" required placeholder="Confirm your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.confirmPassword} onChange={handleChange}
              />
            </div>
          )}
          <button type="submit" className="w-full px-4 py-2 mt-6 rounded-md font-bold bg-teal-600 text-white hover:bg-teal-700">
            {isSignIn ? "Sign In" : "Create Account"}
          </button>
        </form>
        <div className="text-center mt-4">
          <span>{isSignIn ? "New to Tracne?" : "Already have an account?"}</span>
          <span onClick={toggleForm} className="ml-1 text-teal-600 font-bold cursor-pointer hover:underline">
            {isSignIn ? "Create an account" : "Sign in to your account"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
