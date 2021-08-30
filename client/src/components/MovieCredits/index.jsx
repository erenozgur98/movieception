import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
import './MovieCredits.css'

// change original to w200 or w300 if not styled
const base_url = 'https://image.tmdb.org/t/p/original/';
const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function MovieCredits({ actor }) {
    const [movieCredits, setMovieCredits] = useState([]);

    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`/person/${actor?.id}/combined_credits?api_key=${apiKey}`);
            setMovieCredits(request.data.cast);
        }
        fetchData();
    }, [actor?.id]);

    // useEffect(() => {
    // }, [show?.id])

    const redirect = (credits) => {
        if (credits.media_type === 'tv') {
            history.push(`/shows/${credits.id}`)
        } else {
            history.push(`/movies/${credits.id}`)
        }
    };

    return (
        <div className='movie-credits'>
            {movieCredits.map((credits) => (
                <img
                    key={credits.id}
                    onClick={() => redirect(credits)}
                    src={`${base_url}${credits?.poster_path}`}
                    alt={credits?.original_name}
                    className='movie-poster'
                />
            ))}
        </div>
    );
};

export default MovieCredits;
