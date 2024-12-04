import { useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Home from "./pages/home/Home.jsx";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="p-4 h-screen items-center justify-center flex">
      <Routes>
        {/*  // we are using older way of react router dom..--> using Routes and Route */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
