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

    const redirect = (credits) => {
        if (credits.media_type === 'tv') {
            history.replace(`/shows/${credits.id}`)
        } else {
            history.replace(`/movies/${credits.id}`)
        }
    };

    // sorting the movie/shows by release year
    movieCredits.sort((a, b) => (a.release_date > b.release_date) ? -1 : ((b.release_date > a.release_date) ? 1 : 0));

    const slicedCredits = movieCredits.slice(0, 10);
    console.log(slicedCredits)

    return (
        <div className='movie-credits'>
            {slicedCredits.map((credits) => (
                <div className='movie-credits-map'>
                    <img
                        key={credits.id}
                        onClick={() => redirect(credits)}
                        src={`${base_url}${credits?.poster_path}`}
                        alt={credits?.original_name}
                        className='actor-movie-poster'
                    />
                    <div className='actor-movie-name'>{credits?.original_title}</div>
                </div>
            ))}
        </div>
    );
};

export default MovieCredits;
