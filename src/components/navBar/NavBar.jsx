import logo from '../../assets/dnd-spellbook-logo.png';
import './NavBar.css';
import Button from '../button/Button.jsx';

function NavBar(){
    return (
        <nav className="main-navigation outer-container">
            <div className="inner-nav-container">
                <img src={logo} alt='Logo van Spellbook D&D' className="logo-image" />
                <div className="nav-buttons">
                    <Button type='button' onClick='nothing' text='Profile' />
                    <Button type='button' onClick='nothing' text='Log out' />
                </div>
            </div>
        </nav>
    )
}

export default NavBar;