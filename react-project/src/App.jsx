
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ textAlign: "center", color: "#222" }}>
        Day 24 - API User Dashboard
      </h1>

      <p style={{ textAlign: "center", color: "#666" }}>
        Users fetched from JSONPlaceholder API
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px"
        }}
      >
        {users.map(user => (
          <div
            key={user.id}
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              backgroundColor: "white",
              boxShadow: "0 3px 8px rgba(0,0,0,0.08)"
            }}
          >
            <h3 style={{ color: "#2563eb" }}>{user.name}</h3>

            <p><strong>Email:</strong> {user.email}</p>

            <p><strong>Phone:</strong> {user.phone}</p>

            <p><strong>Website:</strong> {user.website}</p>

            <p><strong>City:</strong> {user.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
