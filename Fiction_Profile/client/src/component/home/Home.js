import React, { useEffect, useState } from 'react';
import Navbar from '../../config/navbar/Navbar';
import TopMediaBanner from './TopMediaBanner';
import { Movie, TvShow, Book, Manga } from './Media';
import './Home.css'; // Import your CSS file for styling
import { useLocation } from 'react-router-dom';
import SideBar from '../../config/navbar/SideBar';
import Moderator from '../moderator/Moderator';

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
                <div>
                    <Moderator />
                    <h1>Welcome Moderator {email}</h1>
                </div> 
                :
                <div className="home-content">

                    <SideBar />
                    <TopMediaBanner className="top-media-banner" />
                    <div className="home-trending-content">
                       
                        <h1 style={{ paddingTop: '40px' }}>Trending List:</h1>
                        <h1>Movie</h1>
                        <Movie className="media" />
                        <h1>TV</h1>
                        <TvShow className="media" />
                        <h1>Manga</h1>
                        <Manga className="media" />
                        <h1>Book</h1>
                        <Book className="media" />
                    </div>

                </div>
            }
            <Navbar />

        </div>


    );
}

export default Home;
