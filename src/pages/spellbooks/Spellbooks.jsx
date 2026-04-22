import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import './Spellbooks.css';
import Button from "../../components/button/Button.jsx";
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import avatar from "../../assets/placeholder-avatar.png";
import UploadDownloadButton from "../../components/uploadDownloadButton/UploadDownloadButton.jsx";

function Spellbooks(){
    const { auth } = useContext(AuthContext);
    const [spellbooks, setSpellbooks] = useState([]);
    const [file, setFile] = useState([]);
    const [previewUrls, setPreviewUrls] = useState('');
    const fileInputRefs = useRef({});

    const navigate = useNavigate();

    function handleImageChange(e, spellbookId) {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreviewUrls(prev => ({
            ...prev,
            [spellbookId]: URL.createObjectURL(uploadedFile)
        }));
    }

    async function sendImage(e, spellbookId) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        try {
            await axios.post(`http://localhost:8080/spellbooks/${spellbookId}/image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${auth.token}`
                },
            });
            if (fileInputRefs.current[spellbookId]) {
                fileInputRefs.current[spellbookId].value = '';
            }
        } catch(e) {
            console.error(e);
        }
    }

    async function downloadImage(spellbookId) {
        try {
            const response = await axios.get(
                `http://localhost:8080/spellbooks/${spellbookId}/image`,
                {
                    headers: { Authorization: `Bearer ${auth.token}` },
                    responseType: 'blob',
                }
            );
            const url = URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = `spellbook-${spellbookId}.png`;
            link.click();
            URL.revokeObjectURL(url);
        } catch(e) {
            console.error(e);
        }
    }

    async function levelUp(spellbookId) {
        try {
            const response = await axios.patch(
                `http://localhost:8080/spellbooks/${spellbookId}/level-up`,
                {},
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );
            setSpellbooks(prev =>
                prev.map(sb => sb.id === spellbookId ? { ...sb, level: response.data.level } : sb)
            );
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        async function fetchSpellbooks(){
            try {
                const response = await axios.get(`http://localhost:8080/users/${auth.profileId}`,
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                setSpellbooks(response.data.spellbooks);
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        }

        if (auth.profileId) {
            void fetchSpellbooks();
        }
    }, [auth.profileId, auth.token]);

    useEffect(() => {
        async function fetchSpellbookImages() {
            const urls = {};
            await Promise.all(
                spellbooks.map(async (spellbook) => {
                    try {
                        const response = await axios.get(
                            `http://localhost:8080/spellbooks/${spellbook.id}/image`,
                            {
                                headers: { Authorization: `Bearer ${auth.token}` },
                                responseType: 'blob',
                            }
                        );
                        urls[spellbook.id] = URL.createObjectURL(response.data);
                    } catch (e) {
                    }
                })
            );
            setPreviewUrls(urls);
        }

        if (spellbooks.length > 0) {
            void fetchSpellbookImages();
        }
    }, [spellbooks, auth.token]);

    useEffect(() => {
        return () => {
            Object.values(previewUrls).forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    return (
        <div className='spellbooks-outer-container'>
            <main className='spellbooks overview'>
                <h1>My Spellbooks</h1>
                <ul className='spellbooks-list'>
                    {spellbooks.sort((a, b) => a.spellbookName.localeCompare(b.spellbookName)).map(spellbook => (
                        <li key={spellbook.id}>
                            <article className='spellbooks-element'>
                                <div className='spellbooks-avatar-container'>
                                    <img
                                        src={previewUrls[spellbook.id] || avatar} alt='placeholder-image' className='avatar-image'
                                    />
                                    <form className='spellbooks-upload-file-container' onSubmit={(e) => sendImage(e, spellbook.id)}>
                                    <span className='spellbooks-upload-file'>
                                        <input
                                            type='file' name='image' id={`image-${spellbook.id}`}
                                            onChange={(e) => handleImageChange(e, spellbook.id)}
                                            ref={(el) => fileInputRefs.current[spellbook.id] = el} />
                                        </span>
                                        <div className='spellbooks-avatar-buttons'>
                                            <UploadDownloadButton type='button' onClick={() => downloadImage(spellbook.id)} text='Download' />
                                            <UploadDownloadButton type='submit' text='Confirm' />
                                        </div>
                                    </form>
                                </div>
                                <div className='spellbooks-information'>
                                    <span><h2>{spellbook.spellbookName}</h2></span>
                                    <span><h3>Level {spellbook.level} {spellbook.characterClass.className}</h3></span>
                                    <div className='spellbooks-open-edit-buttons'>
                                        <DeleteButton type='button' onClick={() => levelUp(spellbook.id)} text='Level Up' />
                                        <Button type='button' onClick={() => navigate(`/spellbooks/${spellbook.id}`)} text='Open' />
                                    </div>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
                <div className='spellbooks-create-delete-buttons'>
                    <DeleteButton type='button' onClick={() => navigate('/delete-spellbook')} text='Delete Spellbook' />
                    <Button type='button' onClick={() => navigate('/create-spellbook')} text='Create Spellbook' />
                </div>
            </main>
        </div>
    )
}

export default Spellbooks;