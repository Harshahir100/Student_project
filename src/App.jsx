import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import studentsData from "./data/students.json";
import ConfirmDialog from "./components/ConfirmDialog";

function App() {

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : studentsData;
  });

  const [loading, setLoading] = useState(true);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []);

  // Save data to LocalStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add Student
  const addStudent = (student) => {

    const newId =
      students.length > 0
        ? students[students.length - 1].id + 1
        : 1;

    setStudents([...students, { ...student, id: newId }]);
  };

  // Update Student
  const updateStudent = (student) => {

    setStudents(
      students.map((s) =>
        s.id === student.id ? student : s
      )
    );

    setEditStudent(null);

  };

  const confirmDelete = (id) => {
  setDeleteId(id);
};

const handleDelete = () => {
  setStudents(students.filter((s) => s.id !== deleteId));
  setDeleteId(null);
};

  // Delete Student
  const deleteStudent = (id) => {

    if (window.confirm("Delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }

  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading Students...</p>
      </div>
    );
  }

return (
  <div className="container">

    <h1>Students Table</h1>

    <StudentForm
      addStudent={addStudent}
      updateStudent={updateStudent}
      editStudent={editStudent}
    />

    <StudentTable
      students={students}
      deleteStudent={confirmDelete}
      setEditStudent={setEditStudent}
    />

    {deleteId && (
      <ConfirmDialog
        message="Are you sure you want to delete this student?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    )}

  </div>
);
}

export default App;