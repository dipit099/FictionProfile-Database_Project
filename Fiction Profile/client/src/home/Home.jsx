import React from 'react';
import Navbar from '../navbar/Navbar';
import Movie from '../component/Movie';
import './Home.css'; // Import your CSS file for styling
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const email = location.state && location.state.email;
    const role = location.state && location.state.role;
    console.log("in homepage, email "+ email+ " role "+ role);
    
    return (
        <div className="home-container">
            <Navbar role={role} />
            <div className="home-content">
                <h1 style={{ color: 'white', textAlign: 'center' }}>Hello {email}</h1>
                <Movie />
            </div>
        </div>
    );
}

export default Home;
