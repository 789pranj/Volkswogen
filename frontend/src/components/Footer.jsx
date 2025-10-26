import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-black border-t border-gray-800 text-center text-gray-300 shadow-inner">
      
      <p className="font-medium text-gray-300">
        Created by{" "}
        <span className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
          Pranjal
        </span>,{" "}
        <span className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
          Rudransh Tiwari
        </span>,{" "}
        <span className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
          Vedant Shukla
        </span>,{" "}
        <span className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
          Jaspeet Kumar Bhatia
        </span>
      </p>

      <p className="text-xs text-gray-500 mt-2">
        © 2025 Volkswagen Hackathon
      </p>
    </footer>
  );
};

export default Footer;
