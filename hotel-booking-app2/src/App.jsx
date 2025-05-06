import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import RoomList from "./pages/RoomList";
import Booking from "./pages/Booking";
import PaymentPage from "./pages/Payment";
import Navbar from "./components/Navbar";
import UserBookingsPage from "./pages/BookingUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/bookings/:roomId" element={<Booking />} />
        <Route path="/bookings" element={<UserBookingsPage />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
