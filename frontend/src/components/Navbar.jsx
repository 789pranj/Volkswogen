import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { LogOut, UserPlus, LogIn, Home, Car } from "lucide-react";
import { logout } from "../api/auth";

export const Navbar = () => {
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    clearUser();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4 
      bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] 
      shadow-lg sticky top-0 z-50 border-b border-blue-800/40 backdrop-blur-md text-gray-100">

      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Car className="w-8 h-8 text-cyan-400" />
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white drop-shadow-lg
          hover:text-cyan-300 transition-colors duration-300"
        >
          Volkswagen
        </Link>
      </div>

      {/* Buttons Section */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            {/* Signup Button */}
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-2 rounded-full 
              bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-semibold
              shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <UserPlus className="w-5 h-5" />
              <span>Signup</span>
            </Link>

            {/* Login Button */}
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2 rounded-full 
              bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold
              shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
          </>
        ) : (
          /* Logout Button */
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-full 
            bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold
            shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
