import { useState } from "react";
import { login } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(form);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const goToSignup = () => navigate("/"); // or "/signup"

  return (
    <div className="relative min-h-screen flex items-center justify-center text-gray-100">

      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/duxeqhtxe/image/upload/v1761466826/batmobile-car-with-neon-lights_gbbkwo.jpg')",
        }}
      ></div>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/60"></div>

      {/* Glass Card */}
      <div className="w-full max-w-md p-10 bg-black/20 backdrop-blur-lg rounded-3xl border border-cyan-400/30 shadow-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-lg">
          Login to <span className="text-blue-400">Com_Volk</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-black/30 border border-cyan-400/50 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-sm"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-black/30 border border-cyan-400/50 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition shadow-sm"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm font-medium mt-1 text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-black/40 border border-cyan-400/50 text-cyan-400 font-semibold py-3 rounded-xl shadow-md hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>
        </form>

        {/* Redirect to Signup */}
        <p className="mt-6 text-center text-gray-300 text-sm">
          Don't have an account?{" "}
          <span
            className="text-cyan-400 font-semibold hover:underline cursor-pointer"
            onClick={goToSignup}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
