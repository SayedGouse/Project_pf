import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 
import axios from 'axios';
import { BASE_URL } from '../BASE_URL.JS';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Submitted:', { email, password });
    if(email === '' || password === ''){
      alert( "Please fill all the fields");
    }

    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      console.log('Login Response:', response);

      if (response.status === 200) {
        const user = response.data.user;

        if (user.role === 'student') {
          navigate('/student', { state: { user :user } });
        } else if (user.role === 'teacher') {
          navigate('/teacher', { state: { user : user } });
        } else if (user.role === 'admin') {
          navigate('/adminData');
        }
      }
    } catch (error) {
      console.log('Login Error:', error);
      
      // Handle error messages
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage('Incorrect email or password.');
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
      } else {
        setErrorMessage('Network error. Please check your connection.');
      }
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
          <button type="submit">Login</button>
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
