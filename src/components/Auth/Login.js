import React, { useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../reducers/authReducer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);

  const handleLogin = () => {
    dispatch(loginUser(email, password));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 px-4 py-2 border rounded-lg w-full"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 px-4 py-2 border rounded-lg w-full"
        />
        <button onClick={handleLogin} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
          Login
        </button>
          {/* Display error message if login fails */}
          {error && <p className="text-red-500 mt-4">{error}</p>}

{isAuthenticated && <p className="text-green-500 mt-4">You are logged in!</p>}
      </div>
    </div>
  );
}

export default Login;
