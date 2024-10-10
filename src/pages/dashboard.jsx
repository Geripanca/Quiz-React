import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || {};

  useEffect(() => {
    // Periksa apakah pengguna telah login
    const storedUsername = localStorage.getItem("username"); // Ganti dengan kunci yang sesuai
    if (!storedUsername) {
      navigate("/"); // Arahkan pengguna ke halaman login jika belum login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username"); // Hapus sesi pengguna
    navigate("/"); // Arahkan ke halaman login
  };

  const cardData = [
    {
      icon: "/book-icon.svg", // URL gambar untuk Card 1
      description: "Lihat Rules",
      link: "#",
    },
    {
      icon: "/test-icon.svg", // URL gambar untuk Card 2
      description: "Mulai Kerjakan Quiz",
      link: "/quizapp",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-800 to-purple-500 min-h-screen font-[Poppins] text-[#0B0B0C] p-5">
      <div className="text-4xl font-bold pl-2">
        Hi, Selamat Datang {username ? username : "Pengguna"}
      </div>
      {/* menu */}
      <div className="container mx-auto pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="bg-purple-300 hover:bg-purple-500 p-5 rounded-lg shadow flex flex-col items-center"
            >
              <img
                src={card.icon}
                alt={card.description}
                className="mb-2 h-16 w-16"
              />
              <p>{card.description}</p>
            </Link>
          ))}
          {/* Tombol Logout */}
          <button
            onClick={handleLogout}
            className="bg-purple-300 hover:bg-purple-500 p-5 rounded-lg shadow flex flex-col items-center"
          >
            <img
              src="/logout-icon.svg" // Ganti dengan URL gambar yang sesuai
              alt="Log Out"
              className="mb-2 h-16 w-16"
            />
            <p className="text-center">Log Out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
