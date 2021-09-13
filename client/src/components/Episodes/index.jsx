import axios from '../../components/Axios';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Episodes.css';

const base_url = 'https://image.tmdb.org/t/p/original/';
const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function Episodes({ show, ShowId }) {
    const [episodeRequest, setEpisodeRequest] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`tv/${ShowId}/season/${show.season_number}?api_key=${apiKey}`);
            setEpisodeRequest(request.data.episodes);
        }
        fetchData();
    }, [show, ShowId]);

    const redirect = x => {
        console.log(x)
    }

    console.log('episodes here', episodeRequest);

    // request returns: air_date, name, episodes[], overview, poster_path, season_number, _id

    return (
        <div>
            <div>{episodeRequest.length} Episodes</div>
            {episodeRequest.map((x) => (
                <div className='episode-picture'>
                    <img
                        src={`https://image.tmdb.org/t/p/original${x.still_path}`} alt={`${x.name}`}
                        className='episode-poster'
                        onClick={() => redirect(x)}
                    />
                </div>
            ))}
        </div>
    )
};

export default Episodes;