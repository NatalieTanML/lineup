import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from 'views/MenuBar';
import Login from 'views/Login';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuBar />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}
