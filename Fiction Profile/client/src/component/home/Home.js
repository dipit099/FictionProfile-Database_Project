import React, { useEffect, useState } from 'react';
import Navbar from '../../config/navbar/Navbar';
import { Movie, Tvshow, Book, Manga } from './Movie';
import './Home.css'; // Import your CSS file for styling
import { useLocation } from 'react-router-dom';
import SideBar from '../../config/navbar/SideBar';

const Home = () => {
    const [role, setRole] = useState(null);
    const email = localStorage.getItem('email');

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        setRole(storedRole);
    }, []); // Run once when the component mounts



    return (
        <div className="home-container">

            {role === 'moderator' ?
                <h1>Welcome Moderator {email}</h1> :

                <div className="home-content">
                    <SideBar />
                    <h1 style={{ paddingTop: '40px' }}>Trending List:</h1>
                    <h1>Movie</h1>
                    <Movie />
                    <h1>TVShow</h1>
                    <Tvshow />
                    <h1>Manga</h1>
                    <Manga />
                    <h1>Book</h1>
                    <Book />
                </div>

            }
            <Navbar />

        </div>


    );
}

export default Home;
