import React, { useEffect, useState } from "react";
import { API_BASE } from "../URL";

function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setUser(data);
        setForm({ username: data.username, email: data.email, password: "" });
      } catch (err) {
        setMessage("⚠️ " + err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("Profile updated successfully");
        setEditMode(false);
        const updated = await res.json();
        setUser(updated);
      } else {
        const err = await res.text();
        throw new Error(err);
      }
    } catch (err) {
      setMessage("" + err.message);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSave}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg transition duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Profile Settings
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-600">{message}</div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full px-4 py-2 border rounded-lg ${
              editMode
                ? "border-gray-300 bg-white"
                : "bg-gray-100 border-transparent"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full px-4 py-2 border rounded-lg ${
              editMode
                ? "border-gray-300 bg-white"
                : "bg-gray-100 border-transparent"
            }`}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full px-4 py-2 border rounded-lg ${
              editMode
                ? "border-gray-300 bg-white"
                : "bg-gray-100 border-transparent"
            }`}
            placeholder={editMode ? "Enter new password" : "********"}
          />
        </div>

        {editMode ? (
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="text-gray-600 hover:text-red-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg w-full hover:bg-green-700"
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}

export default Profile;
