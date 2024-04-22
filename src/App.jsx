import Header from "./Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PasswordPage from "./pages/PasswordPage"

import React, {useState} from "react";
import './App.css'

function App(){
  let Component
  switch (window.location.pathname){
    case "/":
      Component = Home
      break
    case "/home":
      Component = Home
      break
    case "/login":
      Component = Login
      break
    case "/signup":
      Component = Signup
      break
    case "/passwordpage":
      Component = PasswordPage;
      break;

  }
  
  return (
    <>
      <Header/>
      <Component/>
      
    </>
  )
}

export default App;