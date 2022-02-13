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
                setMovieProviders(requestMovie?.data.results);
            }
            fetchData();
        } else {
            const fetchData = async () => {
                const requestShow = await axios.get(`/tv/${show?.id}/watch/providers?api_key=${apiKey}`);
                setShowProviders(requestShow?.data.results);
            }
            fetchData();
        }

    }, [movie?.id, show?.id]);

    const redirect = (provider) => {
        history.push(``);
    }

    return (
        <div>
            {movie?.id ?
                <div className='' key={movie?.id}>
                    {movieProviders?.US?.flatrate ?
                        <div className='providers' key={movieProviders?.id}>
                            <div>Available on</div>
                            {movieProviders?.US?.flatrate?.map((provider) => (
                                <div key={provider?.id}>
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
                    {movieProviders?.US?.flatrate_and_buy ?
                        <div className='providers' key={movieProviders?.id}>
                            <div>Watch and Buy From</div>
                            {movieProviders?.US?.flatrate_and_buy?.map((provider) => (
                                <div key={provider?.id}>
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
                    {showProviders?.US?.flatrate ?
                        <div className='providers' key={showProviders?.id}>
                            <div>Available on</div>
                            {showProviders?.US.flatrate?.map((provider) => (
                                <div key={provider?.id}>
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
                    {showProviders?.US?.flatrate_and_buy ?
                        <div className='providers' key={showProviders?.id}>
                            {showProviders?.US.flatrate_and_buy?.map((provider) => (
                                <div key={provider?.id}>
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
