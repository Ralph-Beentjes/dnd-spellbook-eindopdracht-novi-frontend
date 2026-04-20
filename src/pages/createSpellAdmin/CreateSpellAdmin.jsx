import './CreateSpellAdmin.css';
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import Button from "../../components/button/Button.jsx";

const class_options = [
    { id: 1, name: 'Bard' },
    { id: 2, name: 'Cleric' },
    { id: 3, name: 'Druid' },
    { id: 4, name: 'Paladin' },
    { id: 5, name: 'Ranger' },
    { id: 6, name: 'Sorcerer' },
    { id: 7, name: 'Warlock' },
    { id: 8, name: 'Wizard' },
];

function CreateSpellAdmin(){
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [level, setLevel] = useState(1);
    const [selectedClassIds, setSelectedClassIds] = useState([]);
    const [castingTime, setCastingTime] = useState('ACTION');
    const [range, setRange] = useState(0);
    const [components, setComponents] = useState('');
    const [duration, setDuration] = useState('');
    const [concentration, setConcentration] = useState(false);
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    function handleClassChange(id) {
        setSelectedClassIds(prev =>
            prev.includes(id) ? prev.filter(characterClass => characterClass !== id) : [...prev, id]
        );
    }

    async function submitSpell(e){
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/spells', {
                spellName: name,
                level: level,
                classIds: selectedClassIds,
                castingTime: castingTime,
                range: range,
                components: components,
                duration: duration,
                concentration: concentration,
                description: description,
            }, {
                headers: {Authorization: `Bearer ${auth.token}`}
            });
            console.log(response);
            navigate('/admin');
        } catch(e){
            console.error(e);
        }
    }

    return (
        <main className='create-spell-outer-container'>
            <h1>Create a New Spell</h1>
            <section>
                <form className='create-spell-form' onSubmit={submitSpell}>
                    <span className='create-spell-form-items'>
                        <label htmlFor='name'>Spell Name:</label>
                        <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </span>
                    <span className='create-spell-form-items'>
                        <label htmlFor='level'>Level (Between 1 and 9):</label>
                        <input type='number' name='level' id='level' min='1' max='9' value={level} onChange={(e) => setLevel(Number(e.target.value))} />
                    </span>
                    <span className='create-spell-form-items'>
                        <label>Classes:</label>
                        <div className='create-spell-form-classes'>
                            {class_options.map(characterClass => (
                                <span key={characterClass.id}>
                                    <label htmlFor={`class-${characterClass.id}`}>{characterClass.name}</label>
                                    <input
                                        type='checkbox'
                                        id={`class-${characterClass.id}`}
                                        checked={selectedClassIds.includes(characterClass.id)}
                                        onChange={() => handleClassChange(characterClass.id)}
                                    />
                                </span>
                            ))}
                        </div>
                    </span>
                    <span className='create-spell-form-items'>
                        <label htmlFor='castingTime'>Casting Time:</label>
                        <select name='castingTime' id='castingTime' value={castingTime} onChange={(e) => setCastingTime(e.target.value)}>
                            <option value={'ACTION'}>Action</option>
                            <option value={'BONUS_ACTION'}>Bonus Action</option>
                            <option value={'REACTION'}>Reaction</option>
                        </select>
                    </span>
                    <span className='create-spell-form-items'>
                        <label htmlFor='range'>Range:</label>
                        <input type='number' name='range' id='range' value={range} onChange={(e) => setRange(Number(e.target.value))}/>
                    </span>
                    <span className='create-spell-form-items'>
                        <label htmlFor='components'>Components:</label>
                        <input type='text' name='components' id='components' value={components} onChange={(e) => setComponents(e.target.value)} />
                    </span>
                    <span className='create-spell-form-items'>
                        <label htmlFor='duration'>Duration:</label>
                        <input type='text' name='duration' id='duration' value={duration} onChange={(e) => setDuration(e.target.value)}/>
                    </span>
                    <span className='create-spell-form-items'>
                        <span><p><strong>Concentration:</strong></p></span>
                        <div className='create-spell-form-concentration'>
                            <label htmlFor='concentration-false'>No</label>
                            <input type='radio' name='concentration' id='concentration false' checked={concentration === false} onChange={() => setConcentration(false)} />
                            <label htmlFor='concentration-true'>Yes</label>
                            <input type='radio' name='concentration' id='concentration-true' checked={concentration === true} onChange={() => setConcentration(true)} />
                        </div>
                    </span>
                    <span className='create-spell-form-items'>
                        <label htmlFor='description'>Description:</label>
                        <textarea name='description' id='description' rows='10' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </span>
                    <div className='create-spell-buttons'>
                        <DeleteButton type='button' onClick={() => navigate('/admin')} text='Cancel' />
                        <Button type='submit' text='Confirm' />
                    </div>
                </form>
            </section>
        </main>
    )
}

export default CreateSpellAdmin;