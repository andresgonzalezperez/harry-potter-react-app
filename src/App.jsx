import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddStudentPage from "./pages/AddStudentPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import StudentsDetailsPage from "./pages/StudentsDetailsPage";
import EditStudentPage from "./pages/EditStudentPage";
import Footer from "./components/Footer"
import HousesPage from "./pages/HousesPage";

function App() {

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
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
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
          <Route path="/students/:studentId/edit" element={<EditStudentPage />} />
          <Route path="/students/add" element={<AddStudentPage/>} />
          <Route path="/houses" element={<HousesPage/>}/>

        </Routes>
      </main>
      <Footer/>
          </>  
  );
}

export default App;
