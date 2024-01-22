import React, { useEffect, useState } from "react";
import './App.css';
import { Route,  Routes } from "react-router-dom";
import Movie from './component/Movie';
import Login from './login/Login';
import Register from './login/Register';
import Home from './home/Home';
import UserHome from './home/UserHome';
import ModeratorHome from './home/ModeratorHome';
import { Navigate } from "react-router-dom";
import MovieDetails from "./component/MovieDetails";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authRole = localStorage.getItem("role");

  const setAuth = (boolean) => {
    console.log("in setAuth" + boolean);
    setIsAuthenticated(boolean);
  }

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5197/auth-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
      
    }
  }

  useEffect(() => {
    isAuth();
    console.log("in useeffect" + isAuthenticated);
  }, []);

  
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={isAuthenticated && authRole === 'user' ? <Navigate to="/userhome" /> : <Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/userhome" />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : isAuthenticated && authRole === 'user' ? (
              <Navigate to="/userhome" />
            ) : isAuthenticated && authRole === 'moderator' ? (
              <Navigate to="/moderatorhome" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/moderatorhome" element={isAuthenticated && authRole === 'moderator' ? <ModeratorHome /> : <Navigate to="/" />} />
        <Route path="/userhome" element={isAuthenticated && authRole === 'user' ? <UserHome /> : <Navigate to="/" />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie" element={isAuthenticated ? <Movie /> : <Home />} />
      </Routes>
    </div>
  );
}

export default App;