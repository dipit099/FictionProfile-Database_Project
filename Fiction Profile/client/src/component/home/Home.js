import React from 'react';
import Navbar from '../../config/navbar/Navbar';
import { Movie, Tvshow, Book, Manga } from './Movie';
import './Home.css'; // Import your CSS file for styling
import { useLocation } from 'react-router-dom';
import SideBar from '../../config/navbar/SideBar';

const Home = () => {
    
    let role = null;
    const email = localStorage.getItem('email');
    role = localStorage.getItem('role');
    console.log("in homepage, email " + email + " role " + role);

    return (
        <div className="home-container">
            <Navbar role={role} />
            {role === 'moderator' ?
                <h1>Welcome Moderator {email}</h1> :
                
                <div className="home-content">
                    <SideBar />
                    <h1 style={{ paddingTop: '40px' }}>Trending List:</h1>
                    <h1>Movie</h1>
                    <Movie />
                    <h1>TvShow</h1>
                    <Tvshow />
                    <h1>Manga</h1>
                    <Manga />
                    <h1>Book</h1>
                    <Book />
                </div>
            }

        </div>


    );
}

export default Home;
