import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './components/service/UserLogin.jsx'//; // Update the import path
import Login from "./components/user/login/Login.jsx" // Update the import path
import RegistrationForm from './components/user/register/Registration.jsx'; // Update the import path


const App = () => {
  return (
    <Router>
      <div>
        <h2>Welcome!</h2>
        <Routes>
          <Route path="/user/login" element={<UserLogin/>} />
          <Route path="/service/login" element={<Login/>} />
          <Route path="/user/register" element={<RegistrationForm/>} />
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
