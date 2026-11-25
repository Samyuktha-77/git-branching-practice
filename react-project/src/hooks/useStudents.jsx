import { useContext } from "react";
import { StudentContext } from "../StudentContext";

function useStudents() {
  const { students, dispatch } = useContext(StudentContext);

  const addStudent = (student) => {
    dispatch({
      type: "ADD_STUDENT",
      payload: student
    });
  };

  const deleteStudent = (id) => {
    dispatch({
      type: "DELETE_STUDENT",
      payload: id
    });
  };

  const updateStudent = (student) => {
    dispatch({
      type: "UPDATE_STUDENT",
      payload: student
    });
  };

  return {
    students,
    addStudent,
    deleteStudent,
    updateStudent
  };
}

export default useStudents;