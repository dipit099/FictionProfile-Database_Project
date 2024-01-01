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


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("check");
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



    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="userName">Username</label>
                <input value={userName} name="userName" onChange={(e) => setUserName(e.target.value)} id="userName" placeholder="your name" />

                <label htmlFor="firstName">First name</label>
                <input value={firstName} name="firstName" onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="your name" />
                <label htmlFor="lastName">Last name</label>
                <input value={lastName} name="lastName" onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="your name" />

                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourmail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***************" id="password" name="password" />

            </form>



            <label>Birthday:
                <input
                    type="date"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                />
            </label>

            <label>Gender:
                <select value={gender} onChange={handleGenderChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </label>
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
            {/* <button type="submit" onClick={() => props.onFormSwitch('done')}><Link to='/movie'>Sign Up</Link></button> */}


            <button type="submit" onClick={handleSubmit} >Sign Up</button>
            {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}
            <Link to='/'><button className="link-btn" >Already have an account? Login here.</button></Link>
           
        </div>
    )
}
export default Register;