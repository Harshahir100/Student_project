import { useState, useEffect } from "react";

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format");
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