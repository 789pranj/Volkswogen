import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { LogOut, UserPlus, LogIn } from "lucide-react";
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
      bg-black border-b border-gray-700 shadow-lg sticky top-0 z-50 text-white">

      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center">
          <img
            src="https://res.cloudinary.com/duxeqhtxe/image/upload/v1761465788/401_aqy55f.jpg"
            alt="Com_Volk Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="ml-2 text-2xl font-extrabold tracking-wide text-white drop-shadow-md
            hover:text-cyan-300 transition-colors duration-300">
            Com_Volk
          </span>
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
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold
              shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <UserPlus className="w-5 h-5" />
              <span>Signup</span>
            </Link>

            {/* Login Button */}
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2 rounded-full 
              bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500 text-white font-semibold
              shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
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
            bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white font-semibold
            shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
