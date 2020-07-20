import React from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from '../NavDropdown/NavDropdown';

function SideNav(props) {
    return (
        <>
            <ul id="slide-out" className="left sidenav">
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
                    <p className="NavBar-welcome-message">Welcome, {props.user.name}!</p>
                </li>
                <li>
                    <Link to='' onClick={props.handleLogout}>LOG OUT</Link>
                </li>
            </ul>
        </>
    )
}

export default SideNav;