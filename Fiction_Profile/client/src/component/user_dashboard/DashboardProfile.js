import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Dashboard.css';
import BASE_URL from "../../config/ApiConfig";
import './DashboardProfile.css';

const DashboardProfile = ({ userData }) => {
    const people_id = localStorage.getItem('people_id');

    const [generalCounts, setGeneralCounts] = useState({
        posts: 0,
        favorites: 0,
        followers: 0,
        following: 0
    });

    const [mediaListCounts, setMediaListCounts] = useState({
        read: 0,
        plan: 0,
        currently: 0
    });

    const total = parseInt(mediaListCounts.read) + parseInt(mediaListCounts.plan) + parseInt(mediaListCounts.currently);


    const calculatePercentage = (value) => {
        return Math.round((value / total) * 100) + '%';

    };

    const fetchGeneralCounts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/general_counts/${people_id}`);
            setGeneralCounts(response.data[0]);
            console.log('General counts:', response.data[0]);
        } catch (error) {
            console.error('Error fetching general counts:', error);
        }
    }

    const fetchMediaListCounts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/media_list_count/${people_id}`);
            setMediaListCounts(response.data[0]);
            console.log('Media list counts:', response.data[0]);
        } catch (error) {
            console.error('Error fetching media list counts:', error);
        }
    }

    useEffect(() => {
        fetchMediaListCounts();
        fetchGeneralCounts();
    }, [people_id]);

    return (
        <div className="dashboardprofile-div">
            <div className="dashboardprofile-user-info">
                <div className="dashboardprofile-user-info-left">
                    <p>Name: {userData.first_name} {userData.last_name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Gender: {userData.gender}</p>
                    <p>Birthdate: {userData.birthdate ? new Date(userData.birthdate).toLocaleDateString() : 'N/A'}</p>
                    <p>Joined Date: {userData.joined_date ? new Date(userData.joined_date).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>
            <div className="dashboardprofile-generalcount-list">
                <h2>Stats:</h2>
                <p>Posts: {generalCounts.posts}</p>
                <p>Favorites: {generalCounts.favorites}</p>
                <p>Followers: {generalCounts.followers}</p>
                <p>Following: {generalCounts.following}</p>

            </div>
            <div className="dashboardprofile-addstat-list">
                <div className="bar-container">
                    <div className={`bar-green`} style={{ width: calculatePercentage(mediaListCounts.read) }}></div>
                    <div className={`bar-yellow`} style={{ width: calculatePercentage(mediaListCounts.plan) }}></div>
                    <div className={`bar-red`} style={{ width: calculatePercentage(mediaListCounts.currently) }}></div>
                </div>
                <div>
                    <div className="counts">
                        <div><span className="green-dot"></span>Read: {mediaListCounts.read}</div>
                        <div><span className="yellow-dot"></span>Plan: {mediaListCounts.plan}</div>
                        <div><span className="red-dot"></span>Currently: {mediaListCounts.currently}</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashboardProfile;