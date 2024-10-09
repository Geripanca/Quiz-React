import React from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div className="bg-gradient-to-r from-purple-800 to-purple-500 min-h-screen font-[Poppins] text-[#0B0B0C] p-5">
      <div className="text-4xl font-bold">
        Hi, {username ? username : "Pengguna"}, Selamat Datang
      </div>
    </div>
  );
};

export default Dashboard;
