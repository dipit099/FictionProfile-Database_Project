import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './Login-register.css';


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
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userName || !pass || !email || !gender || !birthdate) {
            // Show warning if required fields are empty
            alert("Please fillup all Mandatory fields");
            return;
        }
        console.log(userName);
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(birthdate);
        console.log(role);
        try {
            const response = await fetch('http://localhost:5197/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    firstName,
                    lastName,
                    email,
                    pass,
                    birthdate,
                    gender,
                    role,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User registered successfully');
                alert("Registration successful");
                navigate('/');
                // Optionally, you can redirect the user to a different page or perform other actions upon successful registration
            } else {
                alert("Registration failed");
                console.error('Error during registration:', data.error);
                // Handle registration errors (e.g., display an error message to the user)
            }
        }
        catch (error) {
            console.error('Error during sending register data:', error.message);
        }

    }


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



    // Handle profile picture change


    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div>
                        <label htmlFor="userName">Username <span>*</span></label>
                        <input value={userName} name="userName" onChange={(e) => setUserName(e.target.value)} id="userName" placeholder="username"   />
                    </div>
                    <div>
                        <label htmlFor="email">Email <span>*</span></label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourmail@gmail.com" id="email" name="email"   />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div >
                        <label htmlFor="firstName">First name <span>*</span></label>
                        <input value={firstName} name="firstName" onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="your name"  />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last name</label>
                        <input value={lastName} name="lastName" onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="your name" />
                    </div>
                </div>

                <label htmlFor="password">Password <span>*</span></label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***************" id="password" name="password"   />

            </form>


            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <div>
                    <label >
                        Birthday *
                        <input
                            style={{ marginLeft: '10px', width: '150px', marginRight: '10px' }}
                            type="date"
                            value={birthdate}
                            onChange={handleBirthdateChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Gender *
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
            <Link to='/'><button className="link-btn" >Already have an account? Login here.</button></Link>

        </div>
    )
}
export default Register;