import React, { useState } from 'react';
import './App.css';

function Login(props) {
  const [isCreatingAccount, setCreatingAccount] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setCreatingAccount(!isCreatingAccount);
  };

  const login = (id , password) => {
    console.log(id, password)
      
  }
  const handleLogin= (e) => {
    login(id, password);
    e.preventDefault();
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
                  <input type="id" placeholder="Enter your id" value={id} onChange={(e) => setId(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
              </div>
            )}
            
            {isCreatingAccount && (
              <div>
                <div className="form-group">
                  <input type="text" placeholder="Pick a username" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Enter your age" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Enter your height" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Enter your weight" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Enter your password" />
                </div>
                <div className="form-group">
                  <input type="password" placeholder="Confirm password" />
                </div>
                <button type="submit">Register</button>
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
