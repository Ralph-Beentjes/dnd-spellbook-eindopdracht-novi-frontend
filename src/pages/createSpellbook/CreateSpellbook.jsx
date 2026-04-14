import './CreateSpellbook.css';

function CreateSpellbook(){
    return (
        <div className='create-spellbook-outer-container'>
            <h1>Create a New Spellbook</h1>
            <section className='create-spellbook-info'>
                <form className='create-spellbook-form'>
                    <span className='create-spellbook-form-items'>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' id='name' placeholder='Insert name here' />
                    </span>
                    <span className='create-spellbook-form-items'>
                        <label htmlFor='class'>Class:</label>
                        <select name='class' id='class'>
                        <option value='cleric'>Cleric</option>
                        <option value='wizard'>Wizard</option>
                        </select>
                    </span>
                    <span className='create-spellbook-form-items'>
                        <label htmlFor='level'>Level:</label>
                        <input type='number' name='level' id='level' min='1' max='20' placeholder='Between 1 and 20' />
                    </span>
                </form>
            </section>
        </div>
    )
}

export default CreateSpellbook;