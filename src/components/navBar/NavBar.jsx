import logo from '../../assets/dnd-spellbook-logo.png';
import './NavBar.css';
import Button from '../button/Button.jsx';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function NavBar(){
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="main-navigation">
            <div className="inner-nav-container">
                <img src={logo} alt='Logo van Spellbook D&D' className="logo-image" />
                <div className="nav-buttons">
                    <Button type='button' onClick={() => navigate('/')} text='Home' />
                    <Button type='button' onClick={() => navigate('/profile')} text='Profile' />
                    <Button type='button' onClick={logout} text='Log out' />
                </div>
            </div>
        </nav>
    )
}

export default NavBar;