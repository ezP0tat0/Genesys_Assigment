import { useParams, Link } from 'react-router-dom';
import {useFetch} from '../../useFetch';

import '../pages_Styles/Character.css';

export default function Character()
{
    const {id} = useParams();

    const url=`https://rickandmortyapi.com/api/character/${id}`;
    const {data: character, loading, error} = useFetch(url);

    return(
        <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{color:'red'}}>{error}</p>}

            {character && (
                <div style={{margin:'2rem'}}>
                    <Link className='backButton' to={'/'}>{'<-'}Back</Link>
                    <div>
                        <img src={character.image} alt={character.name}/>
                        <h1>{character.name}</h1>
                        <table>
                            <tbody>
                                <tr>
                                <th>Species</th>
                                <td>{character.species}</td> 
                                </tr>
                                <tr>
                                <th>Type</th>
                                <td>{character.type}</td> 
                                </tr>
                                <tr>
                                <th>Gender</th>
                                <td>{character.gender}</td> 
                                </tr>
                                <tr>
                                <th>Status</th>
                                <td>{character.status}</td> 
                                </tr>
                                <tr>
                                <th>Origin</th>
                                <td>{character.origin.name}</td> 
                                </tr>
                                <tr>
                                <th>Location</th>
                                <td>{character.location.name}</td> 
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}