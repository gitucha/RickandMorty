import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';


function CharacterDetail() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        
        async function fetchCharacter() {
            try {
                const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                if (!res.ok) throw new Error('Failed to fetch character');
                const data = await res.json();
                setCharacter(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchCharacter();

    }, [id]);
    if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
    if (!character) return <div className="p-4">Loading...</div>;
    return (
        <div className="p-6 max-w-lg mx-auto">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Back to list
            </Link>
            <h2 className="text-2xl font-semibold mb-4">{character.name}</h2>
            <img src={character.image} alt={character.name} className="rounded mb-4 w-full" />
            <ul className="space-y-2 text-gray-700">
                <li><strong>Status:</strong> {character.status}</li>
                <li><strong>Species:</strong> {character.species}</li>
                <li><strong>Type:</strong> {character.type || 'N/A'}</li>
                <li><strong>Gender:</strong> {character.gender}</li>
                <li><strong>Origin:</strong> {character.origin?.name}</li>
                <li><strong>Location:</strong> {character.location?.name}</li>
            </ul>
        </div>
    );
}
export default CharacterDetail;