import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddStudentPage from "./pages/AddStudentPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import StudentsDetailsPage from "./pages/StudentsDetailsPage";
import EditStudentPage from "./pages/EditStudentPage";
import Footer from "./components/Footer";
import HousesPage from "./pages/HousesPage";
import { Snowfall } from "react-snowfall";
import img1 from "./assets/images/pome.png";
import img2 from "./assets/images/key.png";

function App() {
  /********snowflake effect*/
  const imagesRef = useRef([]);
  const [snowReady, setSnowReady] = useState(false);

  useEffect(() => {
    const snowImg1 = document.createElement("img");
    snowImg1.onload = () => setSnowReady(true);
    snowImg1.src = img1;

    const snowImg2 = document.createElement("img");
    snowImg2.onload = () => setSnowReady(true);
    snowImg2.src = img2;

    imagesRef.current = [snowImg1, snowImg2];
  }, []);

  /********Favorites*/
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (student) => {
    setFavorites((prev) =>
      prev.some((r) => r.id === student.id)
        ? prev.filter((r) => r.id !== student.id)
        : [...prev, student]
    );
  };
  /********Favorites*/

  return (
    <>
      {snowReady && (
        <Snowfall
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: "1000",
            pointerEvents: "none",
          }}
          images={imagesRef.current}
          snowflakeCount={20}
          radius={[30, 30]}
          speed={[1, 3]}
          wind={[-1, 2]}
        />
      )}
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage favorites={favorites} toggleFavorite={toggleFavorite} />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="add-student" element={<AddStudentPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="students/:studentId" element={<StudentsDetailsPage />} />
          <Route
            path="/students/:studentId/edit"
            element={<EditStudentPage />}
          />
          <Route path="/students/add" element={<AddStudentPage />} />
          <Route path="/houses" element={<HousesPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
