import './SingleSpellbook.css';
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import DeleteButton from "../../components/deleteButton/deleteButton.jsx";

function SingleSpellbook(){
    const { auth } = useContext(AuthContext);
    const [spellbook, setSpellbook] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSpellbook() {
            try {
                const response = await axios.get(
                    `http://localhost:8080/spellbooks/${id}`,
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                setSpellbook(response.data);
                console.log(response);
            } catch(e){
                console.error(e);
            }
        }

        fetchSpellbook();
    }, [auth.token, id]);

    if (!spellbook) {
        return <div>Loading...</div>;
    }

    const spellsByLevel = spellbook.spells.reduce((acc, spell) => {
        const level = spell.level ?? 0;
        if (!acc[level]) acc[level] = [];
        acc[level].push(spell);
        return acc;
    }, {});

    const sortedLevels = Object.keys(spellsByLevel).sort((a, b) => a - b);

    return (
        <div className='spellbook-outer-container'>
            <main className="spellbook-overview">
                <h1>{spellbook.spellbookName}'s Spells</h1>
                {spellbook.spells.length === 0 && <section className="no-spells-found">
                    <h2>No spells found...</h2>
                </section>}
                <section>
                    <article className='spell-level-overview'>
                        {sortedLevels.map(level => (
                            <details key={level}>
                                <summary>
                                    {level === "0" ? "Cantrips" : `Level ${level}`}
                                </summary>
                                <ul>
                                    {spellsByLevel[level].map(spell => (
                                        <li key={spell.id}>
                                            <details>
                                                <summary>{spell.name}</summary>
                                                <ul>
                                                    <li><strong>Casting Time:</strong> {spell.castingTime}</li>
                                                    <li><strong>Range:</strong> {spell.range}</li>
                                                    <li><strong>Duration:</strong> {spell.duration}</li>
                                                    <li><strong>Components:</strong> {spell.components}</li>
                                                    <li><strong>Description:</strong> {spell.description}</li>
                                                </ul>
                                            </details>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        ))}
                    </article>
                </section>
                <section className="spellbook-buttons">
                    <DeleteButton type='button' text='Delete Spell' />
                    <Button type='button' onClick={() => navigate('/add-spell')} text='Add Spell' />
                </section>
            </main>
        </div>
    );
}

export default SingleSpellbook;

//     return (
//         <div className='spellbook-outer-container'>
//             <main className="spellbook-overview">
//                 <h1>{spellbook.spellbookName}'s Spells</h1>
//                 <section>
//                     <article className='spell-level-overview'>
//                         <details>
//                             <summary>Cantrips</summary>
//                             <ul>
//                                 <li>
//                                     <details>
//                                         <summary></summary>
//                                     </details>
//                                 </li>
//                             </ul>
//                         </details>
//                         <details>
//                             <summary>Level 1</summary>
//                             <ul>
//                                 <li>
//                                     <details>
//                                         <summary>Fireball</summary>
//                                         <p>Boom!</p>
//                                     </details>
//                                 </li>
//                             </ul>
//                         </details>
//                     </article>
//                 </section>
//             </main>
//
//         </div>
//     )
// }
//
// export default SingleSpellbook;