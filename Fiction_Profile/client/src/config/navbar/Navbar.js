import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import './Navbar.css';
import { MdNotificationAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdAccountBox } from "react-icons/md";
import axios from "axios";

import BASE_URL from "../ApiConfig";

const Navbar = () => {

    const role = localStorage.getItem('role');
    const people_id = localStorage.getItem('people_id');
    const [announcements, setAnnouncements] = useState([]);
    const [showAnnouncement, setShowAnnouncement] = useState(false);



    const fetchAnnouncement = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user_announcement`);
            setAnnouncements(response.data);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    }




    useEffect(() => {
        if (role === "user") {
            fetchAnnouncement();
        }
    }, []);


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
                            <div
                                className="notification-icon"
                                onMouseEnter={() => setShowAnnouncement(true)}
                                onMouseLeave={() => setShowAnnouncement(false)}
                            >
                                <MdNotificationAdd style={{ fontSize: '45px', color: '#007bff' }} />
                                {showAnnouncement && (
                                    <div className="notification-box">
                                        <ul>
                                            {announcements.map((announcement, index) => (
                                                <li key={index}>
                                                    <div className="title-description">
                                                        <div className="title">Title: {announcement.title}</div>
                                                        <div className="days-ago">{announcement.hours_ago}hour ago</div>
                                                    </div>
                                                    <div className="description">Overview: {announcement.description}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                )}
                            </div>

                            <Link to={`/dashboard/${people_id}`} >
                                {/* <MdAccountBox style={{ fontSize: '50px', color: 'white' }} /> */}
                                <button>Profile</button>

                            </Link>


                        </>
                    ) : role === "moderator" ? (
                        <>

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
