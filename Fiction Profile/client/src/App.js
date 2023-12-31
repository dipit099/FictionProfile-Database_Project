import React, { useState } from "react";
import './App.css';
import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import InputTodo from './component/InputTodo';
import ListTodos from './component/ListTodo';
import Movie from './component/Movie';
import Login from './login/Login';
import Register from './login/Register';


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
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/moderator" element={< ></>} />
      </Routes>
    </div>



  );
}

export default App;