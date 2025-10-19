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

  const goToSignup = () => {
    navigate("/"); // or "/signup"
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-gray-100">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] bg-[length:200%_200%] animate-gradientMove"></div>

      {/* Glass Card */}
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-400/30">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-cyan-300 drop-shadow-lg">
          Login to <span className="text-blue-400">Volkswagen</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border border-blue-400/40 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition shadow-sm hover:shadow-md"
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
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border border-blue-400/40 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition shadow-sm hover:shadow-md"
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
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
}

export default Login;