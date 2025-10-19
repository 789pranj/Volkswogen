import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] 
      border-t border-blue-800/40 text-center text-gray-100 text-sm backdrop-blur-md shadow-inner">
      
      <p className="font-medium">
        Created by{" "}
        <span className="text-cyan-400 font-bold">Pranjal</span>,{" "}
        <span className="text-cyan-400 font-bold">Rudransh Tiwari</span>,{" "}
        <span className="text-cyan-400 font-bold">Vedant Shukla</span>,{" "}
        <span className="text-cyan-400 font-bold">Jaspeet Kumar Bhatia</span>
      </p>
      <p className="text-xs text-gray-300 mt-1">© 2025 Volkswagen Hackathon</p>
    </footer>
  );
};

export default Footer;
