import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { BASE_URL } from "../BASE_URL.JS";


const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

  const handleSubmit = async (e) => {
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if( subject === "" && firstName === "" && lastName === "" && email === "" ){
      alert("Please fill in all the fields");
      return;
    } 

    if (role === "") {
      alert("Please select a role");
      return;
    }

    e.preventDefault();
    console.log("Signup Submitted:", { email, password, role, firstName, lastName, subject });
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        firstName: firstName,
        lastName: lastName,
        role: role,
        email: email,
        password: password,
        subject: subject,
      });
      console.log("Signup Response:", response);
      if (response.status === 201) {
        alert("Signup Successful");
       navigate("/");
      }
    } catch (error) {
      if (error.response && error.status === 400) {
        alert("Email already exists");
      }
      console.log("Signup Error:", error);
    }
  };

  return (
    <div className="auth-container" style={{ backgroundColor: "#ff6f61" }}>
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="Text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="auth-form"
          >
            <option value="">Select Role</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          {role === "teacher" && (
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="auth-form"
            >
              <option value="">Select Subject</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="english">English</option>
            </select>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
