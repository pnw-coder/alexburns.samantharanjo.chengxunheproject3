import React from 'react';
import './Header.css';

export default function Header({ isLoggedIn, username, onLogout }) {
    return (
        <nav className="nav">
            <a href="/" className="title">
                password manager
            </a>
            <ul>
                <li><a href="/">Home</a></li>
                {isLoggedIn ? (
                    <>
                        <li>Welcome, {username}!</li>
                        <li><button onClick={onLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Signup</a></li>
                    </>
                )}
            </ul>
        </nav>
    );
}
