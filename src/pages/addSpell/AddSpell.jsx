import './AddSpell.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import Button from "../../components/button/Button.jsx";
import Form from "../../components/form/Form.jsx";

function AddSpell(){
    const { auth } = useContext(AuthContext);
    const [spell, setSpell] = useState('');
    const [level, setLevel] = useState('');
    const [spells, setSpells] = useState([]);
    const [spellbookClass, setSpellbookClass] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchSpellbook() {
            try {
                const response = await axios.get(`http://localhost:8080/spellbooks/${id}`,
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                console.log(response.data);
                setSpellbookClass(response.data.characterClass.id);
            } catch (e) {
                console.error(e);
            }
        }
        fetchSpellbook();
    }, [id, auth.token]);


    useEffect(() => {
        async function fetchSpells() {
            if (!level || !spellbookClass) return;
            try {
                const response = await axios.get(
                    `http://localhost:8080/spells/level/${level}/class/${spellbookClass}`,
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                setSpells(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchSpells();
    }, [level, spellbookClass, auth.token]);

    async function updateSpellbook(e){
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:8080/spellbooks/${id}/spells`, {
                spellIds: [spell],
                userProfileId: auth.profileId,
            }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            console.log(response);
            navigate(`/spellbooks/${id}`);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <main className='add-spell-outer-container'>
            <section className='add-spell-overview'>
                <h1>Add a Spell</h1>
                <Form onSubmit={updateSpellbook}>
                    <span className='add-spell-form-items'>
                        <label htmlFor='level'>Level:</label>
                        <select name='level' id='level' value={level} onChange={(e) => {
                            setLevel(e.target.value);
                            setSpell('');
                        }}>
                            <option value="">Select level</option>
                            {[0,1,2,3,4,5,6,7,8,9].map(l => (
                                <option key={l} value={l}>{l === 0 ? "Cantrips" : l}</option>
                            ))}
                        </select>
                    </span>

                    <span className='add-spell-form-items'>
                        <label htmlFor='spell'>Spell Name:</label>
                        <select id='spell' value={spell} onChange={(e) => setSpell(e.target.value)} disabled={!level}>
                            <option value="">Select spell</option>
                            {spells.map(s => (
                                <option key={s.id} value={s.id}>{s.spellName}</option>
                            ))}
                        </select>
                    </span>
                    <div className='add-spell-buttons'>
                        <DeleteButton type='button' onClick={() => navigate(`/spellbooks/${id}`)} text='Cancel' />
                        <Button type='submit' text='Confirm' />
                    </div>
                </Form>
            </section>
        </main>
    )
}

export default AddSpell;