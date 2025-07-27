import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Root />} />
          <Route path="/home" exact element={<LandingPage />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/home" />;
};


export default App;
