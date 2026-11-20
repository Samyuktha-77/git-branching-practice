
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  NavLink
} from "react-router-dom";

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

function Students() {
  return (
    <div>
      <h2>Students Page 👩‍🎓</h2>
      <p>Welcome to the Students section.</p>

      <ul>
        <li>
          <Link to="/students/101">Student 101</Link>
        </li>
        <li>
          <Link to="/students/102">Student 102</Link>
        </li>
        <li>
          <Link to="/students/103">Student 103</Link>
        </li>
      </ul>
    </div>
  );
}

function StudentDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Student Details 📚</h2>
      <p>Student ID: {id}</p>
      <Link to="/students">Back to Students</Link>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About Our Application ℹ️</h2>
      <p>This application is built using React Router.</p>
    </div>
  );
}

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

function App() {
  const navStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "blue" : "black",
    fontWeight: isActive ? "bold" : "normal"
  });

  return (
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
  );
}

export default App;
