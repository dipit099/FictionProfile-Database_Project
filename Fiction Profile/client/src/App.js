import React, { useState } from "react";
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


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (

    <div className="App">
      {/* {
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : currentForm === "register" ? <Register onFormSwitch={toggleForm} /> : <></>
        } */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/moderatorhome" element={<ModeratorHome/>} />
        <Route path="/userhome" element={<UserHome />} />
      </Routes>
    </div>



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
