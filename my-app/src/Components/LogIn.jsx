import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    // Add your authentication logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main card container */}
      <div className="flex justify-center items-center flex-grow px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-center mb-12">LOG IN</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium uppercase mb-2">USERNAME</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium uppercase mb-2">PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                required
              />
              <div className="text-right mt-1">
                <button type="button" className="text-xs">FORGOT PASSWORD</button>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
              >
                LOG IN
              </button>
              <Link
                to="/SignUp"
                className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded text-center"
              >
                REGISTER
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;