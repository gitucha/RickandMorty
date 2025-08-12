import React, { useEffect, useState } from 'react'

const BASE_URL = 'https://rickandmortyapi.com/api/character'

function Rickandmorty() {

    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        let aborted = false
        async function fetchAllchars() {

            try {
                let allCharacters = [];
                let nextUrl = BASE_URL;

                while (nextUrl) {
                    const res = await fetch(nextUrl);
                    if (!res.ok) throw new Error(`Failed With status ${res.status}`);

                    const data = await res.json();
                    allCharacters = allCharacters.concat(data.results)
                    nextUrl = data.info.next;

                    if (aborted) break;

                }


                if (!aborted) {
                    console.log("Characters fetched: ", allCharacters);
                    setCharacters(allCharacters);
                }
            }
            catch (error) {
                if (!aborted) setError(error.message);
                console.log('Error fetching data:', error)
            }
        }
        fetchAllchars();

        return () => {
            aborted = true;
        };
    }, [])

   
    const handleSearch = (event) =>{
        setSearch(event.target.value)
    }

    const filteredChars = characters.filter(character => 
        character.name.toLowerCase().includes(search.toLowerCase()) 
    );
    

    function deleteChar(idToDelete){
        const currentchars = characters.filter(chars => chars.id !== idToDelete)
        setCharacters(currentchars)
    }

    if (error) return <div className='p-4 text-red-600' >Error: {error} </div>

    return (
        <div className='p-4'>
            <h2 className='font-semibold mb-4 text-center' >rick and morty API({characters.length}) </h2>
            <input type='search' placeholder='Search here..'
             className='border-2 rounded-lg p-2 mb-10 justify-items-center'
             value={search}
             onChange={handleSearch}
              />

            <div className='max-w-7xl justify-items-center' >
                {filteredChars.map((char) => (
                    <div className='display: inline-block space-x-8' key={char.id}>
                        <img src={char.image}/>

                        <div className='flex-col items-center' >
                        <button onClick={() => deleteChar(char.id) } className='border-2 rounded-lg p-1 bg-blue-600 text-white  hover:bg-blue-800' >Delete Me</button>
                        </div>
                        <h3>{char.name}</h3>
                       
                    </div>
                ))}
              
            </div>

        </div>
    )
}

export default Rickandmorty