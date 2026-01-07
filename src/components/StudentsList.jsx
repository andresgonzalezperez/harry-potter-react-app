import axios from "axios";
import StudentCard from "./StudentCard";
import { useEffect, useState } from "react";
import { API_URL } from "../config/config";

function StudentsList({ favorites = [], onToggleFavorite }) {
  const [students, setStudents] = useState([]);
  const [itemsPerPage, setitemsPerPage] = useState(10);

  //search
  const [search, setSearch] = useState("");
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.house.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    axios
      .get(`${API_URL}/students`)
      .then(({ data }) => {
        console.log("Students Data:", data);
        setStudents(data || []);
      })
      .catch((error) => {
        console.error("Error fetching students data:", error);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
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

      <div className="top-pagination">
       
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                ➡
              </button>
            </div>
          )}
    

        <section className="items-pp">
          <label htmlFor="items per page"> Cards per page:</label>
          <select
            name="items per page"
            id=""
            onChange={(e) => setitemsPerPage(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </section>
      </div>

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
      
        <section className="bottom-pagination">

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
      </section>
    </>
  );
}
export default StudentsList;
