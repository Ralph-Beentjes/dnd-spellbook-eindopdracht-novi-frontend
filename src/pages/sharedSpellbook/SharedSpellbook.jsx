import '../singleSpellbook/SingleSpellbook.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function SharedSpellbook() {
    const { token } = useParams();
    const [spellbook, setSpellbook] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchShared() {
            try {
                const response = await axios.get(
                    `http://localhost:8080/shares/${token}`
                    // No Authorization header — this endpoint is public
                );
                setSpellbook(response.data);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        }
        fetchShared();
    }, [token]);

    if (error) return <div>This share link is invalid or has expired.</div>;
    if (!spellbook) return <div>Loading...</div>;

    const spellsByLevel = spellbook.spells.reduce((acc, spell) => {
        const level = spell.level ?? 0;
        if (!acc[level]) acc[level] = [];
        acc[level].push(spell);
        return acc;
    }, {});

    const sortedLevels = Object.keys(spellsByLevel).sort((a, b) => a - b);

    return (
        <div className='spellbook-outer-container'>
            <main className='spellbook-overview'>
                <h1>{spellbook.spellbookName}'s Spells</h1>
                <section>
                    <article className='spell-level-overview'>
                        {sortedLevels.map(level => (
                            <details key={level}>
                                <summary>
                                    <h2>{level === "0" ? "Cantrips" : `Level ${level}`}</h2>
                                </summary>
                                <ul>
                                    {spellsByLevel[level].map(spell => (
                                        <li key={spell.id}>
                                            <details>
                                                <summary className='spell-name'><h3>{spell.spellName}</h3></summary>
                                                <ul className='spell-information'>
                                                    <li><strong>Casting Time:</strong> {spell.castingTime.replaceAll('_', ' ')}</li>
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
            </main>
        </div>
    );
}

export default SharedSpellbook;