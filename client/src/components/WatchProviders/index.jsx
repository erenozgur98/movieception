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
                setShowProviders(requestShow?.data.reslts.US);
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
            {movieProviders?.buy?.map((provider) => (
                <div>
                    <img
                        key={provider?.id}
                        onClick={() => redirect(provider)}
                        src={`${base_url}${provider?.logo_path}`}
                        alt={provider?.provider_name}
                        className='provider-logo'
                    />
                    <h2>{provider?.provider_name}</h2>
                </div>
            ))}
        </div>
    )
}

export default WatchProviders
