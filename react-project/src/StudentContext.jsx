
import { createContext, useReducer } from "react";

export const StudentContext = createContext();

const initialStudents = [
  { id: 101, name: "Sam", course: "CSE-AIML" },
  { id: 102, name: "Rahul", course: "CSE" },
  { id: 103, name: "Priya", course: "IT" }
];

function studentReducer(state, action) {
  switch (action.type) {
    case "ADD_STUDENT":
      return [...state, action.payload];

    case "DELETE_STUDENT":
      return state.filter(
        (student) => student.id !== action.payload
      );

    default:
      return state;
  }
}

export function StudentProvider({ children }) {
  const [students, dispatch] = useReducer(
    studentReducer,
    initialStudents
  );

  return (
    <StudentContext.Provider value={{ students, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
}
