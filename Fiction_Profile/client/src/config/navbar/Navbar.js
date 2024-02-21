import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import './Navbar.css';

const Navbar = () => {

    const role = localStorage.getItem('role');
    const people_id = localStorage.getItem('people_id');


    return (
        <>
            <div className="navbar-container">

                <div className="navbar-left">
                    <Link to={"/"}>
                        <h1>Fiction Profile</h1>
                    </Link>
                </div>

                <div className="navbar-middle">
                    {/* Add your middle content here */}

                </div>

                <div className="navbar-right">
                    {role === "user" ? (
                        <>
                            <Link to={`/dashboard/${people_id}`}>
                                <button>Dashboard</button>
                            </Link>

                        </>
                    ) : role === "moderator" ? (
                        <>
                            <button>Dashboard</button>
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
