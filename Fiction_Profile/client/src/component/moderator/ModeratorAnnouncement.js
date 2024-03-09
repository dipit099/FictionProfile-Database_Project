import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModeratorAnnouncement.css'; // Import your CSS file for styling
import BASE_URL from "../../config/ApiConfig";
import SideBar from '../../config/navbar/SideBar';
import Navbar from '../../config/navbar/Navbar';

const Moderator = () => {
    // State variables
    const [reports, setReports] = useState([]);

    // Fetch reports from the backend API
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/moderator/`);
                setReports(response.data.reports);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []); // Empty dependency array means this effect runs only once after the component mounts



    return (
        <div className="moderator-container">
            <SideBar />
            <Navbar />


        </div>
    );
};

export default Moderator;