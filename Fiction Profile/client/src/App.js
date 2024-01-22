import React, { useEffect, useState } from "react";
import './App.css';
import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import InputTodo from './component/InputTodo';
import ListTodos from './component/ListTodo';
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
      // console.log("Error in isAuth")
    }
  }

  useEffect(() => {
    isAuth();
    console.log("in useeffect" + isAuthenticated);
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // Redirect to the userhome route after successful authentication
  //     navigate('/userhome');
  //   }
  // }, [isAuthenticated]);


  return (

    <div className="App">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/userhome" /> : <Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/userhome" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/userhome" />} />
        <Route path="/movie" element={isAuthenticated ? <Movie /> : <Home />} />
        <Route path="/moderatorhome" element={isAuthenticated ? <ModeratorHome /> : <Navigate to="/login" />} />
        <Route path="/userhome" element={isAuthenticated ? <UserHome /> : <Navigate to="/login" />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>


    </div>
    // const checkAuthenticated = async () => {
    //   try {
    //     const res = await fetch("http://localhost:5197/verify", {
    //       method: "POST",
    //       headers: { jwt_token: localStorage.jwt_token }
    //     });
    //     const parseRes = await res.json();
    //     parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    //     console.log("parseRes: " + parseRes);
    //   } catch (err) {
    //     console.error("Error in checkAuthenticated function: ");
    //     console.error(err.message);
    //   }
    // };
    // useEffect(() => {
    //   checkAuthenticated();
    // });

    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [authRole, setRole] = useState(null);

    // const setAuth = boolean => {
    //   setIsAuthenticated(boolean);//boolean is the parameter here
    // };
    // const setAuthRole = role => {
    //   setRole(role);
    // }



    //   <div className="App">
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route
    //         path='/login'
    //         element={
    //           isAuthenticated ? (
    //             authRole === 'user' ? (
    //               <Navigate to='/userhome' />
    //             ) : (
    //               <Navigate to='/moderatorhome' />
    //             )
    //           ) : (
    //             <Login setAuth={setAuth} setAuthRole={setAuthRole} />
    //           )
    //         }
    //       />

    //       <Route
    //         path='/register'
    //         element={<Register />}
    //       />
    //       {/* <Route
    //   path="/movie"
    //   element={
    //     isAuthenticated === "user" ? (
    //       <Movie />
    //     ) : (
    //       <Navigate to={isAuthenticated === "false" ? "/login" : "/moderatorhome"} />
    //     )
    //   }
    // /> */}
    //       <Route
    //         path="/moderatorhome"
    //         element={
    //           isAuthenticated && authRole === "moderator" ? (
    //             <ModeratorHome />
    //           ) : (
    //             <Navigate to="/login" />
    //           )
    //         }
    //       />
    //       <Route
    //         path="/userhome"
    //         element={
    //           isAuthenticated && authRole !== "user" ? (
    //             <UserHome />
    //           ) : (
    //             <Navigate to="/login" />
    //           )
    //         }
    //       />

    //     </Routes>

    //   </div>





  );
}

export default App;














// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import InputTodo from "./component/InputTodo";
// import ListTodos from "./component/ListTodo";
// import Movie from "./component/Movie";
// import Login from "./login/Login";
// import Register from "./login/Register";
// import Home from "./home/Home";
// import UserHome from "./home/UserHome";
// import ModeratorHome from "./home/ModeratorHome";

// function App() {
//   const [currentForm, setCurrentForm] = useState("notlogged");
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   // Check if the user is logged in (you might need to update this based on your actual authentication logic)
//   //   // For example, you can check if there's a token in local storage or any other authentication state.
//   //   const userIsLoggedIn = /* Your authentication check here */;
//   //   setLoggedIn(userIsLoggedIn);
//   // }, []);

//   const setProfileRole = (role) => {
//     // Logic to set the role in the parent component (you can implement it based on your needs)

//     setCurrentForm(role);
//     console.log("Setting role:", role);
//   };

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/login"
//           element={
//             currentForm === "user" ? (
//               <Navigate to="/userhome" />
//             ) : currentForm === "moderator" ? (
//               <Navigate to="/moderatorhome" />
//             ) : (
//               <Login setProfileRole={setProfileRole} />
//             )
//           }
//         />

//         <Route
//           path="/register"
//           element={
//             <Register />
//           }
//         />
//         <Route
//           path="/userhome"
//           element={
//             currentForm === "user" ? (
//               <UserHome />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/moderatorhome"
//           element={
//             currentForm === "moderator" ? (
//               <ModeratorHome />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;
