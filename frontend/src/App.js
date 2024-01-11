/*import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/register";
import Todo from "./components/todo";
import LandingPage from "./components/landing";
import Navigation from "./components/navbar";
import BreatheAnimation from "./components/breathe";
import Quote from "./components/quotes"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/landing" element={<LandingPage />} />    
        <Route path="/navbar" element={<Navigation />} />
        <Route path="/breathe" element={<BreatheAnimation />} />
        <Route path="/Quote" element={<Quote />} />
        
        
      </Routes>
    </div>
  );
}

export default App;*/
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;

