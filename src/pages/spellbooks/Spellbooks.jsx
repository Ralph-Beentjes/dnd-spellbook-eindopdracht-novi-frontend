import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext, useEffect, useState} from "react";
import './Spellbooks.css';
import Button from "../../components/button/Button.jsx";
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CreateSpellbook from "../createSpellbook/CreateSpellbook.jsx";

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
            } catch (e) {
                console.error(e);
            }
        }

        if (auth.profileId) {
            void fetchSpellbooks();
        }
    }, [auth.profileId]);

    return (
        <div className='spellbooks-outer-container'>
            <section className='spellbooks overview'>
                <h1>My Spellbooks</h1>
                <ul className='spellbooks-list'>
                    {spellbooks.map(spellbook => (
                        <li key={spellbook.id}>
                            <div>
                                <span>
                                    <h2>{spellbook.spellbookName} - {spellbook.characterClass}</h2>
                                </span>
                                <p>Click here</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='spellbooks-buttons'>
                    <DeleteButton type='button' text='Delete Spellbook' />
                    <Button type='button' onClick={() => navigate('/create-spellbook')} text='Create Spellbook' />
                </div>
            </section>
        </div>
    )
}

export default Spellbooks;