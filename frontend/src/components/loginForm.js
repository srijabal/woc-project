import React, { useState } from "react";
import "./loginregister.css";

import { useAuth } from "../provider/authProvider";

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const { setToken } = useAuth();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const { email, password } = values;

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;


  const handleLoginSubmit = async (event) => {
    setToken("this is a test token");
    navigate("/", { replace: true });
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', values);
      if (response.status == 200) {
        navigate('/landing');
      }

    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div style={{ backgroundImage: 'url("/bimg.jpg")', backgroundSize: 'cover' }}>
      <div className="body"></div>

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
          style={{ backgroundColor: "#7FFF00" }}
          value="Login"
        />
      </form>
    </div>
  );
}

export default LoginForm;