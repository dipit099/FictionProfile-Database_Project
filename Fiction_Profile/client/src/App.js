import React, { useEffect, useState } from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Movie, TvShow, Book, Manga } from './component/home/Media';
import Login from './component/login/Login';
import Register from './component/login/Register';
import Home from './component/home/Home';
import Discover from "./component/discover/Discover";
import ModeratorHome from './component/home/ModeratorHome';
import { Navigate } from "react-router-dom";

import { MovieDetails, TvshowDetails, BookDetails, MangaDetails } from "./component/media_details/MediaDetails";

import Account from "./component/account/Account"



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authRole, setauthRole] = useState(null);


  const setAuth = (boolean) => {
    console.log("in app.js setAuth" + boolean);
    setIsAuthenticated(boolean);
  }

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5197/auth-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      console.log("parseReq " + parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);

    }
  }



  useEffect(() => {
    isAuth();
    console.log("isAuthenticated " + isAuthenticated);
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
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/moderatorhome" element={isAuthenticated && authRole === 'moderator' ? <ModeratorHome /> : <Navigate to="/" />} />
        <Route path="/movie" element={isAuthenticated ? <Movie /> : <Navigate to="/" />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/tv/:id" element={<TvshowDetails />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/manga/:id" element={<MangaDetails />} />


        <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
        {/* <Route path="/feed" element={isAuthenticated ? < /> : <Navigate to="/" />} />*/}
        {/* <Route path="/discover" element={isAuthenticated ? <Discover /> : <Navigate to="/" />} /> */}
         <Route path="/discover"  element={<Discover />} />

      </Routes>
    </div>
  );
}

export default App;