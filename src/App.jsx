// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/Homepage';
import VendingMachine from './components/VendingMachine';
import TeamPage from './components/TeamPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container">
            <h1 className="logo">SmartVend</h1>
            <nav className="nav">
              <ul className="nav-list">
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/vending" className="nav-link">Vending Machine</Link></li>
                <li><Link to="/team" className="nav-link">Our Team</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vending" element={<VendingMachine />} />
            <Route path="/team" element={<TeamPage />} />
          </Routes>
        </main>


      </div>
    </Router>
  );
}

export default App;






// App.css
