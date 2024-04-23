import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //username empty?
        if (!username.trim()) {
            setError("username can't be empty");
            return;
        }

        //password empty?
        if (!password.trim()) {
            setError("password can't be empty");
            return;
        }

        //login logic here (e.g., make API request to validate user credentials)
        try {
            // Send a POST request to the login endpoint
            const response = await axios.post('/api/users/login', { username, password });

            // If log is successful, redirect to password manager page
            if (response.status === 200) {
                navigate('/passwordpage');
            } else {
                setError('Username and/or password is invalid.');
            }
        } catch (error) {
            setError(error.response.data);
        }

        // //assuming login is successful if username is not empty
        // if (username) {
        //     // Redirect to password manager page
        //     history.push('/password-manager');
        //     // CHANGE TO PASSWORD MANAGER NAME OF PAGE
        
        // } else {
        //     //username empty/doesn't exist
        //     setError("username and/or password is invalid!");
        // }
    }

    return (
        <>
            <div className="login-container">
                <h2>Login (•‿•) </h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="enter username" id="username" name="username"/>

                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password"/>

                    <button type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </>
    )
}

export default Login;
