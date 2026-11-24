
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate
} from "react-router-dom";

import { StudentProvider, StudentContext } from "./StudentContext";
import { useContext, useState } from "react";
import useStudents from "./hooks/useStudents";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Student Management System</h1>
      <p>Welcome to the Student Management Application!</p>

      <button onClick={() => navigate("/students")}>
        View Students
      </button>
    </div>
  );
}

function Students() {
  const { students, addStudent, deleteStudent } = useStudents();

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const handleAddStudent = () => {
    if (name.trim() === "" || course.trim() === "") {
      alert("Please enter student name and course");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      course: course.trim()
    };

    addStudent(newStudent);

    setName("");
    setCourse("");
  };

  return (
    <div>
      <h2>Student List</h2>

      <h3>Add New Student</h3>

      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAddStudent}>
        Add Student
      </button>

      <hr />

      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <p>Course: {student.course}</p>

          <button onClick={() => deleteStudent(student.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

function StudentDetails() {
  const { students } = useContext(StudentContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Student Details</h2>

      {students.map((student) => (
        <div key={student.id}>
          <p>
            {student.name} - {student.course}
          </p>
        </div>
      ))}

      <button onClick={() => navigate("/students")}>
        Back to Students
      </button>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <NavLink to="/">Go Home</NavLink>
    </div>
  );
}

function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>{" | "}
          <NavLink to="/students">Students</NavLink>{" | "}
          <NavLink to="/student-details">Student Details</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
