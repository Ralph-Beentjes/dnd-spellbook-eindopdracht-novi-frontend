import './DeleteClassAdmin.css';
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import Form from "../../components/form/Form.jsx";

function DeleteClassAdmin(){
    const { auth } = useContext(AuthContext);
    const [availableClasses, setAvailableClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchClasses(){
            try {
                const response = await axios.get(`http://localhost:8080/classes`,
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                console.log(response.data);
                setAvailableClasses(response.data)
            } catch(e){
                console.error(e);
            }
        }
        fetchClasses();
    }, []);

    async function deleteClass(e){
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/classes/${selectedClass}`,
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );
            console.log(response);
            navigate('/admin');
        } catch(e){
            console.error(e);
        }
    }

    return (
        <main className='delete-class-outer-container'>
            <h1>Delete a Class</h1>
            <section>
                <Form onSubmit={deleteClass}>
                    <div className='delete-class-select'>
                        <label htmlFor='class'>Choose class to delete:</label>
                        <select name='class' id='class' value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                            <option value="">Select a class</option>
                            {availableClasses.map(characterClass => (
                                <option key={characterClass.id} value={characterClass.id}>{characterClass.className}</option>
                            ))}
                        </select>
                    </div>
                    <div className='delete-class-buttons'>
                        <DeleteButton type='button' onClick={() => navigate('/admin')} text='Cancel' />
                        <Button type='submit' text='Confirm' />
                    </div>
                </Form>
            </section>
        </main>
    )
}

export default DeleteClassAdmin;