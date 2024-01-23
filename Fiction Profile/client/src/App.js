import React, { useEffect, useState } from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Movie, Tvshow, Book, Manga } from './component/home/Movie';
import Login from './component/login/Login';
import Register from './component/login/Register';
import Home from './component/home/Home';
import ModeratorHome from './component/home/ModeratorHome';
import { Navigate } from "react-router-dom";

import { MovieDetails, TvshowDetails, BookDetails, MangaDetails } from "./component/media_details/MediaDetails";

import Account from "./component/account/Account"



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
        {/* <Route path="/" element={isAuthenticated && authRole === 'user' ? <Navigate to="/userhome" /> : <Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/" />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) :(
              <Navigate to="/" />
            )
          }
        />

        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/moderatorhome" element={isAuthenticated && authRole === 'moderator' ? <ModeratorHome /> : <Navigate to="/" />} />        
        <Route path="/movie" element={isAuthenticated ? <Movie /> : <Navigate to="/" />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/tvshow/:id" element={<TvshowDetails />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/manga/:id" element={<MangaDetails />} />

      
        <Route path="/account" element={isAuthenticated ? <Account /> : <Home />} />

      </Routes>
    </div>
  );
}

export default App;