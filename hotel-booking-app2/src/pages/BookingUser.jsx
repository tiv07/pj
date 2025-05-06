import React, { useState, useEffect } from "react";
import { API_BASE } from "../URL";

function UserBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const res = await fetch(`${API_BASE}/bookings/user`, {
          credentials: "include", // Include cookies to check session
        });
        const data = await res.json();

        if (res.ok) {
          setBookings(data);
        } else {
          throw new Error("No bookings found or user not logged in");
        }
      } catch (err) {
        console.error("Error fetching user bookings:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-6">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-red-600 mb-6">{error}</h1>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">
          📅 Your Bookings
        </h1>

        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Booking Details
                </h2>
                <p className="text-gray-600 mb-2">
                  📅 Check-in: {booking.checkInDate}
                </p>
                <p className="text-gray-600 mb-2">
                  📅 Check-out: {booking.checkOutDate}
                </p>
                <div className="text-center mt-4">
                  <a
                    href={`/payment/${booking.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Go to Payment
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              You have no bookings yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserBookingsPage;
