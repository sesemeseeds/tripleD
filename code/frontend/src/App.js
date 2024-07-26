import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home'; 
import Staff from './pages/Staff/Staff';
import Customer from './pages/Customer/Customer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/customer" element={<Customer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
