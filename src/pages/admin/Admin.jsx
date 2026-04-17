import './Admin.css';
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";

function Admin(){
    const navigate = useNavigate();

    return (
        <div className='admin-outer-container'>
            <main className='admin-tools-overview'>
                <h1>Admin Tools</h1>
                <section className='admin-tools-options'>
                    <ul>
                        <li>
                            <strong><h2>Classes:</h2></strong>
                            <div className='admin-buttons'>
                                <Button type='button' onClick={() => navigate('/create-class')} text='Create a Class' />
                                <DeleteButton type='button' onClick={() => navigate('/delete-class')} text='Delete a Class' />
                            </div>
                        </li>
                        <li>
                            <strong><h2>Spells:</h2></strong>
                            <div className='admin-buttons'>
                                <Button type='button' onClick={() => navigate('/create-spell')} text='Create a Spell' />
                                <DeleteButton type='button' onClick={() => navigate('/delete-spell')} text='Delete a Spell' />
                            </div>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    )
}

export default Admin;