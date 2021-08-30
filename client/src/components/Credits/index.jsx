import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
import './Credits.css'

// change original to w200 or w300 if not styled
const base_url = 'https://image.tmdb.org/t/p/original/';
const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function Credits({ movie, show }) {
    const [movieCast, setMovieCast] = useState([]);
    const [showCast, setShowCast] = useState([]);

    const history = useHistory()

    useEffect(() => {
        if (movie?.id) {
            const fetchData = async () => {
                const requestMovie = await axios.get(`/movie/${movie?.id}/credits?api_key=${apiKey}`);
                setMovieCast(requestMovie.data.cast);
            }
            fetchData();
        } else {
            const fetchData = async () => {
                const requestShow = await axios.get(`/tv/${show?.id}/credits?api_key=${apiKey}`);
                setShowCast(requestShow.data.cast);
            }
            fetchData();
        }
    }, [movie?.id, show?.id]);

    // useEffect(() => {
    // }, [show?.id])

    const redirect = (theCast) => {
        history.push(`/actors/${theCast?.id}`)
    };

    return (
        <div className='casts'>
            {movie?.id ?
                <div className="casts-posters">
                    {movieCast.map((theCast) => (
                        <img
                            key={theCast.id}
                            onClick={() => redirect(theCast)}
                            src={`${base_url}${theCast?.profile_path}`}
                            alt={theCast?.original_name}
                            className='cast-poster'
                        />
                    ))}
                </div>
                :
                <div className="casts-posters">
                    {showCast.map((theCast) => (
                        <img
                            key={theCast.id}
                            onClick={() => redirect(theCast)}
                            src={`${base_url}${theCast?.profile_path}`}
                            alt={theCast?.original_name}
                            className='cast-poster'
                        />
                    ))}
                </div>
            }
        </div>
    );
};

export default Credits;
