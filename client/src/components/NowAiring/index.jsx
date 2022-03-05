import React, { useState, useEffect } from "react";
import requests from '../Requests';
import axios from '../Axios';
import './NowAiring.css';

function NowAiring() {
    const [nowAiring, setNowAiring] = useState()
    console.log(nowAiring)

    const base_url = 'https://image.tmdb.org/t/p/original/';

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`${requests.fetchAiringTonight}&page=1`)
            setNowAiring(request.data.results)
        }
        fetchData()
    }, [])

    return (
        <div className='airing-posters'>
            <>
                <div>
                    <div className='airing-header'>Airing Tonight</div>
                    <img
                        src={`${base_url}${nowAiring[0].poster_path}`}
                        alt={nowAiring[0].original_title}
                        className='airing-poster'
                    />
                    {nowAiring[0].name && <div className="airing-name">{nowAiring[0].name}</div>}
                    {nowAiring[0].original_name && <div className="airing-name-2">( {nowAiring[0].original_name} )</div>}
                </div>
            </>
        </div>
    )
}

export default NowAiring;
