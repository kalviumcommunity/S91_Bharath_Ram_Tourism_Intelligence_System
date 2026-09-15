import { useEffect, useState } from "react";

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        // Get JWT token from browser
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/visitors",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message);
          return;
        }

        setVisitors(data);
      } catch (error) {
        setMessage("Failed to fetch visitors");
      }
    };

    fetchVisitors();
  }, []);

  return (
    <div>
      <h1>Visitors Page</h1>

      {message && <p>{message}</p>}

      <h2>Visitors</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
          </tr>
        </thead>

        <tbody>
          {/* Existing sample visitors */}
          <tr>
            <td>John</td>
            <td>USA</td>
          </tr>

          <tr>
            <td>Arun</td>
            <td>India</td>
          </tr>

          {/* Visitors from MongoDB */}
          {visitors.map((visitor) => (
            <tr key={visitor._id}>
              <td>{visitor.name}</td>
              <td>{visitor.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Visitors;