import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from '../Axios';
import requests from '../Requests';
import './Banner.css'
import image from '../../images/barney-stinson.png'

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`${requests.fetchSearchMulti}how I met your mother`)
            setMovie(request.data.results[0])
        }
        fetchData()
    }, [])

    return (
        <header
            className='banner'
            style={{
                backgroundSize: 'cover',
                // backgroundImage: `url(
                //     'https://image.tmdb.org/t/p/original/${movie?.backdrop_path}'
                // )`,
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center center'
            }}
        >
            <div className="banner-contents">
            </div>
        </header>
    )
}

export default Banner;
