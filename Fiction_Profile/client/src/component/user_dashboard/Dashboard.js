import React, { useState, useEffect } from "react";
import Navbar from "../../config/navbar/Navbar";
import SideBar from "../../config/navbar/SideBar";
import axios from 'axios';
import './Dashboard.css';
import BASE_URL from "../../config/ApiConfig";
import FavoriteList from "./FavoriteList";
import UserPosts from "./UserPosts";
import Affinity from "./Affinity";

const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const [activeSection, setActiveSection] = useState('profile'); // Initially set to 'profile'
    const [peopleId, setPeopleId] = useState(''); // Initially set to 1
    const [userProfileId, setUserProfileId] = useState(''); // Initially set to 1

    // Function to fetch user data using Axios
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard/${peopleId}`);
            setUserData(response.data[0]);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        // Extracting peopleId from URL
        const urlParts = window.location.pathname.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        setPeopleId(lastPart);
    }, []);

    useEffect(() => {
        if (peopleId) {
            fetchUserData();
        }
    }, [peopleId]);

    useEffect(() => {
        // Fetch user's own profile ID from localStorage or wherever you store it
        const userProfileId = localStorage.getItem('people_id');
        setUserProfileId(userProfileId);
    }, []);

    const handleSectionClick = (section) => {
        setActiveSection(section);
    };

    let sectionContent;
    switch (activeSection) {
        case 'profile':
            sectionContent = (
                <div>
                    {/* Your profile content */}
                </div>
            );
            break;
        case 'favorite':
            sectionContent = <FavoriteList />;
            break;
        case 'posts':
            sectionContent = <UserPosts />;
            break;
        case 'affinity':
            sectionContent = (
               <Affinity people_id={peopleId} />
            );
            break;
        default:
            sectionContent = <div>Select a section from the navigation</div>;
    }

    return (
        <div>
            <SideBar />
            <div className="dashboard-container">
                <h1>Dashboard</h1>
                {userData && (
                    <div className="user-profile">
                        <img src={userData.profile_pic_path} alt="Profile" />
                        <div className="user-info">
                            <h2>Username: {userData.username}</h2>
                            <p>Name: {userData.first_name} {userData.last_name}</p>
                            <p>Email: {userData.email}</p>
                            <p>Gender: {userData.gender}</p>
                            <p>Birthdate: {userData.birthdate ? new Date(userData.birthdate).toLocaleDateString() : 'N/A'}</p>
                            <p>Joined Date: {userData.joined_date ? new Date(userData.joined_date).toLocaleDateString() : 'N/A'}</p>
                        </div>
                    </div>
                )}
                <div className="dashboard-navbar">
                    <ul>
                        <li className={activeSection === 'profile' ? 'active' : ''} onClick={() => handleSectionClick('profile')}>
                            Profile
                        </li>
                        <li className={activeSection === 'favorite' ? 'active' : ''} onClick={() => handleSectionClick('favorite')}>
                            Favorites
                        </li>
                        <li className={activeSection === 'posts' ? 'active' : ''} onClick={() => handleSectionClick('posts')}>
                            Posts
                        </li>
                        {peopleId !== userProfileId && ( // Only show "Affinity" when visiting another profile
                            <li className={activeSection === 'affinity' ? 'active' : ''} onClick={() => handleSectionClick('affinity')}>
                                Affinity
                            </li>
                        )}
                        <li className={activeSection === 'activity' ? 'active' : ''} onClick={() => handleSectionClick('activity')}>
                            Activity
                        </li>
                        <li className={activeSection === 'choice' ? 'active' : ''} onClick={() => handleSectionClick('choice')}>
                            Choice
                        </li>
                    </ul>
                </div>
                <div className="dashboard-content">
                    {sectionContent}
                </div>
            </div>
            <Navbar />
        </div>
    );
}

export default Dashboard;
