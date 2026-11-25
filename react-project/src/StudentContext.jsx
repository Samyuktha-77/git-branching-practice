
import {
  createContext,
  useReducer,
  useEffect
} from "react";

export const StudentContext = createContext();

const initialStudents = [
  {
    id: "STU001",
    name: "Samyuktha Padma",
    email: "sam@example.com",
    phone: "9876543210",
    course: "B.Tech",
    specialization: "CSE-AIML",
    year: "3rd Year",
    semester: "5",
    enrollmentDate: "2024-08-01",
    status: "Active"
  },
  {
    id: "STU002",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "9876543211",
    course: "B.Tech",
    specialization: "CSE",
    year: "2nd Year",
    semester: "3",
    enrollmentDate: "2025-08-01",
    status: "Active"
  },
  {
    id: "STU003",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543212",
    course: "B.Tech",
    specialization: "IT",
    year: "3rd Year",
    semester: "5",
    enrollmentDate: "2024-08-01",
    status: "Inactive"
  }
];

function studentReducer(state, action) {
  switch (action.type) {
    case "ADD_STUDENT":
      return [...state, action.payload];

    case "DELETE_STUDENT":
      return state.filter(
        (student) => student.id !== action.payload
      );

    case "UPDATE_STUDENT":
      return state.map((student) =>
        student.id === action.payload.id
          ? action.payload
          : student
      );

    default:
      return state;
  }
}

function getInitialStudents() {
  try {
    const savedStudents = localStorage.getItem("edumanage_students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : initialStudents;
  } catch {
    return initialStudents;
  }
}

export function StudentProvider({ children }) {
  const [students, dispatch] = useReducer(
    studentReducer,
    undefined,
    getInitialStudents
  );

  useEffect(() => {
    localStorage.setItem(
      "edumanage_students",
      JSON.stringify(students)
    );
  }, [students]);

  return (
    <StudentContext.Provider value={{ students, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
}
