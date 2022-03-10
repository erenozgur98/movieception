import React, { useState, useEffect } from "react";
import requests from '../Requests';
import axios from '../Axios';
import './NowAiring.css';

function NowAiring() {
    const [nowAiring, setNowAiring] = useState();

    const base_url = 'https://image.tmdb.org/t/p/original/';

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`${requests.fetchAiringTonight}&page=1`)
            setNowAiring(request.data.results)
        }
        fetchData()
    }, [])

    const redirect = () => {
        window.location.assign(`/shows/${nowAiring && nowAiring[0].id}`)
    }

    return (
        <div className='airing-posters'>
            <>
                {nowAiring && <div>
                    <div className='airing-header'>Airing Tonight</div>
                    <img
                        src={nowAiring[0].poster_path ? `${base_url}${nowAiring[0].poster_path}` : 'https://via.placeholder.com/150'}
                        alt={nowAiring[0].original_title}
                        onClick={() => redirect()}
                        className='airing-poster'
                    />
                    {nowAiring[0].name && <div className="airing-name">{nowAiring[0].name}</div>}
                    {nowAiring[0].original_name && <div className="airing-name-2">( {nowAiring[0].original_name} )</div>}
                </div>}
            </>
        </div>
    )
}

export default NowAiring;
