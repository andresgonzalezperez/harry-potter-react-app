import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function StudentsEditPage() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    age: "",
    sex: "",
    house: "",
    personalSkills: [],
    academicGrades: {},
    comments: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5005/students/${studentId}`)
      .then(({ data }) => {
        setStudent(data);
      })
      .catch((err) => console.log(err));
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...student.personalSkills];
    updatedSkills[index] = value;
    setStudent((prev) => ({ ...prev, personalSkills: updatedSkills }));
  };

  const handleGradeChange = (subject, value) => {
    setStudent((prev) => ({
      ...prev,
      academicGrades: { ...prev.academicGrades, [subject]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5005/students/${studentId}`, student);
      navigate(`/students/${studentId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detail-container">
      <section className="student-detail-container">
        <h1>Edit Student</h1>

        <form onSubmit={handleSubmit} className="form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
          <section className="new-student-info">
            <label>Age:</label>
            <input
              style={{ width: "50px" }}
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
            />

            <label>Sex:</label>
            <select name="sex" value={student.sex} onChange={handleChange}>
              <option value="">Select sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label>House:</label>
            <select name="house" value={student.house} onChange={handleChange}>
              <option value="">Select House</option>
              <option value="Gryffindor">Gryffindor</option>
              <option value="Slytherin">Slytherin</option>
              <option value="Hufflepuff">Hufflepuff</option>
              <option value="Ravenclaw">Ravenclaw</option>
            </select>

            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={student.image}
              onChange={handleChange}
            />
          </section>

          <h2>Personal Skills</h2>
          <section className="personal-skills">
            {student.personalSkills?.map((skill, index) => (
              <input
                key={index}
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              />
            ))}
          </section>

          <h2>Academic Grades</h2>
          <section className="academic-grades-input">
            {student.academicGrades &&
              Object.entries(student.academicGrades).map(([subject, grade]) => (
                <div key={subject}>
                  <label>{subject}:</label>
                  <input
                    type="text"
                    value={grade}
                    onChange={(e) => handleGradeChange(subject, e.target.value)}
                  />
                </div>
              ))}
          </section>
          <label>Comments:</label>
          <textarea
            name="comments"
            value={student.comments}
            onChange={handleChange}
          />

          <button type="submit" className="save-changes-btn">
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
}

export default StudentsEditPage;
