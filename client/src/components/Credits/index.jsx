import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
import './Credits.css'

// change original to w200 or w300 if not styled
const base_url = 'https://image.tmdb.org/t/p/original/';
const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function Credits({ movie }) {
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);

    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`/movie/${movie.id}/credits?api_key=${apiKey}`);
            setCast(request.data.cast);
            setCrew(request.data.crew);
        }
        fetchData();
    }, [movie.id]);

    // credits.crew
    // credits.cast
    console.log(cast)
    console.log(crew)

    const redirect = (theCast) => {
        history.push(`/actors/${theCast.id}`)
    };

    return (
        <div className='casts'>
            <div className="casts-posters">
                {cast.map((theCast) => (
                    <img
                        key={theCast.id}
                        onClick={() => redirect(theCast)}
                        src={`${base_url}${theCast?.profile_path}`}
                        alt={theCast?.original_name}
                        className='cast-poster'
                    />
                ))}
            </div>
        </div>
    );
};

export default Credits;
