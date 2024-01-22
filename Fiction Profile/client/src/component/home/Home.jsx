import React from 'react';
import Navbar from '../../config/navbar/Navbar';
import Movie from '../Movie';
import './Home.css'; // Import your CSS file for styling
import { useLocation } from 'react-router-dom';
import SideBar from '../../config/navbar/SideBar';

function Home() {
    // const location = useLocation();
    // const email = location.state && location.state.email;
    // const role = location.state && location.state.role;
    // console.log("in homepage, email "+ email+ " role "+ role);
    const role = null;

    return (
        <div className="home-container">
            <Navbar role={role} />
            <div className="home-content">
                <SideBar />
                <h1>Trending</h1>
                <Movie />
            </div>
        </div>


    );
}

export default Home;
