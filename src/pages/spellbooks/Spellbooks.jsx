import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext, useEffect, useState} from "react";
import './Spellbooks.css';
import Button from "../../components/button/Button.jsx";
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import avatar from "../../assets/placeholder-avatar.png";

function Spellbooks(){
    const { auth } = useContext(AuthContext);
    const [spellbooks, setSpellbooks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSpellbooks(){
            try {
                const response = await axios.get(`http://localhost:8080/users/${auth.profileId}`,
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                setSpellbooks(response.data.spellbooks);
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        }

        if (auth.profileId) {
            void fetchSpellbooks();
        }
    }, [auth.profileId, auth.token]);

    return (
        <div className='spellbooks-outer-container'>
            <main className='spellbooks overview'>
                <h1>My Spellbooks</h1>
                <ul className='spellbooks-list'>
                    {spellbooks.sort((a, b) => a.spellbookName.localeCompare(b.spellbookName)).map(spellbook => (
                        <li key={spellbook.id}>
                            <article className='spellbooks-element'>
                                <div className='spellbooks-avatar'>
                                    <img src={avatar} alt='placeholder-image' className='avatar-image' />
                                </div>
                                <div className='spellbooks-information'>
                                    <span>
                                    <h2>{spellbook.spellbookName}</h2>
                                    </span>
                                    <span>
                                    <h3>Level {spellbook.level} {spellbook.characterClass.className}</h3>
                                    </span>
                                    <div>
                                        <Button type='button' onClick={() => navigate(`/spellbooks/${spellbook.id}`)} text='Open Spellbook' />
                                    </div>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
                <div className='spellbooks-buttons'>
                    <DeleteButton type='button' text='Delete Spellbook' />
                    <Button type='button' onClick={() => navigate('/create-spellbook')} text='Create Spellbook' />
                </div>
            </main>
        </div>
    )
}

export default Spellbooks;