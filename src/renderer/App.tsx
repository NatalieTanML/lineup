import { useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from 'views/MenuBar';
import Login from 'views/Login';
import './App.css';
import { Meeting } from '../data';

declare global {
  interface Window {
    electron: {
      auth: {
        checkLoginStatus: () => boolean;
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const refreshMeetings = () => {
    setMeetings(window.electron.meetings.get());
  };

  const onLogin = async (username: string, password: string) => {
    window.electron.auth.login(username, password);
    setIsLoggedIn(true);
    window.electron.updates.listen(() => {
      refreshMeetings();
    });
  };

  if (!isLoggedIn && window.electron.auth.checkLoginStatus()) {
    onLogin('', ''); // Lmao.
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <MenuBar meetings={meetings} />
            ) : (
              <Login onLogin={onLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
}
