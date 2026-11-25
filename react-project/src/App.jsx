
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate
} from "react-router-dom";

import { useContext, useState } from "react";
import {
  StudentProvider,
  StudentContext
} from "./StudentContext";

import {
  ThemeProvider,
  useTheme
} from "./ThemeContext";

import useStudents from "./hooks/useStudents";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  course: "B.Tech",
  specialization: "",
  year: "3rd Year",
  semester: "5",
  enrollmentDate: "",
  status: "Active"
};

/* =====================================
   NAVBAR
===================================== */

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">🎓</span>
        <span>EduManage</span>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Dashboard
        </NavLink>

        <NavLink to="/students" onClick={closeMenu}>
          Students
        </NavLink>

        <NavLink to="/student-details" onClick={closeMenu}>
          Student Details
        </NavLink>
      </div>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle appearance"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
}

/* =====================================
   DASHBOARD
===================================== */

function Home() {
  const { students } = useContext(StudentContext);
  const navigate = useNavigate();

  const courses = [...new Set(students.map((s) => s.course))];

  const activeStudents = students.filter(
    (s) => s.status === "Active"
  ).length;

  const inactiveStudents = students.length - activeStudents;

  return (
    <main className="container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="subtitle">
            Welcome back! Here's your student management overview.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/students")}
        >
          + Add Student
        </button>
      </div>

      <section className="stats-grid">
        <div className="stat-card blue-card">
          <div className="stat-icon">👨‍🎓</div>
          <p>Total Students</p>
          <h2>{students.length}</h2>
          <span>Registered students</span>
        </div>

        <div className="stat-card purple-card">
          <div className="stat-icon">📚</div>
          <p>Total Courses</p>
          <h2>{courses.length}</h2>
          <span>Unique courses</span>
        </div>

        <div className="stat-card green-card">
          <div className="stat-icon">✅</div>
          <p>Active Students</p>
          <h2>{activeStudents}</h2>
          <span>Currently active</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏸️</div>
          <p>Inactive Students</p>
          <h2>{inactiveStudents}</h2>
          <span>Inactive records</span>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Recent Students</h2>
            <p className="subtitle">Your registered students</p>
          </div>

          <button
            className="secondary-btn"
            onClick={() => navigate("/students")}
          >
            View All
          </button>
        </div>

        {students.length === 0 ? (
          <p className="empty-state">No students added yet.</p>
        ) : (
          <div className="student-grid">
            {students.slice(0, 3).map((student) => (
              <StudentCard
                key={student.id}
                student={student}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* =====================================
   STUDENT CARD
===================================== */

function StudentCard({ student, onDelete, onEdit }) {
  const initial = student.name.charAt(0).toUpperCase();

  return (
    <div className="student-card">
      <div className="student-avatar">{initial}</div>

      <div className="student-info">
        <h3>{student.name}</h3>
        <p>{student.id}</p>
        <p>{student.specialization}</p>
        <p>{student.email}</p>
        <p>{student.year} | Semester {student.semester}</p>

        <span
          className={
            student.status === "Active"
              ? "student-status"
              : "student-status inactive-status"
          }
        >
          ● {student.status}
        </span>
      </div>

      <div className="student-actions">
        {onEdit && (
          <button
            className="secondary-btn"
            onClick={() => onEdit(student)}
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            className="delete-btn"
            onClick={() => onDelete(student.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

/* =====================================
   STUDENTS MANAGEMENT
===================================== */

function Students() {
  const {
    students,
    addStudent,
    deleteStudent,
    updateStudent
  } = useStudents();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.specialization.trim() ||
      !form.enrollmentDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (editingId) {
      updateStudent({
        ...form,
        id: editingId
      });

      alert("Student details updated successfully!");
      setEditingId(null);
    } else {
      const newStudent = {
        ...form,
        id: `STU${Date.now()}`
      };

      addStudent(newStudent);
      alert("Student added successfully!");
    }

    setForm(emptyForm);
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email || "",
      phone: student.phone || "",
      course: student.course || "B.Tech",
      specialization: student.specialization || "",
      year: student.year || "3rd Year",
      semester: student.semester || "5",
      enrollmentDate: student.enrollmentDate || "",
      status: student.status || "Active"
    });

    setEditingId(student.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this student?"
      )
    ) {
      deleteStudent(id);
    }
  };

  const cancelEdit = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      String(student.id).toLowerCase().includes(searchText) ||
      (student.email || "").toLowerCase().includes(searchText);

    const matchesCourse =
      courseFilter === "All" ||
      student.course === courseFilter;

    const matchesYear =
      yearFilter === "All" ||
      student.year === yearFilter;

    const matchesStatus =
      statusFilter === "All" ||
      student.status === statusFilter;

    return (
      matchesSearch &&
      matchesCourse &&
      matchesYear &&
      matchesStatus
    );
  });

  const uniqueCourses = [
    ...new Set(students.map((s) => s.course))
  ];

  return (
    <main className="container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MANAGEMENT</p>
          <h1>Students</h1>
          <p className="subtitle">
            Add, edit, search and manage student records.
          </p>
        </div>
      </div>

      <section className="panel form-panel">
        <h2>
          {editingId ? "Edit Student" : "Add New Student"}
        </h2>

        <p className="subtitle">
          Enter the student's complete information below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="student-form"
        >
          <div className="form-group">
            <label>Full Name *</label>
            <input
              name="name"
              type="text"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              name="email"
              type="email"
              placeholder="student@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              name="phone"
              type="tel"
              placeholder="10-digit phone number"
              value={form.phone}
              onChange={handleChange}
              maxLength="10"
              required
            />
          </div>

          <div className="form-group">
            <label>Course *</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
            >
              <option>B.Tech</option>
              <option>M.Tech</option>
              <option>BCA</option>
              <option>MCA</option>
              <option>BBA</option>
              <option>MBA</option>
            </select>
          </div>

          <div className="form-group">
            <label>Specialization *</label>
            <input
              name="specialization"
              type="text"
              placeholder="Example: CSE-AIML"
              value={form.specialization}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Academic Year *</label>
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
            >
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label>Semester *</label>
            <select
              name="semester"
              value={form.semester}
              onChange={handleChange}
            >
              {["1", "2", "3", "4", "5", "6", "7", "8"].map(
                (semester) => (
                  <option key={semester} value={semester}>
                    Semester {semester}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Enrollment Date *</label>
            <input
              name="enrollmentDate"
              type="date"
              value={form.enrollmentDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="primary-btn"
            >
              {editingId ? "Update Student" : "+ Add Student"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Student Directory</h2>
            <p className="subtitle">
              {filteredStudents.length} student(s) found
            </p>
          </div>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search by name, student ID or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-row">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="All">All Courses</option>

            {uniqueCourses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="All">All Years</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {filteredStudents.length === 0 ? (
          <p className="empty-state">
            No students found. Try changing your filters.
          </p>
        ) : (
          <div className="student-grid">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* =====================================
   STUDENT DETAILS
===================================== */

function StudentDetails() {
  const { students } = useContext(StudentContext);
  const navigate = useNavigate();

  return (
    <main className="container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">RECORDS</p>
          <h1>Student Details</h1>
          <p className="subtitle">
            Complete information about registered students.
          </p>
        </div>
      </div>

      {students.length === 0 ? (
        <section className="panel">
          <p className="empty-state">
            No student records available.
          </p>
        </section>
      ) : (
        <div className="details-grid">
          {students.map((student) => (
            <section
              className="panel detail-card"
              key={student.id}
            >
              <div className="detail-heading">
                <div className="student-avatar">
                  {student.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2>{student.name}</h2>
                  <p>{student.id}</p>
                </div>
              </div>

              <div className="detail-list">
                <p>
                  <strong>Email:</strong>
                  {student.email || "Not provided"}
                </p>

                <p>
                  <strong>Phone:</strong>
                  {student.phone || "Not provided"}
                </p>

                <p>
                  <strong>Course:</strong>
                  {student.course}
                </p>

                <p>
                  <strong>Specialization:</strong>
                  {student.specialization || "Not provided"}
                </p>

                <p>
                  <strong>Year:</strong>
                  {student.year || "Not provided"}
                </p>

                <p>
                  <strong>Semester:</strong>
                  {student.semester || "Not provided"}
                </p>

                <p>
                  <strong>Enrollment Date:</strong>
                  {student.enrollmentDate || "Not provided"}
                </p>

                <p>
                  <strong>Status:</strong>
                  {student.status || "Not provided"}
                </p>
              </div>
            </section>
          ))}
        </div>
      )}

      <button
        className="primary-btn back-btn"
        onClick={() => navigate("/students")}
      >
        Back to Students
      </button>
    </main>
  );
}

/* =====================================
   NOT FOUND PAGE
===================================== */

function NotFound() {
  return (
    <main className="container">
      <section className="panel not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <NavLink to="/">
          Return to Dashboard
        </NavLink>
      </section>
    </main>
  );
}

/* =====================================
   MAIN APP
===================================== */

function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <BrowserRouter>
          <div className="app">
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/students"
                element={<Students />}
              />

              <Route
                path="/student-details"
                element={<StudentDetails />}
              />

              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>

            <footer className="footer">
              <p>
                © 2026 EduManage | Student Management System
              </p>

              <p>Built with React ❤️</p>
            </footer>
          </div>
        </BrowserRouter>
      </StudentProvider>
    </ThemeProvider>
  );
}

export default App;
