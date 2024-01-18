import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './Login-register.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register(props) {
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [role, setRole] = useState('user'); // Default to 'user'
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(null);

    // Handle profile picture change
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(userName);
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(birthdate);
        console.log(role);
        console.log(profilePicture);
        if (!userName || !pass || !email || !firstName) {
            // Show warning if required fields are empty
            alert("Please fillup all Mandatory fields");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('pass', pass);
            formData.append('birthdate', birthdate);
            formData.append('gender', gender);
            formData.append('role', role);
            formData.append('profilePicture', profilePicture);

            const response = await fetch('http://localhost:5197/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User registered successfully');
                //alert("Registration successful");
                // setProfilePicPath(data.profilePicPath);
                toast.success("Registration successful");
                navigate('/login');
            } else {
                console.error('Error during registration:', data.error);
                // alert(data.error);
                toast.error(data.error);
            }
        } catch (error) {
            console.error('Error during sending register data:', error.message);
        }
    };

    const handlePeopleTypeChange = (peopleType) => {
        // Set the selected user type in the component's state
        setRole(peopleType);

    };
    const handleBirthdateChange = (event) => {
        // Set the birthdate in the component's state
        setBirthdate(event.target.value);

    };

    const handleGenderChange = (event) => {
        // Set the gender in the component's state
        setGender(event.target.value);

    };






    return (
        <div className="loginregister-full-page">
            <div className="auth-form-container">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div>
                            <label htmlFor="userName">Username*</label>
                            <input value={userName} name="userName" onChange={(e) => setUserName(e.target.value)} id="userName" placeholder="username" />
                        </div>
                        <div>
                            <label htmlFor="email">Email*</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourmail@gmail.com" id="email" name="email" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div >
                            <label htmlFor="firstName">First name*</label>
                            <input value={firstName} name="firstName" onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="your name" />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last name</label>
                            <input value={lastName} name="lastName" onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="your name" />
                        </div>
                    </div>
                    <label htmlFor="password">Password*</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***************" id="password" name="password" />

                </form>


                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div>
                        <label >
                            Birthday:
                            <input
                                style={{ marginLeft: '10px', width: '150px', marginRight: '10px' }}
                                type="date"
                                value={birthdate}
                                onChange={handleBirthdateChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Gender:
                            <select value={gender} onChange={handleGenderChange}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label>
                    </div>
                </div>

                <label htmlFor="profilePicture">Profile Picture:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        id="profilePicture"
                        name="profilePicture"
                    />
                </label>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <label>
                        <input
                            type="checkbox"
                            value="user"
                            checked={role === 'user'}
                            onChange={() => handlePeopleTypeChange('user')}
                        />
                        As User
                    </label>

                    {/* Checkbox for "As Moderator" */}

                    <label>
                        <input
                            type="checkbox"
                            value="moderator"
                            checked={role === 'moderator'}
                            onChange={() => handlePeopleTypeChange('moderator')}
                        />
                        As Moderator
                    </label>
                </div>
                {/* <button type="submit" onClick={() => props.onFormSwitch('done')}><Link to='/movie'>Sign Up</Link></button> */}


                <button type="submit" className="sign-inup-button" onClick={handleSubmit} >Sign Up</button>
                {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}
                <Link to='/login'><button className="link-btn" >Already have an account? Login here.</button></Link>

            </div>
        </div>
    )
}
export default Register;