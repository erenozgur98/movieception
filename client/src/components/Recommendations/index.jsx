import React, { useEffect, useState } from 'react';
import axios from '../Axios';
import './Recommendations.css';


const base_url = 'https://image.tmdb.org/t/p/original/';


function Recommendations({ movie, show }) {
    const [movieRecommendations, setMovieRecommendations] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState([]);


    useEffect(() => {
        if (movie?.id) {
            const fetchData = async () => {
                const requestMovieRecommendations = await axios.get(`movie/${movie?.id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`);
                setMovieRecommendations(requestMovieRecommendations.data.results);
            }
            fetchData();
        } else if (show?.id) {
            const fetchData = async () => {
                const requestShowRecommendations = await axios.get(`tv/${show?.id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`);
                setShowRecommendations(requestShowRecommendations.data.results);
            }
            fetchData();
        }
    }, [movie?.id, show?.id]);

    const redirect = (recommendations) => {
        if (recommendations.media_type === 'movie') {
            window.location.assign(`/movies/${recommendations.id}`);
        } else {
            window.location.assign(`/shows/${recommendations.id}`);
        }
    };

    const slicedMovie = movieRecommendations.slice(0, 10);
    const slicedShow = showRecommendations.slice(0, 10);

    return (
        <div className='recommendations'>
            {movie?.id ?
                <div>
                    {movieRecommendations.length > 0 &&
                        <div>
                            <div
                                style={{
                                    textAlign: 'center',
                                    marginTop: '2rem',
                                    textDecoration: 'underline',
                                    fontSize: '1.2rem'
                                }}
                            >
                                Since you are looking at {movie?.original_title}, you might like these movies
                            </div>
                            <div className="recommendations-posters">
                                {slicedMovie?.map((recommendations) => (
                                    recommendations?.poster_path &&
                                    <div className='recommendations-map' key={recommendations.id}>
                                        <img
                                            key={recommendations.id}
                                            onClick={() => redirect(recommendations)}
                                            src={`${base_url}${recommendations?.poster_path}`}
                                            alt={recommendations?.original_name}
                                            className='recommendations-poster'
                                        />
                                        <div className='recommendations-name'>{recommendations?.original_title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                :
                <div>
                    {showRecommendations.length > 0 &&
                        <div>
                            <div
                                style={{
                                    textAlign: 'center',
                                    marginTop: '2rem',
                                    textDecoration: 'underline',
                                    fontSize: '1.2rem'
                                }}
                            >
                                Since you are looking at {show?.name}, you might like these shows
                            </div>
                            <div className="recommendations-posters">
                                {slicedShow?.map((recommendations) => (
                                    recommendations?.poster_path &&
                                    <div className='recommendations-map' key={recommendations.id}>
                                        <img
                                            key={recommendations.id}
                                            onClick={() => redirect(recommendations)}
                                            src={`${base_url}${recommendations?.poster_path}`}
                                            alt={recommendations?.original_name}
                                            className='recommendations-poster'
                                        />
                                        <div className='recommendations-name'>{recommendations?.original_title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Recommendations;