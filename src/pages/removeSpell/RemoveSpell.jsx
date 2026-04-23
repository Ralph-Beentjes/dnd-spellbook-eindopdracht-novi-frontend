import './RemoveSpell.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import Button from "../../components/button/Button.jsx";
import Form from "../../components/form/Form.jsx";

function RemoveSpell(){
    const { auth } = useContext(AuthContext);
    const [spells, setSpells] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSpells() {
            try {
                const response = await axios.get(`http://localhost:8080/spellbooks/${id}`,
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                setSpells(response.data.spells);
                console.log(response.data.spells);
            } catch (e) {
                console.error(e);
            }
        }
        fetchSpells();
    }, [id, auth.token ]);

    async function removeSpell(e){
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/spellbooks/${id}/spells/${selectedSpell}`,
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );
            console.log(response);
            navigate(`/spellbooks/${id}`);
        } catch(e){
            console.error(e);
        }
    }

    return (
        <main className='remove-spell-outer-container'>
            <h1>Remove a Spell</h1>
            <section>
                <Form onSubmit={removeSpell} >
                    <div className='remove-spell-select'>
                        <label htmlFor='spells'>Choose spell to remove:</label>
                        <select name='spells' id='spells' value={selectedSpell} onChange={(e) => setSelectedSpell(e.target.value)}>
                            <option value="">Select a spell</option>
                            {spells.sort((a, b) => a.spellName > b.spellName ? 1: -1).map(spell => (
                                <option key={spell.id} value={spell.id}>{spell.spellName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='remove-spell-buttons'>
                        <DeleteButton type='button' onClick={() => navigate(`/spellbooks/${id}`)} text='Cancel' />
                        <Button type='submit' text='Confirm' />
                    </div>
                </Form>
            </section>
        </main>
    )
}

export default RemoveSpell;