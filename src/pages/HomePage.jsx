import StudentsList from '../components/StudentsList';

function HomePage({ students, favorites, toggleFavorite }) {
  return (
    <div className='container'>
      <StudentsList
        students={students}
        favorites={favorites}         
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default HomePage;
