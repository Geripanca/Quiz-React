import React from "react";
import { Link } from "react-router-dom";

const Rules = () => {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-purple-500 min-h-screen flex justify-center font-[Poppins] text-[#0B0B0C] py-5 box-border">
      <div className="bg-purple-50 w-3/4 sm:w-1/2 p-3">
        <div className="flex justify-end">
          <Link
            to={"/dashboard"}
            className="bg-purple-500 p-1 sm:p-3 rounded-lg hover:bg-purple-700"
          >
            dashboard
          </Link>
        </div>
        <h1 className="text-2xl text-center font-bold">- Rules -</h1>
        <div className="p-2">
          <p>1. Waktu 1 menit untuk mengerjakan soal.</p>
          <p>2. Typesoal General</p>
          <p>3. Jumlah soal adalah 10</p>
          <p>4. Semangat</p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
