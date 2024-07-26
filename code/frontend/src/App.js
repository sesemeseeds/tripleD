import React from 'react';
import './App.css';
import logo from './tripleD_logo.png';

function App() {
  const handleCustomerClick = () => {
    alert('Customer button clicked');
  };

  const handleStaffClick = () => {
    alert('Staff button clicked');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container-header">
          <h1>
            <span className="triple">triple</span>
            <span className="d-shop">D</span>
          </h1>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="button-container">
          <button className="button customer-button" onClick={handleCustomerClick}>
            Customer
          </button>
          <button className="button staff-button" onClick={handleStaffClick}>
            Staff
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
