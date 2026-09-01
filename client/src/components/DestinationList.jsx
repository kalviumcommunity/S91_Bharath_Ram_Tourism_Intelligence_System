import { useEffect, useState } from "react";

function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    location: "",
    category: "",
    description: "",
  });

  // Get all destinations
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
      console.error("Failed to fetch destinations:", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Start editing
  const handleEdit = (destination) => {
    setEditingId(destination._id);

    setEditData({
      name: destination.name,
      location: destination.location,
      category: destination.category,
      description: destination.description,
    });
  };

  // Handle input changes
  const handleChange = (event) => {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value,
    });
  };

  // Update destination
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/destinations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Destination updated successfully!");

        setEditingId(null);

        fetchDestinations();
      } else {
        alert(data.message || "Failed to update destination");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Unable to connect to server");
    }
  };

  // Delete destination
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/destinations/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Destination deleted successfully!");

        fetchDestinations();
      } else {
        alert(data.message || "Failed to delete destination");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div>
      <h2>Destinations</h2>

      {destinations.length === 0 ? (
        <p>No destinations available.</p>
      ) : (
        destinations.map((destination) => (
          <div key={destination._id}>
            {editingId === destination._id ? (
              <div>
                <h3>Edit Destination</h3>

                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  placeholder="Destination name"
                />

                <input
                  type="text"
                  name="location"
                  value={editData.location}
                  onChange={handleChange}
                  placeholder="Location"
                />

                <input
                  type="text"
                  name="category"
                  value={editData.category}
                  onChange={handleChange}
                  placeholder="Category"
                />

                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  placeholder="Description"
                />

                <button
                  onClick={() => handleUpdate(destination._id)}
                >
                  Save Changes
                </button>

                <button onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h3>{destination.name}</h3>

                <p>
                  <strong>Location:</strong>{" "}
                  {destination.location}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {destination.category}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {destination.description}
                </p>

                <button
                  onClick={() => handleEdit(destination)}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(destination._id)
                  }
                >
                  Delete
                </button>

                <hr />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default DestinationList;