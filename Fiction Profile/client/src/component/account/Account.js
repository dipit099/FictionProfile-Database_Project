import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import BASE_URL from "../../config/ApiConfig";
import './Account.css';
import SideBar from "../../config/navbar/SideBar";
import Navbar from "../../config/navbar/Navbar";
const Account = () => {

    const people_id = localStorage.getItem('people_id');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [role, setRole] = useState('user');
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicPath, setProfilePicPath] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data when the component mounts
        fetchUserData();
    }, []);



    const fetchUserData = async () => {
        try {
            console.log(people_id);

            // const response = await axios.get(`${BASE_URL}/account`);
            const response = await axios.get(`${BASE_URL}/account`, {
                params: {
                    people_id: people_id
                }
            });

            const userData = response.data;
            setUserName(userData.username);
            setFirstName(userData.first_name);
            setLastName(userData.last_name);
            setGender(userData.gender);
            setEmail(userData.email);
            setPass(userData.pass);
            setBirthdate(userData.birthdate);
            setRole(userData.role);
            setProfilePicPath(userData.profile_pic_path);

            //check if dat was obtained
            // console.log(userData);

            // You may need additional logic for handling profile picture


        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'userName':
                setUserName(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'pass':
                setPass(value);
                break;
            case 'birthdate':
                setBirthdate(value);
                break;
            case 'gender':
                setGender(value);
                break;
            default:
            // Handle other input fields if needed
        }

    };


    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);

        // Use FileReader to read the selected file as a data URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicPath(reader.result); // Set the data URL as the profile picture path
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic goes here

        try {
            console.log(profilePicture);

            const formData = new FormData();
            formData.append('people_id', people_id);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('birthdate', birthdate);
            formData.append('gender', gender);
            formData.append('profilePicture', profilePicture);

            const response = await axios.post(`${BASE_URL}/account/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = await response.data;
            if (response.status === 200) {
                console.log('Profile updated successfully:');
                toast.success("Profile updated successfully");
            } else {
                console.error('Error during profile update:', response.data.error);
                toast.error(response.data.error);
            }
        } catch (error) {
            console.error('Error during profile update:', error.message);
        }
    };


    const handleBirthdateChange = (e) => {
        setBirthdate(e.target.value);
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }

    const handlePeopleTypeChange = (role) => {
        setRole(role);
    }

    return (
        <>
            <Navbar />
            <SideBar />
            <div className="account">
                <div className="account-container">
                    <div className="account-headline">Account Settings</div>
                    <form className="account-form" onSubmit={handleSubmit}>
                        <div className="username-container">
                            <div>Username: {userName}</div>
                        </div>
                        <div className="profile-pic-container">
                            <img src={profilePicPath} alt="profile pic" className="profile-pic" />
                        </div>
                        <div className="profile-pic-select">
                            <label htmlFor="profilePicture">Profile Picture:
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    id="profilePicture"
                                    name="profilePicture"
                                    className="profile-pic-input"
                                />
                            </label>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <input value={firstName} name="firstName" onChange={handleInputChange} id="firstName" placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <input value={lastName} name="lastName" onChange={handleInputChange} id="lastName" placeholder="Your Last Name" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="birthdate">Birthdate:</label>
                                <input
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    value={birthdate ? new Date(birthdate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                />
                            </div>
                            <div className="form-row">
                                <label>Gender:
                                    <select value={gender} onChange={handleGenderChange}>
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </label>
                            </div>

                        </div>

                        <div className="form-button">
                            <button type="submit" className="update-button">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default Account;