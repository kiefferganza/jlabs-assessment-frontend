import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Welcome to the Home Page</h2>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
        Logout
      </button>
    </div>
  );
}

export default Home;
