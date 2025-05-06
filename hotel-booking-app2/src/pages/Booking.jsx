import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../URL";

function BookingPage() {
  const { roomId } = useParams();

  const [room, setRoom] = useState({});
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const checkLoginAndFetch = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/check`, {
          credentials: "include",
        });

        if (!res.ok) {
          alert("You must be logged in to book a room.");
          window.location.href = "/login";
          return;
        }

        // Fetch room details if logged in
        const roomRes = await fetch(`${API_BASE}/rooms/${roomId}`);
        const roomData = await roomRes.json();
        setRoom(roomData);
      } catch (err) {
        console.error("Error checking login or fetching room:", err);
        alert("An error occurred.");
      }
    };

    checkLoginAndFetch();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      roomId,
      checkIn,
      checkOut,
      guests,
    };

    try {
      const res = await fetch(`${API_BASE}/bookings/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams(bookingData).toString(),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Booking response:", data);
        const bookingId = data.bookingId;
        window.location.href = `/payment/${bookingId.id}`;
      } else {
        alert("Booking failed, please try again.");
      }
    } catch (err) {
      console.error("Error booking room:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">
          🏨 Book Your Room
        </h1>

        <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {room.name}
          </h2>
          <p className="text-gray-600 mb-2">🏷️ Type: {room.roomType}</p>
          <p className="text-gray-600 mb-2">
            💰 Price: ${room.price} per night
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {room.description || "No description available."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="checkIn" className="block text-gray-700">
              📅 Check-in Date
            </label>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="checkOut" className="block text-gray-700">
              📅 Check-out Date
            </label>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="guests" className="block text-gray-700">
              👥 Number of Guests
            </label>
            <input
              type="number"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              max="10"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Book Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
