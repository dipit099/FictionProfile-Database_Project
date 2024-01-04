import React from 'react';
import Navbar from './Navbar';
import Movie from '../component/Movie';
import './Home.css'; // Import your CSS file for styling
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const username = location.state && location.state.username;
    const role = location.state && location.state.role;
    console.log(role + " " + username);
    return (
        <div className="home-container">
            <Navbar isLoggedIn={role} />
            <div className="home-content">
                <h1 style={{ color: 'white', textAlign: 'center' }}>Hello {username}</h1>
                <Movie />
            </div>
        </div>
    );
}

export default Home;
