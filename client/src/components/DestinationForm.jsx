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
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleGenerateDescription = async () => {
  setMessage({ text: "", error: false });

  if (
    !formData.name.trim() ||
    !formData.location.trim() ||
    !formData.category
  ) {
    setMessage({
      text: "Enter the destination name, location, and category first.",
      error: true,
    });
    return;
  }

  setAiLoading(true);

  try {
    const response = await fetch(
      `${API_URL}/api/ai/destination-description`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          category: formData.category,
        }),
      }
    );

const contentType = response.headers.get("content-type") || "";

if (!contentType.includes("application/json")) {
  const responseText = await response.text();

  console.error("Expected JSON but received:", responseText.slice(0, 300));

  throw new Error(
    "The server returned HTML instead of JSON. Check your backend URL and Render deployment."
  );
}

const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message || "Unable to generate a description."
      );
    }

    setFormData((prev) => ({
      ...prev,
      description: data.description,
    }));

    setMessage({
      text: "Description generated successfully!",
      error: false,
    });
  } catch (error) {
    setMessage({
      text: error.message || "Unable to connect to the AI service.",
      error: true,
    });
  } finally {
    setAiLoading(false);
  }
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

  <button
    type="button"
    onClick={handleGenerateDescription}
    disabled={aiLoading || loading}
  >
    {aiLoading ? "Generating..." : "✨ Generate with AI"}
  </button>

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
