import './deleteButton.css'

function DeleteButton(props){
    return (
        <button type={props.type} onClick={props.onClick} className='delete-button-styling'>{props.text}
        </button>
    )
}

export default DeleteButton;