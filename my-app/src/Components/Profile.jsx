import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    avatar: '',
    bio: ''
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      setUserData(storedData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm mx-auto mt-10">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full shadow-md"
          src={userData.avatar}
          alt={`${userData.name}'s avatar`}
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">{userData.name}</h2>
        <p className="text-gray-600 text-center mt-2">{userData.bio}</p>

        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
