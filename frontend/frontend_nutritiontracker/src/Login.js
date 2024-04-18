import React, { useState } from 'react';
import axios from 'axios';

import './App.css';


function Login(props) {
  const [isCreatingAccount, setCreatingAccount] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const[name, setName] = useState('');
  const[age, setAge] = useState('');
  const[height, setHeight] = useState('');
  const[weight, setWeight] = useState('');
  const[email, setEmail] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState('');



  const toggleForm = () => {
    setCreatingAccount(!isCreatingAccount);
    setId('')
    setPassword('')
    setError('')
  };

  const login = async (id , password) => {
    try{
        const response = await axios.post('http://localhost:5000/auth/login', {
        userName: id,
        password: password
    });
    const {token, name} = response.data;
    
    localStorage.setItem('userName', id);
    localStorage.setItem('name', name);
    localStorage.setItem('access_token', token); // Store token in localStorage
    setIsLoggedIn(true);
    window.location.reload(); 
    } catch (error){
        console.error('Error logging in:', error);
        if (error.response.status === 404){
          setError('User not found')
        }
        else if(error.response.status === 401){
          setError('Invalid password')
        }
    }      
  }

  const handleLogin= (e) => {
    login(id, password);
    e.preventDefault();
  }

  const createProfile = async (_username, _name, _age, _height, _weight, _email , _pw, _confirmPw) =>{
    try{
      const response = await axios.post('http://localhost:5000/auth/create-profile', {
        userName: _username,
        name: _name,
        email: _email,
        password: _pw,
        confirmPassword: _confirmPw,
        height: _height,
        weight: _weight
      })
      console.log("Profile created successfully");
      window.location.reload();
    } catch(error){
      console.log(`Error fetching data from the server: `, error);
    }
  }

  const handleRegistration = (e) => {
    e.preventDefault();
    if (password !== confirmPw) {
      setError('Passwords do not match');
      return;
    }
    createProfile(id, name, age, height, weight, email, password, confirmPw);
  }

  return (
    <div className="App">      
      <main>
        <div className="login-form">
          <h2>{isCreatingAccount ? 'Create Account' : 'Login'}</h2>
          <form>
            {!isCreatingAccount && (
              <div>
                <div className="form-group">
                  <input type="id" placeholder="Enter your username" value={id} onChange={(e) => setId(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                {error === ' '? ' ' 
                : <div className="error-message">
                    {error}
                  </div>}
                <button type="submit" onClick={handleLogin}>Login</button>
              </div>
            )}
            
            {isCreatingAccount && (
              <div>
                <div className="form-group">
                  <input type="text" placeholder="Pick a username" value={id} onChange={(e) => setId(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Enter your height" value={height} onChange={(e) => setHeight(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Enter your weight" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Confirm password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} required/>
                </div>
                {error === ' '? ' ' 
                : <div className="error-message">
                    {error}
                  </div>}
                <button type="submit" onClick={handleRegistration}>Register</button>
              </div>
            )}
          </form>
          <p>
            {isCreatingAccount
              ? "Already have an account? "
              : "Don't have an account? "}
            <button onClick={toggleForm} className="link-button">
              {isCreatingAccount ? 'Login' : 'Create an account'}
            </button>
          </p>
        </div>
      </main>     
    </div>
  );
}

export default Login;
