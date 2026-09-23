import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { TRAVEL_TYPES } from "../constants";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EMPTY_FORM = {
  name: "",
  age: "",
  country: "",
  travelType: "",
  budget: "",
  destination: "",
};

function VisitorForm({ onCreated }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [destinations, setDestinations] = useState([]);
  const [destStatus, setDestStatus] = useState("loading"); // loading | ready | error
  const [message, setMessage] = useState({ text: "", error: false });
  const [loading, setLoading] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${API_URL}/api/destinations`, {
          signal: controller.signal,
        });
        const data = await response.json().catch(() => null);

        if (response.ok && Array.isArray(data)) {
          setDestinations(data);
          setDestStatus("ready");
        } else {
          setDestStatus("error");
        }
      } catch (error) {
        if (error.name !== "AbortError") setDestStatus("error");
      }
    };

    fetchDestinations();
    return () => controller.abort();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", error: false });

    if (!token) {
      setMessage({ text: "Please log in first.", error: true });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/visitors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
          budget: Number(formData.budget),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      if (response.ok) {
        setMessage({ text: "Visitor added successfully!", error: false });
        setFormData(EMPTY_FORM);
        onCreated?.();
      } else {
        setMessage({
          text: data.message || "Failed to create visitor.",
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
      <h2>Add Visitor</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            name="age"
            min="0"
            max="120"
            step="1"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="travelType">Travel type</label>
          <select
            id="travelType"
            name="travelType"
            value={formData.travelType}
            onChange={handleChange}
            required
          >
            <option value="">Select travel type</option>
            {TRAVEL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget">Budget</label>
          <input
            id="budget"
            type="number"
            name="budget"
            min="0"
            step="any"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="destination">Destination</label>
          <select
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            disabled={destStatus !== "ready"}
          >
            <option value="">
              {destStatus === "loading" && "Loading destinations..."}
              {destStatus === "error" && "Could not load destinations"}
              {destStatus === "ready" && "Select destination"}
            </option>
            {destinations.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading || destStatus !== "ready"}>
          {loading ? "Adding..." : "Add Visitor"}
        </button>
      </form>

      {message.text && (
        <p role={message.error ? "alert" : "status"}>{message.text}</p>
      )}
    </div>
  );
}

export default VisitorForm;
