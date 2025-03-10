import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import Navbar from '../components/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const { darkMode } = useSelector(state => state.theme);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    // Mock authentication (in a real app, this would call an API)
    if (username === 'user' && password === 'password') {
      dispatch(login({
        id: '1',
        name: 'Natasha',
        email: 'user@example.com',
        profilePic: 'https://images.unsplash.com/photo-1733732543012-d1b5cebc6676?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGdpcmxzJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D"'
      }));
    } else {
      setError('Invalid credentials. Try user/password');
    }
  };

  return (
    <>
    <Navbar/>
    <div className={` d-flex align-items-center justify-content-center mt-5  ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
     
      <div className="card shadow " style={{ width: '500px' }}>
        <div className={`card-body ${darkMode ? 'bg-dark text-light' : ''}`}>
          <div className="text-center mb-4">
            <i className="bi bi-check-circle-fill text-success fs-1"></i>
            <h3 className="mt-2">DoIt </h3>
            <p >Login to access your tasks</p>
          </div>
          
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          
          <form className="d-flex align-items-center justify-content-center flex-column gap-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${darkMode ? 'bg-dark text-white  border-secondary' : ''}`}
                  id="username"
                  value={username}
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <small className={`form-text ${darkMode ? 'text-light' : 'text-dark'}`}>Use 'user' for demo</small>
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <small className={`form-text ${darkMode ? 'text-light' : 'text-dark'}`}>Use 'password' for demo</small>
            </div>
            
            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;