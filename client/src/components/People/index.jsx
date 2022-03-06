import React, { useEffect, useState } from 'react'
import axios from '../Axios';
import './People.css'

// change original to w200 or w300 if not styled
const base_url = 'https://image.tmdb.org/t/p/original/';

function People({ fetchUrl, title }) {
    const [actors, setActors] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setActors(request.data.results);
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (actor) => {
        window.location.assign(`/actors/${actor.id}`)
    };

    return (
        <div className='people'>
            <h2 className='people-title'>{title}</h2>
            <div className="people-posters">
                {actors.map((actor) => (
                    <div className="people-map" key={actor?.id}>
                        <img
                            onClick={() => handleClick(actor)}
                            className='people-poster'
                            src={
                                actor?.poster_path || actor?.backdrop_path || actor?.profile_path ?
                                    `${base_url}${actor?.poster_path || actor?.backdrop_path || actor?.profile_path}`
                                    :
                                    "https://via.placeholder.com/300"
                            }
                            alt={actor?.name}
                        />
                        <div className='people-name'>{actor.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default People;
