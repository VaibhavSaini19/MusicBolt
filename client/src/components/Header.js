import React from 'react';
import { Link } from 'react-router-dom';


function Header(){
    return (
        <nav className="navbar navbar-expand-lg px-5">
            <div className="navbar-brand" >
                Navbar
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-5">
                        <Link to={'/'} className="nav-link" >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item mr-5">
                        <Link to={'/about'} className="nav-link" >
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/users/login'} className="nav-link" >
                            Log In
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header