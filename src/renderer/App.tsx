import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from 'views/MenuBar';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuBar />} />
      </Routes>
    </Router>
  );
}
