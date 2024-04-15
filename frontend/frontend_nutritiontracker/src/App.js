import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import axios from "axios";

const baseUrl = "http://localhost:5000";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const checkSession = async () => {
      try{
        const token = localStorage.getItem('access_token');
        const userName = localStorage.getItem('userName');
        if (token && userName) {
          setIsLoggedIn(true);
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