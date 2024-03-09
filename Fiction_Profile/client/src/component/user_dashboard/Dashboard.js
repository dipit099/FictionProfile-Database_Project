import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../config/navbar/Navbar";
import SideBar from "../../config/navbar/SideBar";
import axios from 'axios';
import './Dashboard.css';
import BASE_URL from "../../config/ApiConfig";
import FavoriteList from "./FavoriteList";
import UserPosts from "./UserPosts";
import Affinity from "./Affinity";
import DashboardProfile from "./DashboardProfile";
import Follow from "./Follow";
import MediaList from "./MediaList";

const Dashboard = () => {
    const location = useLocation();
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
        const urlParts = location.pathname.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        setPeopleId(lastPart);
    }, [location]);

    useEffect(() => {
        if (peopleId) {
            fetchUserData();
        }
    }, [peopleId]);

    useEffect(() => {
        // Fetch user's own profile ID from localStorage or wherever you store it
        const userProfileId = localStorage.getItem('people_id');
        setUserProfileId(userProfileId);
    }, [localStorage.getItem('people_id')]);

    const handleSectionClick = (section) => {
        setActiveSection(section);
    };

    let sectionContent;
    switch (activeSection) {
        case 'profile':
            sectionContent = (<DashboardProfile userData={userData} />);
            break;
        case 'favorite':
            sectionContent = <FavoriteList />;
            break;
        case 'posts':
            sectionContent = <UserPosts />;
            break;
        case 'activity':
            sectionContent = (
                <div>
                    {/* Your activity content */}
                </div>
            );
            break;
        case 'media_list':
            sectionContent = (
                <MediaList />
            );
            break;

        case 'affinity':
            sectionContent = (
                <Affinity people_id={peopleId} />
            );
            break;
        case 'suggestions':
            sectionContent = (
                <div>
                    {/* Your suggestions content */}
                </div>
            );
            break;
        case 'follow':
            sectionContent = (
                <Follow />
            );
            break;
        default:
            sectionContent = <div>Select a section from the navigation</div>;
    }

    return (
        <div>
            <SideBar />
            <div className="dashboard-container">
                {userData && (
                    <div className="user-profile">
                        <img src={userData.profile_pic_path} alt="Profile" />

                        <div className="dashboard-user-info">
                            <div>Username: {userData.username}</div>
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
                        {/* <li className={activeSection === 'activity' ? 'active' : ''} onClick={() => handleSectionClick('activity')}>
                            Activity
                        </li> */}

                        <li className={activeSection === 'media_list' ? 'active' : ''} onClick={() => handleSectionClick('media_list')}>
                            Media List
                        </li>

                        {peopleId !== userProfileId && (
                            <li className={activeSection === 'affinity' ? 'active' : ''} onClick={() => handleSectionClick('affinity')}>
                                Affinity
                            </li>
                        )}
                        {/* {peopleId === userProfileId && (
                            <li className={activeSection === 'suggestions' ? 'active' : ''} onClick={() => handleSectionClick('suggestions')}>
                                Suggestions
                            </li>
                        )} */}

                        <li className={activeSection === 'follow' ? 'active' : ''} onClick={() => handleSectionClick('follow')}>
                            Follow
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
