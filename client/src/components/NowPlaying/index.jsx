import React, { useState, useEffect } from "react";
import requests from "../Requests";
import axios from '../Axios';
import './NowPlaying.css'
import { base_url } from '../../utils/helper';

function NowPlaying() {
    const [nowPlaying, setNowPlaying] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`${requests.fetchNowPlaying}&page=1`)
            setNowPlaying(request.data.results)
        }
        fetchData()
    }, [])

    const redirect = () => {
        window.location.assign(`/movies/${nowPlaying && nowPlaying[0].id}`)
    }

    return (
        <div className='playing-posters'>
            <>
                {nowPlaying && <div>
                    <div className='playing-header'>Now Playing</div>
                    <img
                        src={`${base_url}${nowPlaying[0].poster_path}`}
                        alt={nowPlaying[0].original_title}
                        onClick={() => redirect()}
                        className='playing-poster'
                    />
                    {nowPlaying[0].title && <div className="playing-name">{nowPlaying[0].title}</div>}
                    {nowPlaying[0].original_title && <div className="playing-name-2">( {nowPlaying[0].original_title} )</div>}
                </div>}
            </>
        </div>
    )
}

export default NowPlaying;
