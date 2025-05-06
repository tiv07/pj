import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { API_BASE } from "../URL";

function PaymentPage() {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState({});
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [roomDetails, setRoomDetails] = useState({});

  useEffect(() => {
    // Fetch booking details by bookingId
    const fetchBookingDetails = async () => {
      try {
        const res = await fetch(`${API_BASE}/bookings/${bookingId}`);
        const data = await res.json();
        console.log("Booking details:", data);
        setBookingDetails(data);

        const roomRes = await fetch(`${API_BASE}/rooms/${data.roomId}`);
        const roomData = await roomRes.json();
        console.log("Room details:", roomData);
        setRoomDetails(roomData);
      } catch (err) {
        console.error("Failed to fetch booking details:", err);
        alert("Error fetching booking details.");
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  const handleSlipUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("slip", paymentSlip);

    try {
      const res = await fetch(`${API_BASE}/payments/uploadSlip/${bookingId}`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Payment slip uploaded successfully!");
      } else {
        alert("Failed to upload payment slip.");
      }
    } catch (err) {
      console.error("Error uploading payment slip:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800 shadow-md p-4 rounded-md">
          💳 Payment for Booking
        </h1>

        <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Booking Details
          </h2>
          <p className="text-gray-600 mb-2">🏷️ Room: {roomDetails.hotelId}</p>
          <p className="text-gray-600 mb-2">
            📅 Check-in: {bookingDetails.checkInDate}
          </p>
          <p className="text-gray-600 mb-2">
            📅 Check-out: {bookingDetails.checkOutDate}
          </p>
          <p className="text-gray-600 mb-2">
            💰 Total Price: ${roomDetails.price}
          </p>
        </div>

        <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            QR Code for Payment
          </h3>
          <div className="flex justify-center mb-4">
            <QRCode value={`payment://payment/${bookingId}`} size={256} />
          </div>
          <p className="text-gray-600 text-center mb-4">
            Scan the QR code above to complete the payment.
          </p>
        </div>

        <form
          onSubmit={handleSlipUpload}
          className="bg-white border border-gray-100 shadow-lg rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Upload Payment Slip
          </h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPaymentSlip(e.target.files[0])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
            required
          />
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md transform hover:scale-105"
            >
              Upload Slip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
