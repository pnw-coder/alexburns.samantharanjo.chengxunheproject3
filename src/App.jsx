import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PasswordPage from "./pages/PasswordPage"

import React, {useState} from "react";
import './App.css'

function App(){
  // let Component
  // switch (window.location.pathname){
  //   case "/":
  //     Component = Home
  //     break
  //   case "/home":
  //     Component = Home
  //     break
  //   case "/login":
  //     Component = Login
  //     break
  //   case "/signup":
  //     Component = Signup
  //     break
  //   case "/passwordpage":
  //     Component = PasswordPage;
  //     break;

  // }
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/passwordpage" element={<PasswordPage />} />
        {/* Redirect to Login if path is not found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    // <>
    //   <Header/>
    //   <Component/>
      
    // </>
  )
}

export default App;