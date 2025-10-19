import { useAuthStore } from "../store/auth";
import { LogOut, User, FolderGit2, CheckCircle2 } from "lucide-react";

export const Dashboard = () => {
  const user = useAuthStore((s) => s.user);

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Loading...
      </p>
    );

  return (
    <div className="relative min-h-screen overflow-hidden text-gray-800 p-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] bg-[length:200%_200%] animate-gradientMove"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-md">
          Welcome, {user.fullName}
        </h1>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Profile Info */}
        <div className="group relative backdrop-blur-xl bg-white/80 border border-blue-300/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/40 to-cyan-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-xl shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-blue-800">Profile Info</h2>
          </div>
          <p className="text-gray-700">
            <span className="font-medium text-blue-500">Name:</span>{" "}
            {user.fullName}
          </p>
          <p className="text-gray-700 mt-1">
            <span className="font-medium text-blue-500">Email:</span>{" "}
            {user.email}
          </p>
        </div>

        {/* Projects */}
        <div className="group relative backdrop-blur-xl bg-white/80 border border-blue-300/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-50/40 to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-xl shadow-md">
              <FolderGit2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-blue-800">Projects</h2>
          </div>
          <p className="text-gray-700">
            View your active hackathon and Volkswagen project details.
          </p>
        </div>

        {/* Tasks */}
        <div className="group relative backdrop-blur-xl bg-white/80 border border-blue-300/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/40 to-cyan-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-green-500 to-cyan-400 p-3 rounded-xl shadow-md">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-green-700">Tasks</h2>
          </div>
          <p className="text-gray-700">
            Manage and monitor your assigned development or research tasks.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
