import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    password: ''
  });

  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem("userLoggedIn") === "true") {
      navigate("/profile");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        // Save user session
        localStorage.setItem('token', data.token);
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify({
          name: data.user?.name || formData.firstName,
          avatar: data.user?.avatar || `https://i.pravatar.cc/150?u=${formData.firstName}`,
          bio: data.user?.bio || "Welcome back to your profile!",
        }));

        navigate('/profile');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Error connecting to server');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-b from-[#142645] to-[#02122E] font-poppins px-4 py-6">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-[#02122E] rounded-xl shadow-lg border border-[#142645] p-6 sm:p-8 md:p-10 relative">
        <div className="absolute inset-1 border border-white/30 rounded-lg pointer-events-none"></div>
        <h2 className="text-center text-white text-xl sm:text-2xl font-medium mb-6 sm:mb-8">LOG IN</h2>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">FIRST NAME</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-sm bg-white-300/80 text-black text-sm outline-none"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label className="block text-white text-xs sm:text-sm mb-1 sm:mb-2">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-sm bg-white-300/80 text-black text-sm outline-none"
              placeholder="Enter your password"
              required
            />
            <div className="text-right mt-1">
              <a href="#" className="text-[#146BFF] text-[10px]">forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-[#EF8B00] text-black font-medium rounded-sm shadow hover:opacity-90 transition"
          >
            LOG IN
          </button>

          <div className="text-center text-white text-xs sm:text-sm my-1 sm:my-2">or</div>

          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-full py-2 sm:py-3 border border-white text-white font-medium rounded-sm bg-transparent hover:opacity-90 transition"
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
