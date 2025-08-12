import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const BASE_URL = 'https://rickandmortyapi.com/api/character'


function Rickandmorty() {


    const [characters, setCharacters] = useState([])
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {

        let aborted = false
        async function fetchAllChars() {

            try {
                let allCharacters = []
                let nextUrl = BASE_URL


                while (nextUrl) {
                    const res = await fetch(nextUrl)
                    if (!res.ok) throw new Error(`Failed with status ${res.status}`)
                    const data = await res.json()
                    allCharacters = allCharacters.concat(data.results)
                    nextUrl = data.info.next
                    if (aborted) break

                }

                if (!aborted) {
                    setCharacters(allCharacters)
                }

            } catch (err) {
                if (!aborted) setError(err.message)
                console.log('Error fetching all data:', err)
            }
        }
        fetchAllChars()
        return () => {
            aborted = true
        }
    }, [])


    // Search
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const filteredChars = characters.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
    )


    // Delete
    function Delete(idToDelete) {
        const currentChars = characters.filter((char) => char.id !== idToDelete)
        setCharacters(currentChars)
    }


    if (error)
        return <div className="p-4 text-red-400 text-center">Error: {error}</div>
    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h2 className="text-center text-3xl font-bold mb-6 text-blue-400">
                Rick and Morty Characters ({characters.length})
            </h2>
            <div className="flex justify-center mb-6">
                <input
                    className="w-full max-w-md px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-blue-500  focus:ring-2 focus:ring-blue-500"
                    onChange={handleSearch}
                    type="search"
                    name="search"
                    placeholder="Search characters..."
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredChars.map((char) => (
                    <div
                        key={char.id}
                        className="bg-gray-800 rounded-lg p-4 text-center shadow-lg hover:shadow-xl "
                    >
                        <Link to={`/character/${char.id}`}>
                            <img
                                src={char.image}
                                alt={char.name}
                                className="mx-auto rounded-full size-32 object-cover border-4 border-blue-500"
                            />
                            <h3 className="mt-4 font-semibold text-lg text-blue-400">
                                {char.name}
                            </h3>
                        </Link>
                        <button
                            onClick={() => Delete(char.id)}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded"
                        >
                            DELETE ME
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Rickandmorty