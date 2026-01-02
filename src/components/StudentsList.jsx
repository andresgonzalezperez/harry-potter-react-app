import axios from "axios";
import StudentCard from "./StudentCard";
import { useEffect, useState } from "react";
const itensPerPage = 8;

function StudentsList({ favorites = [], onToggleFavorite }) {
  const [students, setStudents] = useState([]);

  //search
  const [search, setSearch] = useState("");
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.house.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("http://localhost:5005/students")
      .then(({ data }) => {
        console.log("Students Data:", data);
        setStudents(data || []);
      })
      .catch((error) => {
        console.error("Error fetching students data:", error);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const totalPages = Math.ceil(filteredStudents.length / itensPerPage);
  const studentsToShow = filteredStudents.slice(startIndex, endIndex);

  return (
    <>
      <section className="search-bar-container">
        <input
          className="seach-bar-input"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ➡
          </button>
        </div>
      )}
      

      <div className="students-list">
        {studentsToShow.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            isFavorite={favorites.some((fav) => fav.id === student.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ➡
          </button>
        </div>
      )}
    </>
  );
}
export default StudentsList;
