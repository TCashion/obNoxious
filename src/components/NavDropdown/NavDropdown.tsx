import React from 'react';
import { Link } from 'react-router-dom';
import './NavDropdown.css';

interface NavDropdownProps {
    type: string,
    addDropdownVisible?: boolean, 
    viewDropdownVisible?: boolean,
    resetLinksToHidden: () => void,
}

function NavDropdown(props: NavDropdownProps) {
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
        <div className="card NavDropdown-card" style={dropdownStyle}>
            <div className="card-content">
                <div className="collection">
                    {(props.type === 'add') ?
                        <>
                            <a
                                href="#!"
                                className="collection-item NavDropdown-collection-header"
                            >PLANTS</a>
                            <Link
                                to='/plants/new'
                                className="collection-item sidenav-close"
                                onClick={props.resetLinksToHidden}
                            >New Plant to Database</Link>
                            <a 
                                href="#!"
                                className="collection-item NavDropdown-collection-header"
                            >REPORTS</a>
                            <Link
                                to='/reports/new'
                                className="collection-item sidenav-close"
                                onClick={props.resetLinksToHidden}
                            >Report a Sighting</Link>
                        </>
                        :
                        <></>
                    }
                    {(props.type === 'view') ?
                        <>
                            <a
                                href="#!"
                                className="collection-item NavDropdown-collection-header"
                            >PLANTS</a>
                            <Link
                                to='/plants'
                                className="collection-item sidenav-close"
                                onClick={props.resetLinksToHidden}
                            >All Plants In Database</Link>
                            <a
                                href="#!"
                                className="collection-item NavDropdown-collection-header"
                            >REPORTS</a>
                            <Link
                                to='/reports'
                                className="collection-item sidenav-close"
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