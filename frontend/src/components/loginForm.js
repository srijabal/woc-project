import React, { useState } from "react";
import "./loginregister.css";

/*import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";*/
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  /*const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");*/
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const {email, password } = values;
  
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

 /* const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
*/

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/login', values);
      if (response.status==200) {
        navigate('/landing');
      }
      
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  }
    /*try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      alert("login successful")
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      alert("Login failed: " + errorMessage);
    }
  };
  */
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
          /*onChange={handleEmailChange}*/
          placeholder="Enter your email"
          onChange={e => setValues({...values, email: e.target.value})} 

        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          name='password'
          /*onChange={handlePasswordChange}*/
          placeholder="Enter your password"
          onChange={e => setValues({...values, password: e.target.value})}
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