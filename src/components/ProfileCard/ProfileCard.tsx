import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileCard.css';

interface UserProps {
    user: {
        name: string,
    }
}

function ProfileCard({ user }: UserProps) {
    return (
        <div className="row row-center-card">
            <div className="col s12 m7 l4">
                <div className="card large">
                    <div className="card-image">
                        <img id="avatar-large" src="https://via.placeholder.com/200.png?text=Avatar" alt="Avatar" />
                    </div>
                    <div className="card-content">
                        <h3>{user.name}</h3>
                        <Link to='/password'>Change Password</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;