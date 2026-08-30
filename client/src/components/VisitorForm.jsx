import { useState } from "react";

function VisitorForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    country: "",
    travelType: "",
    budget: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
          budget: Number(formData.budget),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Visitor added successfully!");

        setFormData({
          name: "",
          age: "",
          country: "",
          travelType: "",
          budget: "",
        });
      } else {
        setMessage(data.message || "Failed to add visitor");
      }
    } catch (error) {
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

        <button type="submit">Add Visitor</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default VisitorForm;