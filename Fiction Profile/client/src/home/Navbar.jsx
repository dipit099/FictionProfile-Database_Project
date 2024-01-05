import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file for styling
import SideBar from "./SideBar";

const Navbar = ({ role }) => {

    // const openLoginPopup = () => {
    //     // Specify the URL of your login page
    //     const loginPageUrl = "/login";

    //     // Open the login page in a popup window
    //     window.open(loginPageUrl, "Login", "width=400,height=400");
    // };

    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-left">
                    <SideBar/>
                    <Link to="/home">
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
