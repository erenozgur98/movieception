import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
import './Credits.css'

// change original to w200 or w300 if not styled
const base_url = 'https://image.tmdb.org/t/p/original/';
const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function Credits({ movie, show, credits }) {
    const [cast, setCast] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if (movie?.id) {
            const fetchData = async () => {
                const requestMovie = await axios.get(`/movie/${movie?.id}/credits?api_key=${apiKey}`);
                setCast(requestMovie.data.cast);
            }
            fetchData();
        } else if (show?.id) {
            const fetchData = async () => {
                const requestShow = await axios.get(`/tv/${show?.id}/credits?api_key=${apiKey}`);
                setCast(requestShow.data.cast);
            }
            fetchData();
        } else {
            setCast(credits.cast);
        }
    }, [movie?.id, show?.id, credits]);

    const redirect = (theCast) => {
        history.push(`/actors/${theCast?.id}`)
    };

    return (
        <div className='casts'>
            <div className="casts-posters">
                {cast.map((theCast) => (
                    <div className='casts-map'>
                        <img
                            key={theCast.id}
                            onClick={() => redirect(theCast)}
                            src={`${base_url}${theCast?.profile_path}`}
                            alt={theCast?.original_name}
                            className='cast-poster'
                        />
                        <div className='casts-name'>{theCast?.original_name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Credits;
