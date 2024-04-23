import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';
import Home from './Home';
import axios from "axios";

const baseUrl = "http://localhost:5000";
axios.defaults.baseURL = 'http://localhost:5000';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');

  
  useEffect(() => {
    const fetchUserName = () => {
      const storedUsername = localStorage.getItem('name');
      if (storedUsername) {
        setName(storedUsername);
      }
    };

    const checkSession = async () => {
      try{
        const token = localStorage.getItem('access_token');
        const userName = localStorage.getItem('userName');
        if (token && userName) {
          setIsLoggedIn(true);
          fetchUserName();
        }       
      } catch(error){
        console.log('Error checking session:', error);
      } 
    };

    checkSession();
  },[]);

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
        <div className="header-left">
          <h1>NutriKit</h1>
        </div>
        <div className="header-right">
          <nav>
            <ul>
              { isLoggedIn && (
                <li>
                  <FontAwesomeIcon icon={faUser} /> {name }
                  <button className="nav-link" onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {isLoggedIn ? <Home /> : <Login handleLogin={handleLogin} />}

      <footer>
        <p>Group-2</p>
      </footer>
    </div>
  );
}

export default App;