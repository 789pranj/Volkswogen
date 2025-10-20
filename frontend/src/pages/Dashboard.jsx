import { useAuthStore } from "../store/auth";
import { User, Gauge, Eye, Mic, Camera } from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const user = useAuthStore((s) => s.user);

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Loading...
      </p>
    );

  const features = [
    {
      icon: (
        <Gauge className="w-10 h-10 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
      ),
      title: "Steering Frequency Counter",
      desc: "Monitor and analyze steering wheel movement frequency in real time.",
      color: "from-blue-500 to-cyan-400",
      link: "/steeringUpload",
    },
    {
      icon: (
        <Eye className="w-10 h-10 text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.7)]" />
      ),
      title: "Driver Eye Counter",
      desc: "Detect and count driver eye movements to ensure alertness and focus.",
      color: "from-indigo-500 to-blue-400",
      link: "/videoUpload",
    },
    {
      icon: (
        <Mic className="w-10 h-10 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]" />
      ),
      title: "Driver Voice Recorder",
      desc: "Record and analyze driver voice patterns for fatigue or stress detection.",
      color: "from-green-500 to-teal-400",
      link: "/audioUpload",
    },
    {
      icon: (
        <Camera className="w-10 h-10 text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
      ),
      title: "Face Capturing Camera",
      desc: "Capture and analyze the driver’s facial expressions for emotion or drowsiness detection.",
      color: "from-purple-500 to-pink-400",
      link: "/pictureUpload",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden text-gray-800 p-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] bg-[length:200%_200%] animate-gradientMove"></div>

      {/* Profile Info */}
      <div className="group relative backdrop-blur-xl bg-white/80 border border-blue-300/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] max-w-lg mx-auto">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/40 to-cyan-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-xl shadow-md">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-blue-800">Profile Info</h2>
        </div>
        <p className="text-gray-700">
          <span className="font-medium text-blue-500">Name:</span> {user.fullName}
        </p>
        <p className="text-gray-700 mt-1">
          <span className="font-medium text-blue-500">Email:</span> {user.email}
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-20">
        <h2 className="text-4xl font-extrabold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-md">
          Our Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 px-6 md:px-20">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group relative h-[270px] backdrop-blur-xl bg-white/70 border border-blue-300/40 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>
              <div className="relative z-10 flex flex-col h-full justify-center items-start space-y-4">
                <div
                  className={`bg-gradient-to-br ${feature.color} p-4 rounded-2xl shadow-md transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-blue-800">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
