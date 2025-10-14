import { useAuthStore } from "../store/auth";
import { LogOut, User } from "lucide-react";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);


  if (!user) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-900">
          Welcome, <span className="text-blue-700">{user.fullName}</span>
        </h1>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-blue-700" />
            <h2 className="text-lg font-semibold text-gray-800">Profile Info</h2>
          </div>
          <p className="mt-3 text-gray-600">Name: {user.fullName}</p>
          <p className="mt-1 text-gray-600">Email: {user.email}</p>
        </div>

        {/* Add more cards here */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-200">
          <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
          <p className="mt-2 text-gray-600">Your Hackathon projects and stats will appear here.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-200">
          <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
          <p className="mt-2 text-gray-600">Track your progress and tasks for Volkswagen projects.</p>
        </div>
      </div>
    </div>
  );
}
