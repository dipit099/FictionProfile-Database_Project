import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './Login-register.css';
import { toast } from "react-toastify";

function Login(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('user');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        if (!email || !pass) {
            // Show warning if required fields are empty
            alert("Email and password are required.");
            return;
        }
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

            const data = await response.json();

            if (response.ok) {
                console.log('User login successfully');


                alert("Login successful");
                // toast.success("Login successful");
                if (role === 'user') {
                    console.log("in login page email " + email + " role " + role)
                    navigate('/userhome', { state: { email: email, role: role } });
                }
                // if (role === 'moderator') 
                else {
                    navigate('/moderatorhome', { state: { email: data.email, role: role } });
                }


                // Optionally, you can redirect the user to a different page or perform other actions upon successful registration
            } else {

                console.error('Error during login:', data.error);
                alert("Login failed");

            }
        }
        catch (error) {

            console.error('Error during receiving login info:', error.message);
        }

    }


    const handleSetRoleChange = (peopleType) => {
        // Set the selected user type in the component's state
        setRole(peopleType);

    };

    return (
        <div className="loginregister-full-page">
            <div className="auth-form-container">

                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email <span>*</span></label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourmail@gmail.com" id="email" name="email" required />
                    <label htmlFor="password">Password <span>*</span></label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*************" id="password" name="password" required />

                </form>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label >
                        <input
                            type="checkbox"
                            value="user"
                            checked={role === 'user'}
                            onChange={() => handleSetRoleChange('user')}
                        />
                        As User
                    </label>

                    {/* Checkbox for "As Moderator" */}
                    <label>
                        <input
                            type="checkbox"
                            value="moderator"
                            checked={role === 'moderator'}
                            onChange={() => handleSetRoleChange('moderator')}
                        />
                        As Moderator
                    </label>
                </div>

                <button type="submit" className="sign-inup-button" onClick={handleSubmit} >
                    Sign In
                </button>
                <button className="link-btn">Forget Password</button>

                {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button> */}
                <Link to='/register'><button className="link-btn" >Don't have an account? Register here.</button></Link>


            </div>
        </div>

    )
}
export default Login;