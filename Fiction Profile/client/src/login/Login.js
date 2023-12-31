import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Login-register.css';


function Login(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);

    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourmail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*************" id="password" name="password" />
                {/* <Link to='/movie'><button type="submit" onClick={() => props.onFormSwitch('done')}>Sign In</button></Link> */}
                <Link to='/movie'><button type="submit" >Sign In</button></Link>
            </form>
            {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button> */}
            <Link to='/register'><button className="link-btn" >Don't have an account? Register here.</button></Link>
            
        </div>

    )
}
export default Login;