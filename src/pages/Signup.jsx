import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            setError("username can't be empty");
            return;
        }

        if (!password.trim()) {
            setError("password can't be empty");
            return;
        }

        if (password !== confirmPassword) {
            setError("passwords don't match");
            return;
        }

        // Perform signup logic here (e.g., make API request to create new user)
        try {
            await axios.post('/api/users/register', {
                username: username,
                password: password,
            });

            setUsername('');
            setPassword('');
        } catch (error) {
            setError(error.response.data);
        }

        // if signup a success, clear form fields and error state
        setConfirmPassword(''); 
        setError('');
    }

    return (
        <>
            <div className="signup-container">
                <h2>Sign Up ʕ •ᴥ•ʔ </h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="enter your username" id="username" name="username"/>

                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="enter your password" id="password" name="password"/>

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="now confirm it!" id="confirmPassword" name="confirmPassword"/>

                    <button type="submit">Sign Up</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </>
    )
}

export default Signup;
