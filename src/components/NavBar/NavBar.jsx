import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import NavDropdown from '../NavDropdown/NavDropdown';
import SideNav from '../SideNav/SideNav';
import './NavBar.css';

class NavBar extends Component {
    state = {
        addDropdownVisible: false,
        viewDropdownVisible: false,
    }

    componentDidMount = () => {
        this.initializeSideNav()
    }

    handleAddLinkClick = () => {
        this.toggleVisibility('addDropdownVisible');
    }

    handleViewLinkClick = () => {
        this.toggleVisibility('viewDropdownVisible');
    }

    initializeSideNav = () => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
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
            <>
                <nav>
                    {this.props.user ?
                        <div className="navbar-fixed">
                            <nav>
                                <div className="nav-wrapper">
                                    <a href="#!" data-target="slide-out" className="sidenav-trigger left NavBar-menu-icon show-on-sm"><i className="material-icons">menu</i></a>
                                    <ul className="left hide-on-sm-and-down">
                                        <li>
                                            <Link to='/' onClick={this.resetLinksToHidden}>HOME</Link>
                                        </li>
                                        <li>
                                            <a href='#!' onClick={this.handleAddLinkClick}>+ Add</a>
                                            <NavDropdown
                                                addDropdownVisible={this.state.addDropdownVisible}
                                                resetLinksToHidden={this.resetLinksToHidden}
                                                type='add'
                                            />
                                        </li>
                                        <li>
                                            <a href='#!' onClick={this.handleViewLinkClick}>View</a>
                                            <NavDropdown
                                                viewDropdownVisible={this.state.viewDropdownVisible}
                                                resetLinksToHidden={this.resetLinksToHidden}
                                                type='view'
                                            />
                                        </li>
                                    </ul>
                                    <ul className="right hide-on-sm-and-down">
                                        <li>
                                            <p className="NavBar-welcome-message">Welcome, {this.props.user.name}!</p>
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
                            <a href="#!" data-target="slide-out" className="sidenav-trigger left NavBar-menu-icon show-on-sm"><i className="material-icons">menu</i></a>
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
                <SideNav 
                    {...this.props}
                    addDropdownVisible={this.state.addDropdownVisible}
                    handleAddLinkClick={this.handleAddLinkClick}
                    handleViewLinkClick={this.handleViewLinkClick}
                    resetLinksToHidden={this.resetLinksToHidden}
                    viewDropdownVisible={this.state.viewDropdownVisible}
                />
            </>
        )
    };
}

export default NavBar;