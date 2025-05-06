import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">HotelApp</Link>
        
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">Home</Link>
          <Link to="/rooms" className="text-white hover:text-blue-200">Rooms</Link>
          <Link to="/bookings" className="text-white hover:text-blue-200">Bookings</Link>
          <Link to="/profile" className="text-white hover:text-blue-200">Profile</Link>
          <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
          <Link to="/register" className="text-white hover:text-blue-200">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
