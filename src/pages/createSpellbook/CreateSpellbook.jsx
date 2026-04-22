import './CreateSpellbook.css';
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";

function CreateSpellbook(){
    const { auth } = useContext(AuthContext);
    const [ name, setName ] = useState('');
    const [ level, setLevel ] = useState(1);
    const [ characterClass, setCharacterClass ] = useState(1);
    const [ nameError, setNameError ] = useState('');

    const navigate = useNavigate();

    async function submitSpellbook(e){
        e.preventDefault();
        if (!name.trim()) {
            setNameError('Please enter a name');
            return;
        }
        setNameError('');
        try {
            const response = await axios.post ('http://localhost:8080/spellbooks', {
                spellbookName: name,
                level: level,
                classId: characterClass,
                userProfileId: auth.profileId,
            }, {
                    headers: {Authorization: `Bearer ${auth.token}`}
                });
            console.log(response);
            navigate('/spellbooks');
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <main className='create-spellbook-outer-container'>
            <h1>Create a New Spellbook</h1>
            <section>
                <form className='create-spellbook-form' onSubmit={submitSpellbook}>
                    <span className='create-spellbook-form-items'>
                        <label htmlFor='name'>Name:</label>
                        <span className='error-message'>
                            <input type='text' name='name' id='name' placeholder='Insert name here' value={name}  onChange={(e) => {setName(e.target.value); if (e.target.value.trim()) setNameError('');}} />
                            {nameError && <p className='error-message'>{nameError}</p>}
                        </span>
                    </span>
                    <span className='create-spellbook-form-items'>
                        <label htmlFor='level'>Level (Between 1 and 20):</label>
                        <input type='number' name='level' id='level' min='1' max='20' value={level} onChange={(e) => setLevel(Number(e.target.value))} />
                    </span>
                    <span className='create-spellbook-form-items'>
                        <label htmlFor='class'>Class:</label>
                        <select name='class' id='class' value={characterClass} onChange={(e) => setCharacterClass(Number(e.target.value))}>
                        <option value={1}>Bard</option>
                        <option value={2}>Cleric</option>
                        <option value={3}>Druid</option>
                        <option value={4}>Paladin</option>
                        <option value={5}>Ranger</option>
                        <option value={6}>Sorcerer</option>
                        <option value={7}>Warlock</option>
                        <option value={8}>Wizard</option>
                        </select>
                    </span>
                    <div className='create-spellbook-buttons'>
                        <DeleteButton type='button' onClick={() => navigate('/spellbooks')} text='Cancel' />
                        <Button type='submit' text='Confirm' />
                    </div>
                </form>
            </section>
        </main>
    )
}

export default CreateSpellbook;