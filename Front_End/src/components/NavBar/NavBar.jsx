import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Link } from 'react-router-dom';

const NavBar = ({ isDarkMode, toggleDarkMode }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handleLogout = () => {
        // Clear user data from localStorage and state
        localStorage.removeItem("userData");
        setUserData(null);
    };

    return (
        <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
            <Link className="navbar-brand" to="/">Movie Search</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/watchlist">WatchList</Link>
                    </li>
                </ul>
            </div>
            <button onClick={toggleDarkMode} className="btn btn-outline-secondary " style={{}}>
                {isDarkMode ? <i class="fa-solid fa-sun" style={{ color: "#fff" }} ></i> : <i class="fa-solid fa-moon" style={{ color: "#000" }}></i>}
            </button>
            <div style={{ gap: "10px", marginRight: "80px" }}>
                {userData ? (
                    <div style={{ display: "flex" }}>
                        <span className="nav-link">{userData.name}</span>
                        <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <SignIn />
                        <SignUp />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
