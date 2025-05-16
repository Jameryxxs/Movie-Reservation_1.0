import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../Assets/avatar.png"; // Put your default avatar here

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    avatar: defaultAvatar,
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      setUserData({
        name: storedData.name || "",
        avatar: storedData.avatar || defaultAvatar,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#142645] to-[#02122E] flex items-center justify-center p-4">
      <div className="bg-[#02122E] border border-[#142645] rounded-2xl shadow-lg p-8 max-w-md w-full text-white">
        <div className="flex flex-col items-center">
          <img
            src={userData.avatar}
            alt={`${userData.name}'s avatar`}
            className="w-28 h-28 rounded-full shadow-lg border-4 border-[#EF8B00]"
          />
          <h2 className="mt-6 text-3xl font-serif italic text-[#EF8B00]">
            {userData.name || "User"}
          </h2>

          <button
            onClick={handleLogout}
            className="mt-10 bg-[#EF8B00] hover:bg-[#d97f00] text-black font-semibold py-2 px-8 rounded-lg shadow-md transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
