import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 
import axios from 'axios';
import { BASE_URL } from './Base_url';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (email === '' || password === '') {
      alert('Please fill all the fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });

      if (response.status === 200) {
        const user = response.data.user;
        
        if (user.role === 'student') {
          navigate('/student', { state: { user } });
        } else if (user.role === 'teacher') {
          navigate('/teacher', { state: { user } });
        } else if (user.role === 'admin') {
          navigate('/adminData');
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage('Incorrect email or password.');
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
      } else {
        setErrorMessage('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ backgroundColor: '#ff6f61' }}>
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        {errorMessage && <div className="error-popup text-danger">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;