import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../URL";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // เรียกข้อมูลผู้ใช้จาก backend
    fetch(`${API_BASE}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => navigate("/login")); // redirect ถ้ายังไม่ได้ login
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">
          Welcome to Hotel
        </h1>
        {user ? (
          <>
            <p className="text-lg mb-6">
              Hello, <span className="font-semibold">{user.username}</span> 👋
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-500">Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
