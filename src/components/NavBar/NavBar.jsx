import React from 'react';
import { Link } from 'react-router-dom';


function NavBar(props) {
    let nav = props.user ? 
    <div>
        <Link to='' onClick={props.handleLogout}>LOG OUT</Link>
        <br></br>
        <p>
            User: {props.user.name}
        </p>
    </div>
    :
    <div>
        <Link to='/signup'>SIGN UP</Link>
        <br></br>
        <Link to='/login'>LOG IN</Link>
    </div>

    
    return (
        <nav>
            {nav}
        </nav>
    )
}

export default NavBar;