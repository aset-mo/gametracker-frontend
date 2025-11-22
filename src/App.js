import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Biblioteca from './components/Biblioteca'; 
import GameForm from './components/GameForm';
import Reviews from './components/Reviews'; 

function App() {
  return (
    <Router basename="/gametracker-frontend">
      <div className="App">
        
        <Routes>
          {/* 1. Main route. List of games */}
          <Route path="/" element={<Biblioteca />} /> 
          
          {/* 2. routes to add and edit games */}
          <Route path="/add" element={<GameForm />} /> 
          <Route path="/edit/:id" element={<GameForm />} />
          
          {/* 3. Route to add reviews */}
          <Route path="/reviews" element={<Reviews />} /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;