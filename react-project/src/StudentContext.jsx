
import { createContext, useState } from "react";

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([
    { id: 101, name: "Sam", course: "CSE-AIML" },
    { id: 102, name: "Rahul", course: "CSE" },
    { id: 103, name: "Priya", course: "IT" }
  ]);

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
}
