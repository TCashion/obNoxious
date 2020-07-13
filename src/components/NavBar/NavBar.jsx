import React from 'react';
import { Link } from 'react-router-dom';


function NavBar(props) {
    let nav = props.user ? 
    <div>
        <Link to='' onClick={props.handleLogout}>LOG OUT</Link>
    </div>
    :
    <div>
        <Link to='/signup'>SIGN UP</Link>
        <Link to=''>LOG IN</Link>
    </div>

    
    return (
        <nav>
            {nav}
        </nav>
    )
}

export default NavBar;