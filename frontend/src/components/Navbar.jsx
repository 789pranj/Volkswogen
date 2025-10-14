import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { LogOut, UserPlus, LogIn, Home } from "lucide-react";
import { logout } from "../api/auth";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    clearUser();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Home className="w-7 h-7 text-blue-800" />
        <Link
          to="/"
          className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors duration-300"
        >
          Volkswagen
        </Link>
      </div>

      {/* Navigation Links / Auth Buttons */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link
              to="/"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200"
            >
              <UserPlus className="w-5 h-5" />
              <span>Signup</span>
            </Link>

            <Link
              to="/login"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 hover:text-red-700 transition-colors duration-200 focus:outline-none"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}
