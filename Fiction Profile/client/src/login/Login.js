import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login-register.css';


function Login(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('user');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
            const response = await fetch('http://localhost:5197/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    pass,
                    role
                }),
            });
            // console.log("data sent  " + email + pass);
            const data = await response.json();

            if (response.ok) {
                console.log('User login successfully');
                navigate('/movie');
                // Optionally, you can redirect the user to a different page or perform other actions upon successful registration
            } else {
                console.error('Error during login:', data.error);
                // Handle registration errors (e.g., display an error message to the user)
            }
        }
        catch (error) {

            console.error('Error during receiving login info:', error.message);
        }

    }


    const handlePeopleTypeChange = (peopleType) => {
        // Set the selected user type in the component's state
        setRole(peopleType);

    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourmail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*************" id="password" name="password" />
                {/* <Link to='/movie'><button type="submit" onClick={() => props.onFormSwitch('done')}>Sign In</button></Link> */}

            </form>
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
            <button type="submit" onClick={handleSubmit}>Sign In</button>
            {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button> */}
            <Link to='/register'><button className="link-btn" >Don't have an account? Register here.</button></Link>

        </div>

    )
}
export default Login;