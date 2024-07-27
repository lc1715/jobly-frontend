import React, { useContext } from "react";
import UserContext from "./UserContext";
import { Link } from 'react-router-dom'

import './NavBar.css'


const NavBar = () => {
    let { currentUser, userLogOut } = useContext(UserContext)

    if (currentUser) {
        return (
            <nav className="navbar navbar-expand-lg" data-bs-theme="light">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand" href="#">Jobly</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to='/companies' className="nav-link" href="#">Companies</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/jobs' className="nav-link" href="#">Jobs</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/profile' className="nav-link" href="#">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/' onClick={userLogOut} className="nav-link" href="#">
                                    Log Out - {currentUser.username}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg" data-bs-theme="light">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand" href="#">Jobly</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to='/login' className="nav-link" href="#">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/signup' className="nav-link" href="#">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;

