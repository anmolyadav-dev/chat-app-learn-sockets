import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Home from "./pages/home/Home.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen items-center justify-center flex">
      <Routes>
        {/*  // we are using older way of react router dom..--> using Routes and Route */}
        <Route
          path="/"
          element={!authUser ? <Navigate to="/login" /> : <Home />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
