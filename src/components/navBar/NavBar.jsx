import logo from '../../assets/dnd-spellbook-logo.png';
import './NavBar.css';
import Button from '../button/Button.jsx';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function NavBar(){
    const { auth, logout } = useContext(AuthContext);

    const isAdmin = auth.roles.includes('ROLE_ADMIN');

    const navigate = useNavigate();

    return (
        <nav className="main-navigation">
            <div className="inner-nav-container">
                <img src={logo} alt='Logo van Spellbook D&D' className="logo-image" />
                {auth.isAuth && (
                    <div className="nav-buttons">
                        {isAdmin && <Button type='button' onClick={() => navigate('/admin')} text='Admin' />}
                        <Button type='button' onClick={() => navigate('/spellbooks')} text='Spellbooks' />
                        <Button type='button' onClick={() => navigate('/profile')} text='Profile' />
                        <Button type='button' onClick={logout} text='Log out' />
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar;