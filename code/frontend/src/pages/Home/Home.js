import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import logo from '../../tripleD_logo.png';

function Home() {
  return (
    <div className="home">
      <header className="home-primary">
        <div className="home-header">
          <h1 className="home-title">
            <span className="orange">triple</span>
            <span className="black">D</span>
          </h1>
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="button-container">
          <Link to="/customer">
            <button className="button customer-button">
              Customer
            </button>
          </Link>
          <Link to="/staff">
            <button className="button staff-button">
              Staff
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Home;
