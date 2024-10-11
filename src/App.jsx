import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ScrolPages from './pages/ScrolPages';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <ul className="flex space-x-6 justify-center text-white">
        <li>
          <Link to="/" className="hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/scrolPages" className="hover:text-gray-300">ScrolPages</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/scrolPages' element={<ScrolPages />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
