import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Login-register.css';


function Register(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);

    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="your name" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourmail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***************" id="password" name="password" />
                {/* <button type="submit" onClick={() => props.onFormSwitch('done')}><Link to='/movie'>Sign Up</Link></button> */}
                <Link to='/movie'><button type="submit" >Sign Up</button></Link>
            </form>
            {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}
            <Link to='/'><button className="link-btn" >Already have an account? Login here.</button></Link>
        </div>
    )
}
export default Register;