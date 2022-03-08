import axios from '../../components/Axios';
import React, { useState, useEffect } from 'react';
import './Episodes.css';

function Episodes({ show, ShowId, SeasonId }) {
    const [episodeRequest, setEpisodeRequest] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`tv/${ShowId}/season/${show?.season_number}?api_key=${process.env.REACT_APP_API_KEY}`);
            setEpisodeRequest(request.data.episodes);
        }
        fetchData();
    }, [show, ShowId]);


    const redirect = x => {
        window.location.assign(`/shows/${ShowId}/season/${SeasonId}/episode/${x?.episode_number}`);
    };

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    };

    return (
        <div className='episodes-map'>
            <div style={{ textAlign: 'center', margin: '2rem', fontSize: '2rem' }}>{episodeRequest?.length} Episodes</div>
            {episodeRequest?.map((x) => (
                <div className='episode-picture'>
                    {x?.still_path &&
                        <>
                            <img
                                src={`https://image.tmdb.org/t/p/original${x?.still_path}`} alt={`${x?.name}`}
                                className='episode-poster'
                                onClick={() => redirect(x)}
                            />
                            <div className='episode-overview'>
                                {x?.season_number === 0 ?
                                    <div>{x?.season_number + 1}x{x?.episode_number} {x?.name}</div>
                                    :
                                    <div>{x?.season_number}x{x?.episode_number} {x?.name}</div>
                                }
                                <div>{new Date(x?.air_date).toLocaleString('en-US', options)}</div>
                                <div>{x?.overview}</div>
                            </div>
                        </>
                    }
                </div>
            ))}
        </div>
    )
};

export default Episodes;