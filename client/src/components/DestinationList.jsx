import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { CATEGORIES } from "../constants";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EMPTY_FORM = { name: "", location: "", category: "", description: "" };

function DestinationList({ refreshKey }) {
  const [destinations, setDestinations] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [message, setMessage] = useState({ text: "", error: false });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(EMPTY_FORM);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const response = await fetch(`${API_URL}/api/destinations`, {
          signal: controller.signal,
        });
        const data = await response.json().catch(() => null);

        if (response.ok && Array.isArray(data)) {
          setDestinations(data);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      } catch (error) {
        if (error.name !== "AbortError") setStatus("error");
      }
    };

    load();
    return () => controller.abort();
  }, [refreshKey]);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleEdit = (d) => {
    setEditingId(d._id);
    setEditData({
      name: d.name,
      location: d.location,
      category: d.category,
      description: d.description,
    });
    setMessage({ text: "", error: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/destinations/${id}`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(editData),
      });
      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      if (response.ok) {
        // Use the server's document if it returns one, otherwise merge locally
        setDestinations((prev) =>
          prev.map((d) =>
            d._id === id ? (data && data._id ? data : { ...d, ...editData }) : d
          )
        );
        setEditingId(null);
        setMessage({ text: "Destination updated.", error: false });
      } else {
        setMessage({
          text: data.message || "Failed to update destination.",
          error: true,
        });
      }
    } catch (error) {
      setMessage({ text: "Unable to connect to the server.", error: true });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/destinations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      if (response.ok) {
        setDestinations((prev) => prev.filter((d) => d._id !== id));
        setMessage({ text: "Destination deleted.", error: false });
      } else {
        setMessage({
          text: data.message || "Failed to delete destination.",
          error: true,
        });
      }
    } catch (error) {
      setMessage({ text: "Unable to connect to the server.", error: true });
    }
  };

  return (
    <div>
      <h2>All destinations</h2>

      {message.text && (
        <p role={message.error ? "alert" : "status"}>{message.text}</p>
      )}

      {status === "loading" && <p>Loading destinations...</p>}
      {status === "error" && (
        <p role="alert">Could not load destinations.</p>
      )}
      {status === "ready" && destinations.length === 0 && (
        <p>No destinations available.</p>
      )}

      <div className="card-grid">
        {destinations.map((d) =>
          editingId === d._id ? (
            <form
              key={d._id}
              className="card"
              onSubmit={(e) => handleUpdate(e, d._id)}
            >
              <h3>Edit destination</h3>

              <input
                type="text"
                name="name"
                aria-label="Destination name"
                value={editData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="location"
                aria-label="Location"
                value={editData.location}
                onChange={handleChange}
                required
              />

              <select
                name="category"
                aria-label="Category"
                value={editData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {editData.category && !CATEGORIES.includes(editData.category) && (
                  <option value={editData.category}>{editData.category}</option>
                )}
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                aria-label="Description"
                value={editData.description}
                onChange={handleChange}
                required
              />

              <div className="actions">
                <button type="submit">Save changes</button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div key={d._id} className="card">
              <h3>{d.name}</h3>
              <span className="badge">{d.category}</span>
              <p>
                <strong>Location:</strong> {d.location}
              </p>
              <p>{d.description}</p>

              {token && (
                <div className="actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => handleDelete(d._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default DestinationList;
