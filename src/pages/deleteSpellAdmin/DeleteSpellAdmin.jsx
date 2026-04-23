import './DeleteSpellAdmin.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import Button from "../../components/button/Button.jsx";
import Form from "../../components/form/Form.jsx";

function DeleteSpellAdmin(){
    const { auth } = useContext(AuthContext);
    const [availableSpells, setAvailableSpells] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSpells(){
            try {
                const response = await axios.get(`http://localhost:8080/spells`,
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                console.log(response.data);
                setAvailableSpells(response.data)
            } catch(e){
                console.error(e);
            }
        }
        fetchSpells();
    }, []);

    async function deleteSpell(e){
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/classes/${selectedSpell}`,
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );
            console.log(response);
            navigate('/admin');
        } catch(e){
            console.error(e);
        }
    }

    return (
        <main className='delete-spell-outer-container'>
            <h1>Delete a Spell</h1>
            <section>
                <Form onSubmit={deleteSpell}>
                    <div className='delete-spell-select'>
                        <label htmlFor='spell'>Choose spell to delete:</label>
                        <select name='spell' id='spell' value={selectedSpell} onChange={(e) => setSelectedSpell(e.target.value)}>
                            <option value="">Select a spell</option>
                            {availableSpells.sort((a, b) => a.spellName > b.spellName ? 1: -1).map(spell => (
                                <option key={spell.id} value={spell.id}>{spell.spellName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='delete-spell-buttons'>
                        <DeleteButton type='button' onClick={() => navigate('/admin')} text='Cancel' />
                        <Button type='submit' text='Confirm' />
                    </div>
                </Form>
            </section>
        </main>
    )
}

export default DeleteSpellAdmin;