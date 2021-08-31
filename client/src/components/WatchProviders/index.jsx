import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
import './WatchProviders.css';

const base_url = 'https://image.tmdb.org/t/p/original/';
const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function WatchProviders({ movie, show }) {
    const [movieProviders, setMovieProviders] = useState([]);
    const [showProviders, setShowProviders] = useState([]);

    const history = useHistory()

    useEffect(() => {
        if (movie?.id) {
            const fetchData = async () => {
                const requestMovie = await axios.get(`/movie/${movie?.id}/watch/providers?api_key=${apiKey}`);
                setMovieProviders(requestMovie?.data.results.US);
            }
            fetchData();
        } else {
            const fetchData = async () => {
                const requestShow = await axios.get(`/tv/${show?.id}/watch/providers?api_key=${apiKey}`);
                setShowProviders(requestShow?.data.results.US);
            }
            fetchData();
        }

    }, [movie?.id, show?.id]);

    const redirect = (provider) => {
        history.push(``);
    }

    console.log(movieProviders);
    // movie-showProviders.buy, .flatrate, .link, .rent
    console.log(showProviders);

    return (
        <div>
            {movie?.id ?
                <div className=''>
                    {movieProviders?.buy ?
                        <div className='providers'>
                            {movieProviders?.buy?.map((provider) => (
                                <div>
                                    <img
                                        key={provider?.id}
                                        onClick={() => redirect(provider)}
                                        src={`${base_url}${provider?.logo_path}`}
                                        alt={provider?.provider_name}
                                        className='provider-logo'
                                    />
                                    {/* <h2 className='provider-name'>{provider?.provider_name}</h2> */}
                                </div>
                            ))}
                        </div>
                        :
                        null
                    }
                    {movieProviders?.rent ?
                        <div className='providers'>
                            {movieProviders?.rent?.map((provider) => (
                                <div>
                                    <img
                                        key={provider?.id}
                                        onClick={() => redirect(provider)}
                                        src={`${base_url}${provider?.logo_path}`}
                                        alt={provider?.provider_name}
                                        className='provider-logo'
                                    />
                                    {/* <h2 className='provider-name'>{provider?.provider_name}</h2> */}
                                </div>
                            ))}
                        </div>
                        :
                        null
                    }
                    {movieProviders?.flatrate ?
                        <div className='providers'>
                            {movieProviders?.flatrate?.map((provider) => (
                                <div>
                                    <img
                                        key={provider?.id}
                                        onClick={() => redirect(provider)}
                                        src={`${base_url}${provider?.logo_path}`}
                                        alt={provider?.provider_name}
                                        className='provider-logo'
                                    />
                                    {/* <h2 className='provider-name'>{provider?.provider_name}</h2> */}
                                </div>
                            ))}
                        </div>
                        :
                        null
                    }
                    {movieProviders?.flatrate_and_buy ?
                        <div className='providers'>
                            {movieProviders?.flatrate_and_buy?.map((provider) => (
                                <div>
                                    <img
                                        key={provider?.id}
                                        onClick={() => redirect(provider)}
                                        src={`${base_url}${provider?.logo_path}`}
                                        alt={provider?.provider_name}
                                        className='provider-logo'
                                    />
                                    {/* <h2 className='provider-name'>{provider?.provider_name}</h2> */}
                                </div>
                            ))}
                        </div>
                        :
                        null
                    }
                </div>
                :
                <div className=''>
                    {showProviders?.buy ?
                        <div className='providers'>
                            {showProviders?.buy?.map((provider) => (
                                <div>
                                    <img
                                        key={provider?.id}
                                        onClick={() => redirect(provider)}
                                        src={`${base_url}${provider?.logo_path}`}
                                        alt={provider?.provider_name}
                                        className='provider-logo'
                                    />
                                    {/* <h2 className='provider-name'>{provider?.provider_name}</h2> */}
                                </div>
                            ))}
                        </div>
                        :
                        null
                    }
                    {showProviders?.rent ?
                        <div className='providers'>
                            {showProviders?.rent?.map((provider) => (
                                <div>
                                    <img
                                        key={provider?.id}
                                        onClick={() => redirect(provider)}
                                        src={`${base_url}${provider?.logo_path}`}
                                        alt={provider?.provider_name}
                                        className='provider-logo'
                                    />
                                    {/* <h2 className='provider-name'>{provider?.provider_name}</h2> */}
                                </div>
                            ))}
                        </div>
                        :
                        null
                    }
                    {showProviders.flatrate ?
                        <div className='providers'>
                            {showProviders?.flatrate?.map((provider) => (
                                <div>
                                    <img
                                        key={provider?.id}
                                        onClick={() => redirect(provider)}
                                        src={`${base_url}${provider?.logo_path}`}
                                        alt={provider?.provider_name}
                                        className='provider-logo'
                                    />
                                    {/* <h2 className='provider-name'>{provider?.provider_name}</h2> */}
                                </div>
                            ))}
                        </div>
                        :
                        null
                    }
                    {showProviders?.flatrate_and_buy ?
                        <div className='providers'>
                            {showProviders?.flatrate_and_buy?.map((provider) => (
                                <div>
                                    <img
                                        key={provider?.id}
                                        onClick={() => redirect(provider)}
                                        src={`${base_url}${provider?.logo_path}`}
                                        alt={provider?.provider_name}
                                        className='provider-logo'
                                    />
                                    {/* <h2 className='provider-name'>{provider?.provider_name}</h2> */}
                                </div>
                            ))}
                        </div>
                        :
                        null
                    }
                </div>
            }
        </div>
    )
}

export default WatchProviders
