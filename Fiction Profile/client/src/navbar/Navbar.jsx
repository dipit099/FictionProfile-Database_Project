import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import './Navbar.css';

const Navbar = ({ role }) => {

    console.log("in navbar, role " + role);
    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-left">
                    {/* <SideBar/> */}
                    {role === "user" ? (
                        <SideBar />
                    ) : (
                        <> </>
                    )}
                    <h1>Fiction Profile</h1>
                </div>

                <div className="navbar-middle">
                    {/* Add your middle content here */}

                </div>

                <div className="navbar-right">
                    {role === "user" ? (
                        <>
                            <button>Dashboard</button>
                            <button>Notification</button>
                            <button>Account</button>
                        </>
                    ) : role === "moderator" ? (
                        <>
                            <button>Dashboard</button>
                            <button>Notification</button>
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
        </div>
    );
};

export default Navbar;
