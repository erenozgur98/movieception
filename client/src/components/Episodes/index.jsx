import axios from '../../components/Axios';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Episodes.css';
import { useHistory } from 'react-router';

const base_url = 'https://image.tmdb.org/t/p/original/';
const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function Episodes({ show, ShowId, SeasonId }) {
    const [episodeRequest, setEpisodeRequest] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`tv/${ShowId}/season/${show.season_number}?api_key=${apiKey}`);
            setEpisodeRequest(request.data.episodes);
        }
        fetchData();
    }, [show, ShowId]);

    const history = useHistory();

    const redirect = x => {
        history.push(`/shows/${ShowId}/seasons/${SeasonId}/episodes/${x?.episode_number}`);
    }

    console.log('episodes here', episodeRequest);

    return (
        <div className='episodes-map'>
            <div>{episodeRequest.length} Episodes</div>
            {episodeRequest.map((x) => (
                <div className='episode-picture'>
                    <img
                        src={`https://image.tmdb.org/t/p/original${x?.still_path}`} alt={`${x?.name}`}
                        className='episode-poster'
                        onClick={() => redirect(x)}
                    />
                    <div className='overview'>
                        <div>{x?.season_number}x{x?.episode_number} {x?.name}</div>
                        <div>{x?.air_date}</div>
                        <div>{x?.overview}</div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Episodes;