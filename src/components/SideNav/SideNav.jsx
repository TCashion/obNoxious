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
                        <p className="NavBar-welcome-message">Welcome, {props.user.name}!</p>
                    </li>
                    <li>
                        <Link to='/' onClick={props.resetLinksToHidden}>HOME</Link>
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
                        <Link to='/login' onClick={props.handleLogout}>LOG OUT</Link>
                    </li>
                </ul>
                :
                <ul id="slide-out" className="left sidenav">
                    <li>
                        <Link to='/signup'>SIGN UP</Link>
                    </li>
                    <li>
                        <Link to='/login'>LOG IN</Link>
                    </li>
                </ul>
            }
        </>
    )
}

export default SideNav;