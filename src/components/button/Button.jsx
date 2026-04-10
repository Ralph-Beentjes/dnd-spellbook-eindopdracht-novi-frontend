import './Button.css';

function Button(props){
    return (
        <button type={props.type} onClick={props.onClick} className='button-styling'>{props.text}
        </button>
    )
}

export default Button;