import React from 'react';
import { Link } from 'react-router-dom';
import './NavDropdown.css';


function NavDropdown({addDropdownVisible, resetAddLinkHidden}) {
    const dropdownStyle = {
        display: addDropdownVisible ? 'block' : 'none', 
    };

    return (
        <div className="card dropdown-card" style={dropdownStyle}>
            <div className="card-content">
                <div className="collection">
                    <Link 
                        to='/plants/new' 
                        className="collection-item"
                        onClick={resetAddLinkHidden}
                    >New Plant to Database</Link>
                    <Link 
                        to='/reports/new' 
                        className="collection-item"
                        onClick={resetAddLinkHidden}
                    >New Report</Link>
                </div>
            </div>
        </div>
    );
}

export default NavDropdown;