import './CreateClassAdmin.css';
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function CreateClassAdmin(){
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    async function submitClass(e){
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/classes', {
                className: name,
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
        <main className='create-class-outer-container'>
            <h1>Create a New Class</h1>
            <section>
                <form className='create-class-form' onSubmit={submitClass}>
                    <span className='create-class-form-items'>
                        <label htmlFor='name'>Class Name:</label>
                        <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </span>
                    <span className='create-class-form-items'>
                        <label htmlFor='description'>Description:</label>
                        <input type='text' name='description' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </span>
                    <div className='create-class-buttons'>
                        <DeleteButton type='button' onClick={() => navigate('/admin')} text='Cancel' />
                        <Button type='submit' text='Confirm' />
                    </div>
                </form>
            </section>
        </main>
    )
}

export default CreateClassAdmin;