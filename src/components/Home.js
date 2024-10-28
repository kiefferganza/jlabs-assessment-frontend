import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authReducer';
import UserLocationMap from './UserLocationMap';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [location, setLocation] = useState([51.505, -0.09]); // Default location
  const [mapError, setMapError] = useState(null);

  // Fetch user's current IP location
  const fetchLocation = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      console.log(data);
      setLocation([data.latitude, data.longitude]);
    } catch (error) {
      setMapError('Could not fetch location');
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // You could send an API request here to update the user's profile in the database
    alert('Profile updated!');
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Welcome, {name}</h1>
      
      <form onSubmit={handleProfileUpdate} className="mb-4">
        <div>
          <label className="block text-sm font-medium">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-lg"
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Update Profile
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6">Your Location:</h2>
      {mapError ? (
        <p className="text-red-500">{mapError}</p>
      ) : (
        <UserLocationMap location={location} error={mapError} />
      )}

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
