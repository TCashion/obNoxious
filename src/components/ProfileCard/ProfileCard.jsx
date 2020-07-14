import React from 'react';
import './ProfileCard.css';

function ProfileCard({ user }) {
    return (
        <div className="row row-center-card">
            <div className="col s12 m7 l4">
                <div className="card large">
                    <div className="card-image">
                        <img id="avatar-large" src="https://via.placeholder.com/200.png?text=Avatar" alt="Avatar" />
                    </div>
                    <div className="card-content">
                        <h3>{user.name}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;