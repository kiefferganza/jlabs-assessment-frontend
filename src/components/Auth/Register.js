import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../reducers/authReducer';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmed_password: '', // Matches the expected property
    user_type: 'Customer', // Default value
  });
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Redirect to home if authenticated
  if (isAuthenticated) {
    navigate('/home');
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!formData.name || !formData.email || !formData.password || !formData.confirmed_password) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (formData.password !== formData.confirmed_password) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Clear previous error messages
    setErrorMessage('');

    // Dispatch registration action
    dispatch(registerUser(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmed_password,
      formData.user_type
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6">Register</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="mt-4 px-4 py-2 border rounded-lg w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mt-4 px-4 py-2 border rounded-lg w-full"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="mt-4 px-4 py-2 border rounded-lg w-full"
          />

          <input
            type="password"
            name="confirmed_password" // Matches expected backend field
            placeholder="Confirm Password"
            value={formData.confirmed_password}
            onChange={handleChange}
            className="mt-4 px-4 py-2 border rounded-lg w-full"
          />

          <select
            name="user_type" // Matches expected backend field
            value={formData.user_type}
            onChange={handleChange}
            className="mt-4 px-4 py-2 border rounded-lg w-full"
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>

          <button type="submit" className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
            Register
          </button>
        </form>

        {/* Display error message if there are validation errors */}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

        {/* Display API error message if registration fails */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
