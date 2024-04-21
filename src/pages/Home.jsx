import React from 'react';
import './Home.css';


function Home(){
    return (
        <>
        <div className="Home">
            <h1 className="title-home"> welcome to your password manager ◡̈ </h1>
            <ul className="password-home"> here are a few things you can do here:</ul>
                <li className> keep track of all your passwords </li>
                <li> create secure passwords </li>
                <li> share passwords in case of emergency</li>
            <p className="creators-credit"> created by: Chengxun He, Alex Burns, and Samantha Ranjo</p>
        </div>
        </>
    );
}

export default Home;