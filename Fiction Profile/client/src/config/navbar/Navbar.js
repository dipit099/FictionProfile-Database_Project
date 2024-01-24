import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import './Navbar.css';

const Navbar = () => {

    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');

    return (
        <>
            <div className="navbar-container">

                <div className="navbar-left">
                    <Link to={"/home"}>
                        <h1>Fiction Profile</h1>
                    </Link>
                </div>

                <div className="navbar-middle">
                    {/* Add your middle content here */}

                </div>

                <div className="navbar-right">
                    {role === "user" ? (
                        <>
                            <button>Dashboard</button>
                            <button>Account</button>
                        </>
                    ) : role === "moderator" ? (
                        <>
                            <button>Dashboard</button>
                            <button>Account</button>
                        </>
                    ) : (
                        <>
                            <Link to={"/login"}><button>Login</button></Link>
                            {/* <button onClick={openLoginPopup}>Login</button> */}
                        </>
                    )}
                </div>


            </div>
        </>
    );
};

export default Navbar;
