import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';
import NavDropdown from '../NavDropdown/NavDropdown';

function SideNav(props) {
    return (
        <>
            {props.user ?
                <ul id="slide-out" className="left sidenav">
                    <li>
                        <li className="SideNav-logo-li">
                            <div className="SideNav-logo-container">
                                <img className="SideNav-logo" src="https://i.imgur.com/NMGuA3T.png" alt="Logo" />
                            </div>
                        </li>
                        <p className="NavBar-welcome-message">Welcome, {props.user.name}!</p>
                    </li>
                    <li>
                        <Link
                            className="sidenav-close"
                            onClick={props.resetLinksToHidden}
                            to='/'
                        >HOME</Link>
                    </li>
                    <li>
                        <a href='#!' onClick={props.handleAddLinkClick}>+ Add</a>
                        <NavDropdown
                            addDropdownVisible={props.addDropdownVisible}
                            resetLinksToHidden={props.resetLinksToHidden}
                            type='add'
                        />
                    </li>
                    <li>
                        <a href='#!' onClick={props.handleViewLinkClick}>View</a>
                        <NavDropdown
                            viewDropdownVisible={props.viewDropdownVisible}
                            resetLinksToHidden={props.resetLinksToHidden}
                            type='view'
                        />
                    </li>
                    <li>
                        <Link
                            className="sidenav-close"
                            onClick={props.handleLogout}
                            to='/login'
                        >LOG OUT</Link>
                    </li>
                </ul>
                :
                <ul id="slide-out" className="left sidenav">
                    <li>
                        <Link
                            className="sidenav-close"
                            to='/signup'
                        >SIGN UP</Link>
                    </li>
                    <li>
                        <Link
                            className="sidenav-close"
                            to='/login'>LOG IN</Link>
                    </li>
                </ul>
            }
        </>
    )
}

export default SideNav;