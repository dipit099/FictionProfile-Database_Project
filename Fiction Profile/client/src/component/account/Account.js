import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import BASE_URL from "../../config/ApiConfig";
import './Account.css';
import SideBar from "../../config/navbar/SideBar";

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
            console.log("peopleid" + people_id);

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
            console.log(userData);

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
        console.log(file);
        setProfilePicture(file);
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

            if (response.status === 200) {
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
        
           
            <div className="account-container">
                <div className="account-header">
                    <h1>Account Settings</h1>
                </div>
                <div className="account-details">
                    <div className="username-section">
                        <h3>Username: {userName}</h3>
                    </div>
                    <div className="profile-picture-section">
                        <img src={profilePicPath} alt="Profile" className="profile-picture" />
                    </div>
                    <form className="account-form" onSubmit={handleSubmit}>
                        {/* Rest of the form fields... */}
                        <div className="form-section">
                            <label htmlFor="profilePicture">Profile Picture:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                id="profilePicture"
                                name="profilePicture"
                            />
                        </div>
                        <button type="submit" className="update-profile-button">Update Profile</button>
                    </form>
                </div>
            </div>
        
    );
};

export default Account;
