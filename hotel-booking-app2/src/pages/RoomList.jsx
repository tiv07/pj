import React, { useEffect, useState } from "react";
import { API_BASE } from "../URL";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${API_BASE}/rooms`);
        const text = await res.text();

        console.log("Raw response text:", text);

        const data = text ? JSON.parse(text) : [];

        setRooms(data);
        setFilteredRooms(data);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    const filtered = rooms.filter((room) =>
      room.name.toLowerCase().includes(keyword)
    );

    setFilteredRooms(filtered);
  };

  // Navigate to the booking page for a specific room
  const handleBookRoom = (roomId) => {
    window.location.href = `/bookings/${roomId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">
          🏨 Room Listings
        </h1>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="🔍 Search by room name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
        </div>

        {/* Loading & No Rooms Found Message */}
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading rooms...
          </p>
        ) : filteredRooms.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold">
            No rooms found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {room.name}
                </h2>
                <p className="text-gray-600 mb-2">🏷️ Type: {room.roomType}</p>
                <p className="text-gray-600 mb-2">💰 Price: ${room.price}</p>
                <p className="text-sm text-gray-500 mt-4">
                  {room.description || "No description available."}
                </p>

                {/* Available Badge */}
                <div
                  className={`mt-4 px-4 py-1 rounded-full text-white ${
                    room.available ? "bg-green-500" : "bg-red-500"
                  } inline-block`}
                >
                  {room.available ? "Available" : "Not Available"}
                </div>

                {/* Book Now Button */}
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => handleBookRoom(room.id)}
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomList;
