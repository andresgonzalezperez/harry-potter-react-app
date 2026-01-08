import { Link } from "react-router-dom";
import gryffindorCrest from "../assets/images/gryffindor-crest.png";
import slytherinCrest from "../assets/images/slytherin-crest.png";
import hufflepuffCrest from "../assets/images/hufflepuff-crest.png";
import revenclawCrest from "../assets/images/ravenclaw-crest.png";
import FavoriteButton from "./FavoriteButton";

const gradeMap = {
  "A+": 20,
  "A": 19,
  "A-": 18,
  "B+": 17,
  "B": 16,
  "B-": 15,
  "C+": 14,
  "C": 13,
};

function calculateAverageLetter(academicGrades) {
  const numericGrades = Object.values(academicGrades).map(
    (grade) => gradeMap[grade]
  );

  const average =
    numericGrades.reduce((sum, value) => sum + value, 0) / numericGrades.length;

  if (average >= 19.5) return "A+";
  if (average >= 18.5) return "A";
  if (average >= 17.5) return "A-";
  if (average >= 16.5) return "B+";
  if (average >= 15.5) return "B";
  if (average >= 14.5) return "B-";
  if (average >= 13.5) return "C+";
  return "C";
}

function StudentCard({ student, isFavorite ,
  onToggleFavorite }) {
  const averageLetter = calculateAverageLetter(student.academicGrades);

  const houseCrests = {
    Gryffindor: gryffindorCrest,
    Slytherin: slytherinCrest,
    Hufflepuff: hufflepuffCrest,
    Ravenclaw: revenclawCrest,
  };

  return (
    <>
      <div className="student-card">
      <FavoriteButton
        isFavorite={isFavorite}
        onClick={() => onToggleFavorite(student)}
      />

        <section className="student-info">
          <article className="student-top">
            <div className="student-card-top">
              <img
                className="student-img"
                src={student.image}
                alt={student.name}
              />
              <img
                id="house-crest-img"
                src={houseCrests[student.house]}
                alt={`Crest of ${student.house}`}
                className="house-badge"
              />
            </div>
          </article>
          <h2 className="student-name">{student.name}</h2>

          {/* <ul className="academic-grades">
            <p>Academic Average</p>
            {Object.entries(student.academicGrades).map(([subject, grade]) => (
              <li key={subject}>
                <strong>{subject}:</strong> {grade}
              </li>
            ))}
          </ul> */}

          <section className="academic-grades">
            <p>Academic Average: </p>
            <span>
              <p>{averageLetter}</p>
            </span>
          </section>

          <section id="personal-skills">
            <span>Personal Skills:</span>
            <ul>
              {student.personalSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        </section>
        <Link to={`/students/${student.id}`} className="details-link">
          <button>Student Details</button>
        </Link>
      </div>
    </>
  );
}

export default StudentCard;
