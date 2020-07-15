import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


function NavBar(props) {
    let nav = props.user ?
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <ul className="left hide-on-med-and-down">
                        <li>
                            <Link to='/reports/new'>Create New Report</Link>
                        </li>
                        <li>
                            <Link to='/plants/new'>Add Plant to Database</Link>
                        </li>
                    </ul>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <Link to='' onClick={props.handleLogout}>LOG OUT</Link>
                        </li>
                        <li>
                            <p className="welcome-message">Welcome, {props.user.name}!</p>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        :
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <Link to='/signup'>SIGN UP</Link>
                        </li>
                        <li>
                            <Link to='/login'>LOG IN</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>


    return (
        <nav>
            {nav}
        </nav>
    )
}

export default NavBar;