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