import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Login Successful:", data);
      // Save token to local storage or context
      localStorage.setItem("token", data.token); // Save the token

      // Navigate to the add recipe page
      navigate("/add-recipe"); // Adjust the path as per your routing setup
    } else {
      console.error("Login Error:", data.message);
      // Show error message to user (you might want to implement some state to show a message)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg w-full hover:bg-purple-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
