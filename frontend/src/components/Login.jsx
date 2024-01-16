import React, { useState } from "react";
import "./loginregister.css";

import { useAuth } from "../provider/authProvider";

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const { email, password } = values;

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', values);
      localStorage.setItem('token', response.data.token);
      if (response.status == 200) {
        navigate('/');
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      flexDirection: "column",
      margin: "auto",
      marginTop: "10%",
      width: "20%",
      padding: "10px",
      border: "2px solid #000",
    }}>
      <p className="form-header">Login Form</p>
      <form className="App" onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name='email'
          value={email}

          placeholder="Enter your email"
          onChange={e => setValues({ ...values, email: e.target.value })}

        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          name='password'

          placeholder="Enter your password"
          onChange={e => setValues({ ...values, password: e.target.value })}
        />

        <input
          type="submit"
          style={{ backgroundColor: "#6DA4AA" }}
          value="Login"
        />
      </form>
    </div>
  );
}

export default Login;
