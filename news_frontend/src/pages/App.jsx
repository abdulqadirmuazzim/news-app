import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Signup from "./SignUp";
import Dashoard from "./Dashoard";
import ChangePassword from "./ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashoard />} />
        <Route path="/change_password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
