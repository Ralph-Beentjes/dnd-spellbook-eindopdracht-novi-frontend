import './CreateSpellAdmin.css';
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import Button from "../../components/button/Button.jsx";

function CreateSpellAdmin(){
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [level, setLevel] = useState(1);
    const [characterClasses, setCharacterClasses] = useState(null);
    const [castingTime, setCastingTime] = useState('');
    const [range, setRange] = useState(0);
    const [components, setComponents] = useState('');
    const [duration, setDuration] = useState('');
    const [concentration, setConcentration] = useState(false);
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    async function submitSpell(e){
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/spells', {
                spellName: name,
                level: level,
                characterClasses: characterClasses,
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
                        <input type='checkbox' name='class1' id='class1' />
                        <label htmlFor='class1'>Bard</label>
                        <input type='checkbox' name='class2' id='class2' />
                        <label htmlFor='class2'>Cleric</label>
                        <input type='checkbox' name='class3' id='class3' />
                        <label htmlFor='class3'>Druid</label>
                        <input type='checkbox' name='class4' id='class4' />
                        <label htmlFor='class4'>Paladin</label>
                        <input type='checkbox' name='class5' id='class5' />
                        <label htmlFor='class5'>Ranger</label>
                        <input type='checkbox' name='class6' id='class6' />
                        <label htmlFor='class6'>Sorcerer</label>
                        <input type='checkbox' name='class7' id='class7' />
                        <label htmlFor='class7'>Warlock</label>
                        <input type='checkbox' name='class8' id='class8' />
                        <label htmlFor='class8'>Wizard</label>
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
                        <label></label>
                        <input />
                    </span>
                    <span className='create-spell-form-items'>
                        <label></label>
                        <input />
                    </span>
                    <span className='create-spell-form-items'>
                        <label htmlFor='description'>Description:</label>
                        <input type='text' name='description' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
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