import './Form.css';

function Form(props){
    return (
        <form onSubmit={props.onSubmit} className='form-container'>{props.children}
        </form>
    )
}

export default Form;