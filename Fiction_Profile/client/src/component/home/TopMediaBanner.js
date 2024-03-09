import React, { useState, useEffect, useRef } from 'react';
import './TopMediaBanner.css'; // Import your CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection
import BASE_URL from '../../config/ApiConfig';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
function TopMediaBanner() {
    const [topMedia, setTopMedia] = useState([]);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(1);
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const intervalRef = useRef(null);
    const timelimit = 10000;
    const [isActive, setIsActive] = useState(false); // State to control animation
    const role = localStorage.getItem('role');

    useEffect(() => {
        // Fetch top media details from your server
        const fetchTopMedia = async () => {
            try {
                // const response=  await axios.post(`${BASE_URL}/top_media`);
                if (role !== 'moderator') {
                    const response = await fetch(`${BASE_URL}/top_media`);
                    const data = await response.json();
                    setTopMedia(data.topMedia); // Set the top media details received from the server
                    console.log(data.topMedia);
                    setIsActive(true); // Activate animation
                }
            } catch (error) {
                console.error('Error fetching top media details:', error);
            }
        };

        fetchTopMedia();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Move to the next media
            setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % topMedia.length);
        }, timelimit); // Change media every 5 seconds

        return () => clearInterval(interval);
    }, [topMedia]); // Re-run effect if topMedia changes

    const goToPreviousMedia = () => {
        // Move to the previous media
        setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + topMedia.length) % topMedia.length);

        // Clear the current interval and start a new one
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            // Move to the next media
            setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % topMedia.length);
        }, timelimit); // Change media every 4 seconds
    };

    const goToNextMedia = () => {
        // Move to the next media
        setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % topMedia.length);

        // Clear the current interval and start a new one
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            // Move to the next media
            setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % topMedia.length);
        }, timelimit); // Change media every 4 seconds
    };

    const handleClick = () => {
        // Redirect user to the description page of the respective media
        navigate(`/movie/${topMedia[currentMediaIndex].id}`); // Assuming topMedia contains objects with an 'id' property
    };

    return (

        <div className={`banner-container ${isActive ? 'active' : ''}`}>
            {topMedia.length > 0 && (
                <>
                    <img src={topMedia[currentMediaIndex].backdrop_path} alt="Backdrop Image" onClick={handleClick} />


                    <div className="media-banner">


                        <div className="media-banner-button">

                            <GrPrevious onClick={goToPreviousMedia} className="nav-button prev-button" />
                            <GrNext onClick={goToNextMedia} className="nav-button next-button" />
                        </div>

                        <div className="media-details-box">
                            <p className="media-details">{topMedia[currentMediaIndex].title}</p>
                        </div>

                    </div>


                </>

            )}
        </div>
    );
}

export default TopMediaBanner;
