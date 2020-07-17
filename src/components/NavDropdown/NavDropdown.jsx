import React from 'react';
import { Link } from 'react-router-dom';
import './NavDropdown.css';


function NavDropdown(props) {
    let dropdownStyle;
    if (props.type === 'add') {
        dropdownStyle = {
            display: props.addDropdownVisible ? 'block' : 'none', 
        };
    };
    if (props.type === 'view') {
        dropdownStyle = {
            display: props.viewDropdownVisible ? 'block' : 'none', 
        };
    };

    return (
        <div className="card dropdown-card" style={dropdownStyle}>
            <div className="card-content">
                <div className="collection">
                    {(props.type === 'add') ? 
                        <>
                            <Link 
                                to='/plants/new' 
                                className="collection-item"
                                onClick={props.resetLinksToHidden}
                            >New Plant to Database</Link>
                            <Link 
                                to='/reports/new' 
                                className="collection-item"
                                onClick={props.resetLinksToHidden}
                            >Report a Sighting</Link>
                        </>
                    :
                        <></>
                    }
                    {(props.type === 'view') ? 
                        <>
                            <Link 
                                to='/plants' 
                                className="collection-item"
                                onClick={props.resetLinksToHidden}
                            >All Plants In Database</Link>
                            <Link 
                                to='' 
                                className="collection-item"
                                onClick={props.resetLinksToHidden}
                            >All User Reports</Link>
                        </>
                    :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default NavDropdown;