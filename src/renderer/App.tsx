/* eslint-disable jsx-a11y/label-has-associated-control */
import { HiCursorClick } from 'react-icons/hi';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const Hello = () => {
  return (
    <div>
      <button
        type="button"
        className="group block max-w-xs mx-auto rounded-lg p-6 bg-whitering-1 ring-gray-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
      >
        <div className="flex items-center space-x-3">
          <HiCursorClick className="h-6 w-6 text-sky-500 group-hover:text-white" />
          <h3 className="text-gray-900 group-hover:text-white text-sm font-semibold">
            New project
          </h3>
        </div>
        <p className="text-gray-500 group-hover:text-white text-sm">
          Create a new project from a variety of starting templates.
        </p>
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
