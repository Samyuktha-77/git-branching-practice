
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  NavLink
} from "react-router-dom";

import { useContext } from "react";
import {
  StudentProvider,
  StudentContext
} from "./StudentContext";

// Home Page
function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to Student Management System 🏠</h2>
      <p>This is the Home Page.</p>

      <button onClick={() => navigate("/students")}>
        View Students
      </button>
    </div>
  );
}

// Students Page
function Students() {
  const { students } = useContext(StudentContext);

  return (
    <div>
      <h2>Students Page 👩‍🎓</h2>
      <p>Welcome to the Students section.</p>

      <h3>Student List</h3>

      {students.map((student) => (
        <div key={student.id}>
          <Link to={`/students/${student.id}`}>
            {student.name} - {student.course}
          </Link>
        </div>
      ))}
    </div>
  );
}

// Student Details Page
function StudentDetails() {
  const { id } = useParams();
  const { students } = useContext(StudentContext);

  const student = students.find(
    (item) => item.id === Number(id)
  );

  return (
    <div>
      <h2>Student Details 📚</h2>

      {student ? (
        <>
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
        </>
      ) : (
        <p>Student not found.</p>
      )}

      <Link to="/students">Back to Students</Link>
    </div>
  );
}

// About Page
function About() {
  return (
    <div>
      <h2>About Our Application ℹ️</h2>
      <p>This application uses React Router and Context API.</p>
    </div>
  );
}

// 404 Page
function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>404 - Page Not Found ❌</h2>
      <p>Sorry! The page you are looking for does not exist.</p>

      <button onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
}

// Main App
function App() {
  const navStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "blue" : "black",
    fontWeight: isActive ? "bold" : "normal"
  });

  return (
    <StudentProvider>
      <BrowserRouter>
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
          <h1>My Student App 🎓</h1>

          <nav style={{ display: "flex", gap: "20px" }}>
            <NavLink to="/" style={navStyle}>
              Home
            </NavLink>

            <NavLink to="/students" style={navStyle}>
              Students
            </NavLink>

            <NavLink to="/about" style={navStyle}>
              About
            </NavLink>
          </nav>

          <hr />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
