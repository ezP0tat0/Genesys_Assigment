import { useFetch } from "../../useFetch";
import { useState } from "react";

import "../pages_Styles/Home.css";
import { Link } from "react-router-dom";

export default function Home()
{
    const [searchTerm, setSearchTerm] = useState("");

    const [currentUrl,setCurrentUrl]=useState(`https://rickandmortyapi.com/api/character/?page=1`);
    const {data: characters, loading, error} = useFetch(currentUrl);

    const searchHandler = (e)=>{
        const value = e.target.value;
        setSearchTerm(value);

        if(value.length>2) setCurrentUrl(`https://rickandmortyapi.com/api/character/?name=${value}`);
        if(value.length===0) setCurrentUrl(`https://rickandmortyapi.com/api/character/?page=1`);
    }

    return(
        <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{color:'red'}}>{error}</p>}
            
            <h1>Character List</h1>
            <input type="text" value={searchTerm} onChange={searchHandler}></input>
            <table>
                <thead>
                    <tr>
                        <td>Avatar</td>
                        <td>Name</td>
                        <td>Species</td>
                        <td>Status</td>
                    </tr>
                </thead> 
                <tbody>
                    {characters && characters.results.map(character => (
                        
                            <tr key={character.id}>
                                <td><img className="avatar" src={character.image} alt={character.name}/></td>
                                <td><Link to={`/character/${character.id}`}>{character.name}</Link></td>
                                <td>{character.species}</td>
                                <td>{character.status}</td>
                            </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td  colSpan={4}>
                            <div className="center">
                                <button className="left" onClick={() => setCurrentUrl(characters.info.prev? characters.info.prev: currentUrl)}>{'<-'}</button>
                                <button className="right" onClick={() => setCurrentUrl(characters.info.next && characters.info.next!==currentUrl? characters.info.next:currentUrl)}>{'->'}</button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}