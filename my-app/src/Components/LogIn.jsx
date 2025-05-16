import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    password: ''
  });

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
        localStorage.setItem('token', data.token);
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify({
          name: formData.firstName,
          avatar: 'https://i.pravatar.cc/150?u=' + formData.firstName,
          bio: 'Your bio here...'
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
      <div className="w-full max-w-md bg-[#02122E] rounded-xl shadow-lg border border-[#142645] p-8 relative">
        <h2 className="text-center text-white text-2xl font-medium mb-8">LOG IN</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white mb-2">FIRST NAME</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-white text-black"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-white text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#EF8B00] text-black font-medium rounded hover:opacity-90"
          >
            LOG IN
          </button>
          
          {/* Don't have an account section */}
          <div className="text-center mt-4 pt-2">
            <p className="text-white">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#EF8B00] hover:text-[#d97f00] font-medium">
                SIGN UP
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;