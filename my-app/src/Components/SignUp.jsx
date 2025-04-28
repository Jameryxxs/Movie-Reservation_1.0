import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        email: '',
        cpNo: '',
        username: '',
        password: '',
        retypePassword: ''
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value
        }));

        if (name === 'retypePassword' || name === 'password') {
        const match = name === 'password'
            ? value === formData.retypePassword
            : formData.password === value;
        setPasswordMatch(match);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.retypePassword) {
        setPasswordMatch(false);
        return;
        }
        console.log('Registration form submitted:', formData);
        navigate('/login');
    };

    return (
    <div className="flex flex-col min-h-screen bg-white">
        <div className="flex justify-center items-center flex-grow px-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-center mb-12">REGISTER</h1>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* First row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium uppercase mb-2">LAST NAME</label>
                            <input 
                             type="text" 
                             name="lastName"value={formData.lastName} 
                             onChange={handleChange} 
                             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none" 
                             required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium uppercase mb-2">FIRST NAME</label>
                            <input 
                             type="text"
                             name="firstName" 
                             value={formData.firstName} 
                             onChange={handleChange} 
                             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none" 
                             required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium uppercase mb-2">MIDDLE NAME</label>
                            <input
                             type="text" 
                             name="middleName" 
                             value={formData.middleName} 
                             onChange={handleChange} 
                             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none" 
                            />
                        </div>
                    </div>

                    {/* Second row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium uppercase mb-2">EMAIL</label>
                            <input
                             type="email"
                             name="email"
                             value={formData.email}
                             onChange={handleChange}
                             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                             required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium uppercase mb-2">CP NO.</label>
                            <input
                             type="tel"
                             name="cpNo"
                             value={formData.cpNo}
                             onChange={handleChange}
                             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                             required
                            />
                        </div>
                    </div>

                    {/* Third row */}
                    <div className="grid grid-cols-3 gap-4">
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
                        </div>
                        <div>
                            <label className="block text-sm font-medium uppercase mb-2">RETYPE PASSWORD</label>
                            <input
                             type="password"
                             name="retypePassword"
                             value={formData.retypePassword}
                             onChange={handleChange}
                             className={`w-full px-3 py-2 border ${!passwordMatch ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none`}
                             required
                            />
                            {!passwordMatch && (
                                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                                )}
                        </div>
                    </div>

                    {/* Register button */}
                    <div className="flex justify-center pt-8">
                        <button type="submit" className="w-1/3 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded">
                            REGISTER
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default SignUp;
