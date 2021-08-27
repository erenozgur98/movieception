import React, { useEffect, useState } from 'react'
import axios from '../Axios';
import './People.css'

// change original to w200 or w300 if not styled
const base_url = 'https://image.tmdb.org/t/p/original/';

function People({ fetchUrl, title }) {
    const [actors, setActors] = useState([]);
    const [currentActor, setCurrentActor] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setActors(request.data.results);
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (actor) => {
        setCurrentActor(actor);
        console.log(currentActor);
    };

    return (
        <div className='row'>
            <h2 className='row-title'>{title}</h2>
            <div className="row-posters">
                {actors.map((actor) => (
                    <div className="row-map" key={actor?.id}>
                        <img
                            onClick={() => handleClick(actor)}
                            className='row-poster'
                            src={
                                actor?.poster_path || actor?.backdrop_path || actor?.profile_path ?
                                    `${base_url}${actor?.poster_path || actor?.backdrop_path || actor?.profile_path}`
                                    :
                                    "https://via.placeholder.com/300"
                            }
                            alt={actor?.name}
                        />
                        <h5>{actor.name}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default People;
