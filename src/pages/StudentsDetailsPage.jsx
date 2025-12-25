import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function StudentsDetailsPage() {
  const [student, setStudent] = useState({});
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/students/${studentId}`)
      .then(({ data }) => {
        console.log(data);
        setStudent(data);
      })
      .catch((err) => console.log(err));
  }, [studentId]);

  // Delete student
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5005/students/${studentId}`);
      navigate("/"); // Go back to the list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detail-container">
      <section className="student-detail-container">
        <img src={student.image} alt={student.name} />
        <h1>{student.name}</h1>
        <div>
          <p>
            <strong>Age:</strong> {student.age}
          </p>
          <p>
            <strong>House:</strong> {student.house}
          </p>
        </div>

        <h2>Academic Grades</h2>
        <ul>
          {student.academicGrades &&
            Object.entries(student.academicGrades).map(([subject, grade]) => (
              <li key={subject}>
                <strong>{subject}:</strong> {grade}
              </li>
            ))}
        </ul>

        <h2>Personal Skills</h2>
        <ul className="personal-skills-list">
          {student.personalSkills?.map((skill, index) => (
            <li key={index}>
              <strong>{skill}</strong>
            </li>
          ))}
        </ul>

        <h2>Comments</h2>
        <p className="student-comments">{student.comments}</p>

        <Link to="/" className="btn-back-home">
          Back
        </Link>

        <p
          className="btn-edit-student"
          onClick={() => navigate(`/students/${studentId}/edit`)}>
          Edit Student
        </p>

        <p className="btn-delete-student" onClick={handleDelete}>
          Delete Student
        </p>
      </section>
    </div>
  );
}
export default StudentsDetailsPage;
