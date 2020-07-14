import React from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

function HomePage(props) {
    return (
        <div>
            <h1>Dashboard:</h1>
            <ProfileCard user={props.user}/>
        </div>
    )
}

export default HomePage;