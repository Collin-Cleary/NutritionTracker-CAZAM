import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import axios from "axios";
import {findAllByPlaceholderText} from "@testing-library/react";

const baseUrl = "http://localhost:5000";

const checkSession = () => {
  return new Promise((resolve, reject) => {
    const data = {
      "id": localStorage.getItem('id'),
      "access_token": localStorage.getItem('access_token')
    };

    axios.post(`${baseUrl}/auth/check_session`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(response => {
          if (response.data.session_active) {
            console.log('User already logged in');
            resolve(true);
          } else {
            console.log('User logged out');
            resolve(false);
          }
        })
        .catch(error => {
          console.log(`Error fetching data from the server: `, error);
          resolve(false);
        });
  });
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  checkSession().then(sessionActive => {
    console.log(sessionActive);
    setIsLoggedIn(sessionActive);
  });
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    axios.post(
        `${baseUrl}/auth/logout`,
        JSON.stringify({ "id": localStorage.getItem('id') }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
    )
        .then(response => {
          if (response.status === 200) {
            console.log('User logged out successfully');
            localStorage.removeItem('access_token');
            setIsLoggedIn(false);
            console.log('LOGGED OUT');
          } else {
            console.log('User logout failed');
          }
        })
        .catch(error => {
          console.log(`Error fetching data from the server: `, error);
        });
  };
  const handleLogout = (e) => {
    logout();
    e.preventDefault();
  };

  return (
    <div className="App">

      <header>
        <div class="header-left">
          <h1>NutriKit</h1>
        </div>
        <div class="header-right">
          <nav>
            <ul>
              {/*<li>Home</li>*/}
              {/*<li>About</li>*/}
              {/*<li>Contact</li>*/}
              { isLoggedIn && (
                <li>
                  <button className="nav-link" onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {isLoggedIn ? <Home /> : <Login handleLogin={handleLogin} />}

      <footer>
        <p>Group-3</p>
      </footer>
    </div>
  );
}

export default App;