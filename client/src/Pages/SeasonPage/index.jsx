import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios';
import './SeasonPage.css';

const base_url = 'https://image.tmdb.org/t/p/original/';
const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

function SeasonPage() {
    const [credits, setCredits] = useState();
    const [season, setSeason] = useState(1);
    const { SeasonId } = useParams();
    const { ShowId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const requestCredits = await axios.get(`tv/${ShowId}/season/${SeasonId}/aggregate_credits?api_key=${apiKey}`);
            setCredits(requestCredits.data);
            setSeason(SeasonId);
        }
        fetchData();
    }, [SeasonId, ShowId]);

    console.log(credits)

   // https://api.themoviedb.org/3/tv/63174/season/5/aggregate_credits?api_key=af737f76cdba5b7435e17cc94568c07d&language=en-US

    return (
        <div>
            <h1>Page Under Construction</h1>
        </div>
    )
}

export default SeasonPage;
