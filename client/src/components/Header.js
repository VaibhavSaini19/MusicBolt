import React from 'react';

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
                        <div  className="nav-link" >
                            Home
                        </div>
                    </li>
                    <li className="nav-item mr-5">
                        <div  className="nav-link" >
                            About
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link" >
                            Log In
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header