import { useState, useEffect } from "react";
import Swal from "sweetalert2";
function StudentForm({ addStudent, updateStudent, editStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setEmail(editStudent.email);
      setAge(editStudent.age);
    }
  }, [editStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !age) {
      alert("All fields required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid Gmail address (example@gmail.com)",
        confirmButtonColor: "#4f46e5",
      });

      return;
    }

    const student = {
      id: editStudent ? editStudent.id : Date.now(),
      name,
      email,
      age,
    };

    if (editStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <div className="form-card">
      <h2>{editStudent ? "Edit Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit} className="student-form">
        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button className="submit-btn">
          {editStudent ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
