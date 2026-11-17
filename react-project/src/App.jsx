
import { useState, useEffect } from "react";
import useCounter from "./hooks/useCounter";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Custom Hook
  const { count, increment, decrement } = useCounter();

  // Student data from Local Storage
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : [
          { id: 1, name: "Samyuktha", course: "CSE - AIML" },
          { id: 2, name: "Madhusmitha", course: "CSE" },
          { id: 3, name: "Smithaa", course: "IT" },
        ];
  });

  // Runs when the component first loads
  useEffect(() => {
    console.log("Welcome to Student Dashboard!");
  }, []);

  // Saves students whenever the student list changes
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Delete student
  const deleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  return (
    <div className="container">
      <h1>Student Dashboard</h1>

      <p>Total Students: {students.length}</p>

      {/* Custom Hook Counter */}
      <h2>Custom Hook Counter</h2>

      <h3>Count: {count}</h3>

      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>

      <hr />

      {isLoggedIn ? (
        <>
          <h2>Welcome, Samyuktha!</h2>
          <p>You are successfully logged in.</p>

          <button onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>

          <h2>Student List</h2>

          {students.map((student) => (
            <div className="student-card" key={student.id}>
              <div>
                <h3>{student.name}</h3>
                <p>{student.course}</p>
              </div>

              <button onClick={() => deleteStudent(student.id)}>
                Delete
              </button>
            </div>
          ))}

          {students.length === 0 && <p>No students available.</p>}
        </>
      ) : (
        <>
          <h2>Please Login</h2>
          <p>You must log in to view the student dashboard.</p>

          <button onClick={() => setIsLoggedIn(true)}>
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default App;
