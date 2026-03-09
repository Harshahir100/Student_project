import { useState } from "react";
import * as XLSX from "xlsx";

function StudentTable({ students, deleteStudent, setEditStudent }) {

  const [search, setSearch] = useState("");

  // Filter students
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // Download Full Excel
  const downloadAllExcel = () => {

    const data = students.map((s) => ({
      ID: s.id,
      Name: s.name,
      Email: s.email,
      Age: Number(s.age)
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "all_students.xlsx");
  };

  // Download Filtered Excel
  const downloadFilteredExcel = () => {

    const data = filteredStudents.map((s) => ({
      ID: s.id,
      Name: s.name,
      Email: s.email,
      Age: Number(s.age)
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Students");

    XLSX.writeFile(workbook, "filtered_students.xlsx");
  };

  return (

    <div className="table-card">

      <div className="table-header">
        <h2>Students List</h2>
      </div>

      {/* Search + Buttons */}

      <div className="top-controls">

        <input
          className="search-box"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="excel-buttons">

          <button
            className="excel-btn"
            onClick={downloadAllExcel}
          >
            Download Full Excel
          </button>

          <button
            className="excel-btn"
            onClick={downloadFilteredExcel}
          >
            Download Filtered Excel
          </button>

        </div>

      </div>

      <table className="student-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredStudents.map((student) => (

            <tr key={student.id}>

              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => setEditStudent(student)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default StudentTable;