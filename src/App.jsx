import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ManageStudentPage from "./pages/ManageStudentPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotfoundPage";
import StudentsDetailsPage from "./pages/StudentsDetailsPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <main>
        <Search />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="manage-student" element={<ManageStudentPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="students-details" element={<StudentsDetailsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
