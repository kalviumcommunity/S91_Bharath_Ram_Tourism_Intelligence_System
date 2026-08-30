import { useState } from "react";

function DestinationForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Destination added successfully!");

        // Clear the form after successful submission
        setFormData({
          name: "",
          location: "",
          category: "",
          description: "",
        });
      } else {
        setMessage(data.message || "Failed to add destination.");
      }
    } catch (error) {
      setMessage("Unable to connect to the server.");
    }
  };

  return (
    <div>
      <h2>Add a Destination</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Destination Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Location:</label>
          <br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Category:</label>
          <br />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Description:</label>
          <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">Add Destination</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default DestinationForm;