import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';

function App() {
  // Access the isAuthenticated state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />

        {/* Protected Route */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

        {/* Redirect unknown routes to Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
