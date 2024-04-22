import React, { useState } from 'react';
import './Login.css';

const Login = ({ history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
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

        //assuming login is successful if username is not empty
        if (username) {
            // Redirect to password manager page
            history.push('/password-manager');
            // CHANGE TO PASSWORD MANAGER NAME OF PAGE
        
        } else {
            //username empty/doesn't exist
            setError("username and/or password is invalid!");
        }
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
