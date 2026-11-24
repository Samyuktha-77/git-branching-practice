
import { useContext } from "react";
import { StudentContext } from "../StudentContext";

function useStudents() {
  const { students, setStudents } = useContext(StudentContext);

  const addStudent = (student) => {
    setStudents((prevStudents) => [...prevStudents, student]);
  };

  const deleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  return {
    students,
    addStudent,
    deleteStudent
  };
}

export default useStudents;
