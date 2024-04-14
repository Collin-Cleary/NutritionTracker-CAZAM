import React, { useState } from 'react';
import './App.css';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">

      <header>
        <div className="header-left">
          <h1>NutriKit</h1>
        </div>
        <div className="header-right">
          <nav>
            <ul>
              { isLoggedIn ? (
                <li>
                  <button className="nav-link" onClick={handleLogout}>Logout</button>
                </li>
              ) : null }
            </ul>
          </nav>
        </div>
      </header>

              <Login/>

      <footer>
        <p>Group-3</p>
      </footer>
    </div>
  );
}

export default App;