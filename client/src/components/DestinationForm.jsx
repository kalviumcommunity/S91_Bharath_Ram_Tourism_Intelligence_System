import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { CATEGORIES } from "../constants";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EMPTY_FORM = { name: "", location: "", category: "", description: "" };

function DestinationForm({ onCreated }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [message, setMessage] = useState({ text: "", error: false });
  const [loading, setLoading] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", error: false });
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/destinations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      if (response.ok) {
        setMessage({ text: "Destination added successfully!", error: false });
        setFormData(EMPTY_FORM);
        onCreated?.();
      } else {
        setMessage({
          text: data.message || "Failed to add destination.",
          error: true,
        });
      }
    } catch (error) {
      setMessage({ text: "Unable to connect to the server.", error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Add a Destination</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dest-name">Destination name</label>
          <input
            id="dest-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dest-location">Location</label>
          <input
            id="dest-location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dest-category">Category</label>
          <select
            id="dest-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dest-description">Description</label>
          <textarea
            id="dest-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Destination"}
        </button>
      </form>

      {message.text && (
        <p role={message.error ? "alert" : "status"}>{message.text}</p>
      )}
    </div>
  );
}

export default DestinationForm;
