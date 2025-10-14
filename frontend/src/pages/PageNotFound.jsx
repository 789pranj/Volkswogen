import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page Not Found</p>
      <button
        onClick={goHome}
        className="flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition"
      >
        <Home className="w-5 h-5" />
        Go Home
      </button>
    </div>
  );
};

export default PageNotFound;
