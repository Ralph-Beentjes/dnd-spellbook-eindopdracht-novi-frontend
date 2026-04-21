import './UploadDownloadButton.css'

function UploadDownloadButton(props){
    return (
        <button type={props.type} onClick={props.onClick} className='upload-download-button-styling'>{props.text}
        </button>
    )
}

export default UploadDownloadButton;