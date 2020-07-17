import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from '../NavDropdown/NavDropdown';
import './NavBar.css';

class NavBar extends Component {
    state = {
        addDropdownVisible: false,
        viewDropdownVisible: false,
    }

    handleAddLinkClick = () => {
        this.toggleVisibility('addDropdownVisible');
    }

    handleViewLinkClick = () => {
        this.toggleVisibility('viewDropdownVisible');
    }

    toggleVisibility = (dropDownStateStr) => {
        this.resetLinksToHidden();
        this.setState({
            [`${dropDownStateStr}`]: !(this.state[dropDownStateStr]) 
        });
    }

    resetLinksToHidden = () => {
        this.setState({
            addDropdownVisible: false,
            viewDropdownVisible: false,
        });
    }

    render() {
        return (
            <nav>
                {this.props.user ?
                    <div className="navbar-fixed">
                        <nav>
                            <div className="nav-wrapper">
                                <ul className="left hide-on-sm-and-down">
                                    <li>
                                        <Link to='/' onClick={this.resetLinksToHidden}>HOME</Link>
                                    </li>
                                    <li>
                                        <Link onClick={this.handleAddLinkClick}>+ Add</Link>
                                        <NavDropdown 
                                            addDropdownVisible={this.state.addDropdownVisible} 
                                            resetLinksToHidden={this.resetLinksToHidden} 
                                            type='add'
                                        />
                                    </li>
                                    <li>
                                        <Link onClick={this.handleViewLinkClick}>View</Link>
                                        <NavDropdown 
                                            viewDropdownVisible={this.state.viewDropdownVisible} 
                                            resetLinksToHidden={this.resetLinksToHidden} 
                                            type='view'
                                        />
                                    </li>
                                </ul>
                                <ul className="right hide-on-sm-and-down">
                                    <li>
                                        <p className="welcome-message">Welcome, {this.props.user.name}!</p>
                                    </li>
                                    <li>
                                        <Link to='' onClick={this.props.handleLogout}>LOG OUT</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                :
                    <div className="navbar-fixed">
                        <nav>
                            <div className="nav-wrapper">
                                <ul className="right hide-on-sm-and-down">
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
                }
            </nav>
        )
    };
}

export default NavBar;