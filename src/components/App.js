import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Header from './Header';
import Diary from './Diary';
import Tips from './Tips';
import Register from './Register';
import Login from './Login';
import NavBar from './NavBar';
import * as auth from '../auth.js';
import './styles/App.css';
import ProtectedRouteElement from "./ProtectedRoute";

const App = () => {
  const [loggedIn, setLoggedIn] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, [])

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt'))
    {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
    if (res){
      setLoggedIn(true);
      navigate("/diary", {replace: true})}   
    });
    }
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }
  return (
    <>
      <Header />
      <main className="content">
        {loggedIn && <NavBar />}
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/diary" replace /> : <Navigate to="/login" replace />} />
          <Route path="/diary" element={<ProtectedRouteElement element={<Diary/>} loggedIn={loggedIn}/>} />
          <Route path="/tips" element={<ProtectedRouteElement element={<Tips/>} loggedIn={loggedIn}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;