import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login-register.css';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import BASE_URL from "../../config/ApiConfig";

function Login({ setAuth }) {
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
            const response = await axios.post(`${BASE_URL}/login`, {
                email,
                pass,
                role
            });

            const data = response.data;

            if (response.status === 200) {
                console.log('User login successfully');
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("email", email);
                    localStorage.setItem("people_id", data.people_id);
                    setAuth(true);
                }

                // alert("Login successful");
                toast.success("Login successful");
                navigate('/');



                // Optionally, you can redirect the user to a different page or perform other actions upon successful registration
            } else {
                toast.error("Login failed");
                setAuth(false);
                console.error('Error during login:', data.error);


            }
        }
        catch (error) {
            toast.error("Login failed");
            setAuth(false);
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
                {/* <button className="link-btn">Forget Password</button> */}

                {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button> */}
                <Link to='/register'><button className="link-btn" >Don't have an account? Register here.</button></Link>


            </div>
        </div>

    )
}
export default Login;