import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from 'views/MenuBar';
import Login from 'views/Login';
import './App.css';
import { Meeting } from '../data';

declare global {
  interface Window {
    electron: {
      auth: {
        login: (email: string, password: string) => boolean;
      };
      meetings: {
        get: () => Meeting[];
      };
      updates: {
        listen: (func: (...args: unknown[]) => void) => void;
      };
    };
  }
}

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
