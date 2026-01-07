import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config";

function StudentsEditPage() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

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

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/students/${studentId}`)
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

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "Image_HarryPotter_React_App");
    data.append("cloud_name", "djziuzbnz");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/djziuzbnz/image/upload",
      data
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = student.image;
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary();
      }

      const studentToSend = {
        ...student,
        image: imageUrl,
      };

      await axios.put(
        `${API_URL}/students/${studentId}`,
        studentToSend
      );

      setMessage("Student updated.");

      navigate(`/students/${studentId}`);
    } catch (err) {
      console.log(err);
    } finally {
      setMessage("Student updated.");
    }
    setTimeout(() => setMessage(""), 2000);
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
            <label>
              Age:
              <input
                style={{ width: "50px" }}
                type="number"
                name="age"
                value={student.age}
                onChange={handleChange}
              />
            </label>

            <label>
              Sex:
              <select name="sex" value={student.sex} onChange={handleChange}>
                <option value="">Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>

            <label>
              House:
              <select
                name="house"
                value={student.house}
                onChange={handleChange}
              >
                <option value="">Select House</option>
                <option value="Gryffindor">Gryffindor</option>
                <option value="Slytherin">Slytherin</option>
                <option value="Hufflepuff">Hufflepuff</option>
                <option value="Ravenclaw">Ravenclaw</option>
              </select>
            </label>

            <label>
              <input
                type="file"
                id="imageUpload"
                style={{ display: "none" }}
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <button
                type="button"
                className="btn-delete-student"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                Update Image
              </button>

              {/* Show current image name if no new file selected */}
              {student.image && !imageFile && (
                <p className="current-image-name">
                  {student.image.split("/").pop()}
                </p>
              )}

              {imageFile && <p className="file-name">{imageFile.name}</p>}
            </label>
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
