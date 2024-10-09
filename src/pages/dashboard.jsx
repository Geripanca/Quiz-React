import React from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const { username } = location.state || {};

  const cardData = [
    {
      icon: "/book-icon.svg", // URL gambar untuk Card 1
      description: "Lihat Rules",
      link: "#",
    },
    {
      icon: "/test-icon.svg", // URL gambar untuk Card 2
      description: "Mulai Kerjakan Quiz",
      link: "#",
    },
    {
      icon: "/logout-icon.svg", // URL gambar untuk Card 3
      description: "Log Out",
      link: "#",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-800 to-purple-500 min-h-screen font-[Poppins] text-[#0B0B0C] p-5">
      <div className="text-4xl font-bold">
        Hi, Selamat Datang {username ? username : "Pengguna"}
      </div>
      {/* menu */}
      <div className="container mx-auto pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <a
              key={index}
              href={card.link}
              className="bg-purple-300 p-5 rounded-lg shadow flex flex-col items-center"
            >
              <img
                src={card.icon}
                alt={card.description}
                className="mb-2 h-16 w-16"
              />
              <p>{card.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
