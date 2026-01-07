import { useState, useEffect } from "react";
import gryffindorCrest from "../assets/images/gryffindor-crest.png";
import slytherinCrest from "../assets/images/slytherin-crest.png";
import hufflepuffCrest from "../assets/images/hufflepuff-crest.png";
import ravenclawCrest from "../assets/images/ravenclaw-crest.png";
import StudentCard from "../components/StudentCard";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config";

function HousesPage() {
  const [students, setStudents] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const houseDescriptions = {
    Gryffindor:
      "Gryffindor values bravery, daring, nerve, and chivalry. Its emblematic animal is the lion, and its colours are scarlet and gold.",
    Slytherin:
      "Slytherin values ambition, leadership, self-preservation, cunning and resourcefulness. Its emblematic animal is the serpent.",
    Ravenclaw:
      "Ravenclaw values intelligence, knowledge, curiosity, creativity and wit. Its emblematic animal is the eagle.",
    Hufflepuff:
      "Hufflepuff values hard work, patience, justice, and loyalty. Its emblematic animal is the badger.",
  };

  const houses = [
    { id: "Gryffindor", icon: gryffindorCrest },
    { id: "Slytherin", icon: slytherinCrest },
    { id: "Ravenclaw", icon: ravenclawCrest },
    { id: "Hufflepuff", icon: hufflepuffCrest },
  ];

  useEffect(() => {
    fetch(`${API_URL}/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredStudents = students.filter(
    (student) => student.house === selectedHouse
  );

  return (
    <div className="houses-wrapper houses-page-context">
      <h1 className="houses-title">Hogwarts Houses</h1>

      <div className="houses-stats-grid">
        {houses.map((house) => (
          <div
            key={house.id}
            className={`house-stat-card ${house.id.toLowerCase()} ${
              selectedHouse === house.id ? "active" : ""
            }`}
            onClick={() =>
              setSelectedHouse(selectedHouse === house.id ? null : house.id)
            }
          >
            <img src={house.icon} alt={house.id} className="house-crest-img" />
            <h3 className="medieval-sharp-font">{house.id}</h3>
          </div>
        ))}
      </div>

      {selectedHouse && (
        <div className={`house-description-box ${selectedHouse.toLowerCase()}`}>
          <p className="house-text">{houseDescriptions[selectedHouse]}</p>
        </div>
      )}

      <div className="students-list">
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {!selectedHouse && (
        <p className="select-prompt">Select a house to see the students.</p>
      )}
      <div className="empty-list-container">
        {filteredStudents.length === 0 && <Link to="/"> 🔙 Home Page</Link>}
      </div>
    </div>
  );
}

export default HousesPage;
