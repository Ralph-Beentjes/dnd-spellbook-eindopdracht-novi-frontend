import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/button/Button.jsx';
import './Home.css';

function Home() {
    const { auth, login } = useContext(AuthContext);

    if (auth.status === 'pending') {
        return <p>Loading...</p>;
    }

    if (!auth.isAuth) {
        return (
            <div className='home-outer-container'>
                <h1>Welcome to the D&D Spellbook App!</h1>
                <p><strong>Please log in to continue</strong></p>
                <Button type='button' onClick={login} text='Login or Register' />
            </div>
        );
    }

    return (
        <div className='home-outer-container'>
            <h1>Welcome back, {auth.user?.given_name} {auth.user?.family_name}</h1>
        </div>
    );
}

export default Home;