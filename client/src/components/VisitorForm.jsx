import { useEffect, useState } from "react";

function VisitorForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    country: "",
    travelType: "",
    budget: "",
    destination: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [message, setMessage] = useState("");

  // Get destinations from backend
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/destinations"
        );

        const data = await response.json();

        if (response.ok) {
          setDestinations(data);
        }
      } catch (error) {
        console.error("Failed to fetch destinations", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get JWT token
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login first");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/visitors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            age: Number(formData.age),
            country: formData.country,
            travelType: formData.travelType,
            budget: Number(formData.budget),
            destination: formData.destination,
          }),
        }
      );

      const data = await response.json();

      console.log("Server response:", data);

      if (response.ok) {
        setMessage("Visitor added successfully!");

        setFormData({
          name: "",
          age: "",
          country: "",
          travelType: "",
          budget: "",
          destination: "",
        });
      } else {
        setMessage(data.message || "Failed to create visitor");
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to the server");
    }
  };

  return (
    <div>
      <h2>Add Visitor</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="travelType"
          placeholder="Travel Type"
          value={formData.travelType}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          required
        />

        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        >
          <option value="">Select Destination</option>

          {destinations.map((destination) => (
            <option
              key={destination._id}
              value={destination._id}
            >
              {destination.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button type="submit">
          Add Visitor
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default VisitorForm;