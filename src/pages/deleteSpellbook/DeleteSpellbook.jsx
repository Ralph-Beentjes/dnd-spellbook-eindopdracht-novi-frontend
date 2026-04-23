import './DeleteSpellbook.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import Form from "../../components/form/Form.jsx";

function DeleteSpellbook(){
    const { auth } = useContext(AuthContext);
    const [spellbooks, setSpellbooks] = useState([]);
    const [selectedSpellbook, setSelectedSpellbook] = useState('');

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

    async function deleteSpellbook(e){
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/spellbooks/${selectedSpellbook}`,
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );
            console.log(response);
            navigate('/spellbooks');
        } catch(e){
            console.error(e);
        }
    }

    return (
        <main className='delete-spellbook-outer-container'>
            <h1>Delete a Spellbook</h1>
            <section>
                <Form onSubmit={deleteSpellbook} >
                    <div className='delete-spellbook-select'>
                        <label htmlFor='spellbook'>Choose Spellbook to delete:</label>
                        <select name='spellbook' id='spellbook' value={selectedSpellbook} onChange={(e) => setSelectedSpellbook(e.target.value)}>
                            <option value="">Select a Spellbook</option>
                            {spellbooks.sort((a, b) => a.spellbookName > b.spellbookName ? 1: -1).map(spellbook => (
                                <option key={spellbook.id} value={spellbook.id}>{spellbook.spellbookName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='delete-spellbook-buttons'>
                        <DeleteButton type='button' onClick={() => navigate('/spellbooks')} text='Cancel' />
                        <Button type='submit' text='Confirm' />
                    </div>
                </Form>
            </section>
        </main>
    )
}

export default DeleteSpellbook;