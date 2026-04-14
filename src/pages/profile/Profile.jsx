import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import './Profile.css';

function Profile(){
    const { auth } = useContext(AuthContext);

    return (
        <div className='profile-outer-container'>
            <section className='personal-details'>
                <h2>Personal details:</h2>
                <div className='personal-details-info'>
                    <span>
                        <p><strong>Username:</strong></p><p>{auth.user?.preferred_username}</p>
                    </span>
                    <span>
                        <p><strong>First name:</strong></p><p>{auth.user?.given_name}</p>
                    </span>
                    <span>
                        <p><strong>Last name:</strong></p><p>{auth.user?.family_name}</p>
                    </span>
                </div>
            </section>
        </div>
    )
}

export default Profile;