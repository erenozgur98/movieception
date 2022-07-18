import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import axios from '../Axios';
import './MovieCredits.css'
import { base_url } from '../../utils/helper';

function MovieCredits({ actor }) {
    const [movieCredits, setMovieCredits] = useState([]);
    const [loadMore, setLoadMore] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`/person/${actor?.id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`);
            setMovieCredits(request.data.cast);
        }
        fetchData();
    }, [actor?.id]);

    const redirect = (credits) => {
        if (credits.media_type === 'tv') {
            window.location.assign(`/shows/${credits.id}`)
        } else {
            window.location.assign(`/movies/${credits.id}`)
        }
    };

    // sorting the movie/shows by release year
    movieCredits.sort((a, b) =>
        ((a.release_date || a.first_air_date) > (b.release_date || b.first_air_date))
            ? -1
            : (((b.release_date || b.first_air_date) > (a.release_date || a.first_air_date))
                ? 1
                : 0));

    const slicedCredits = movieCredits.slice(0, loadMore);

    return (
        <>
            <div className='movie-credits'>
                {slicedCredits.map((credits) => (
                    credits?.poster_path &&
                    <div className='movie-credits-map'>
                        <img
                            key={credits.id}
                            onClick={() => redirect(credits)}
                            src={`${base_url}${credits?.poster_path}`}
                            alt={credits?.original_title || credits?.original_name}
                            className='actor-movie-poster'
                        />
                        <div className='actor-movie-name'>{credits?.original_title || credits?.original_name}</div>
                        {credits?.character && <div className='actor-movie-name'><em style={{ color: '#e94343' }}>{credits?.character}</em></div>}
                        {(credits?.release_date || credits?.first_air_date) && <div className='actor-movie-name'>{credits?.release_date?.split('-')[0] || credits?.first_air_date?.split('-')[0]}</div>}
                        {credits?.episode_count && <div className='actor-movie-name'>{`${credits?.episode_count} Episodes`}</div>}
                    </div>
                ))}
            </div>
            {movieCredits.length > loadMore &&
                <div className='movie-credits-button'>
                    <Button onClick={() => setLoadMore(loadMore + 10)}>Load More</Button>
                </div>
            }
        </>
    );
};

export default MovieCredits;
