import React, { useState, useEffect } from 'react'
import axios from '../Axios';
import './WatchProviders.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

function WatchProviders({ movie, show }) {
    const [movieProviders, setMovieProviders] = useState([]);
    const [showProviders, setShowProviders] = useState([]);

    useEffect(() => {
        if (movie?.id) {
            const fetchData = async () => {
                const requestMovie = await axios.get(`/movie/${movie?.id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`);
                setMovieProviders(requestMovie?.data.results);
            }
            fetchData();
        } else if (show?.id) {
            const fetchData = async () => {
                const requestShow = await axios.get(`/tv/${show?.id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`);
                setShowProviders(requestShow?.data.results);
            }
            fetchData();
        }

    }, [movie?.id, show?.id]);

    const redirect = (provider, name) => {
        window.open(`https://www.google.com/search?q=${name}&${provider.provider_name}`, '_blank');
    }

    return (
        <div>
            {movie?.id ?
                <div className='' key={movie?.id}>
                    {movieProviders?.US?.flatrate &&
                        <div className='providers' key={movieProviders?.id}>
                            <div style={{ marginBottom: '1rem' }}>Available on</div>
                            <div className="providers-map">
                                {movieProviders?.US?.flatrate?.map((provider) => (
                                    <div key={provider?.id}>
                                        <img
                                            key={provider?.id}
                                            onClick={() => redirect(provider, movie.title || movie.original_title)}
                                            src={`${base_url}${provider?.logo_path}`}
                                            alt={provider?.provider_name}
                                            className='provider-logo'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                :
                <div className=''>
                    {showProviders?.US?.flatrate &&
                        <div className='providers' key={showProviders?.id}>
                            <div>Available on</div>
                            <div className="providers-map">
                                {showProviders?.US.flatrate?.map((provider) => (
                                    <div key={provider?.id}>
                                        <img
                                            key={provider?.id}
                                            onClick={() => redirect(provider, show.name || show.original_name)}
                                            src={`${base_url}${provider?.logo_path}`}
                                            alt={provider?.provider_name}
                                            className='provider-logo'
                                        />
                                        {/* <h2 className='provider-name'>{provider?.provider_name}</h2> */}
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

export default WatchProviders
