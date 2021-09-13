import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from '../../components/Axios';
import './SeasonPage.css';
import Banner from '../../components/Banner';

const base_url = 'https://image.tmdb.org/t/p/original/';
const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function SeasonPage() {
    const [show, setShow] = useState({});
    const [credits, setCredits] = useState();
    const { SeasonId } = useParams();
    const { ShowId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const requestCredits = await axios.get(`tv/${ShowId}/season/${SeasonId}/aggregate_credits?api_key=${apiKey}`);
            const request = await axios.get(`/tv/${ShowId}?api_key=${apiKey}`);
            setCredits(requestCredits.data);
            setShow(request.data.seasons[SeasonId]);
        }
        fetchData();
    }, [SeasonId, ShowId]);

    console.log('sssssssssssssssss', show)

    return (
        <div>
            {/* show returns name, overview, air_date, episode_count, id, poster_path, season_number */}
        </div>
    )
}

export default SeasonPage;
