import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    coNo: '',
    password: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed');
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
        
        <h2 className="text-center text-white text-xl sm:text-2xl font-medium mb-6 sm:mb-8">REGISTER</h2>
        
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white text-xs sm:text-sm mb-1">FIRST NAME</label>
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
            <label className="block text-white text-xs sm:text-sm mb-1">LAST NAME</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-sm bg-white-300/80 text-black text-sm outline-none"
              placeholder="Enter your last name"
              required
            />
          </div>
          
          <div>
            <label className="block text-white text-xs sm:text-sm mb-1">EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-sm bg-white-300/80 text-black text-sm outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-white text-xs sm:text-sm mb-1">CO NO.</label>
            <input
              type="text"
              name="coNo"
              value={formData.coNo}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-sm bg-white-300/80 text-black text-sm outline-none"
              placeholder="Enter your CO number"
              required
            />
          </div>
          
          <div>
            <label className="block text-white text-xs sm:text-sm mb-1">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-sm bg-white-300/80 text-black text-sm outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label htmlFor="agreeTerms" className="ml-2 text-xs font-medium text-white">
              By clicking here, I give my consent to "name nung site natin"
              to collect and process my personal data according to its Terms and Conditions ,
              and Privacy Policy.
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-[#EF8B00] text-black font-medium rounded-sm shadow hover:opacity-90 transition mt-4"
          >
            REGISTER
          </button>
          
          <div className="text-center">
            <Link to="/login" className="text-[#146BFF] text-xs">
              already have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;