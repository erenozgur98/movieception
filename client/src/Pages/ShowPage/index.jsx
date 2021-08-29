import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../../components/Axios'
import API from '../../utils/API';

function ShowPage() {
    const [show, setShow] = useState({});
    const { ShowId } = useParams();

    const apiKey = 'af737f76cdba5b7435e17cc94568c07d';

    useEffect(() => {
        // API.getOneMovie, will be set later
        const fetchData = async () => {
            const request = await axios.get(`/tv/${ShowId}?api_key=${apiKey}`);
            setShow(request.data)
        }
        fetchData();
    }, [ShowId])

    console.log(show)

    return (
        <div>
            {/* banner, has show's backdrop path */}

            {/* actual show picture */}
            {/* make the show picture sticky after scroll? will look into that later when styling */}

            {/* under show picture external id's eg FB link, IG link, twitter link */}

            {/* link to where to watch the show */}

            {/* show title */}

            {/* Release date, country, language, genres */}

            {/* show description */}

            {/* videos, select type: 'trailer' , 'featurette', 'teaser' */}

            {/* video link type: youtube.com/watch?v=${key} <-- key being the video link key from the api */}

            {/* actors, with names */}
            <div className="top-section">
                <div className="background-picture">
                    <img src={`https://image.tmdb.org/t/p/original${show?.backdrop_path}`} alt="movie-poster" className='movie-background' />
                </div>
                <div className="poster-picture">
                    <img src={`https://image.tmdb.org/t/p/original${show?.poster_path}`} alt="black-widow" className='movie-poster' />
                    <h2>{show?.original_name}</h2>
                </div>
            </div>
            <div className="bottom-section">
                <div className="movie-overview">
                    <div>
                        <a href={show?.homepage} target="_blank" rel="noreferrer">Homepage</a>
                    </div>
                    <div>
                        First Air Date: {show?.first_air_date}
                    </div>
                    <div>
                        Last Air Date: {show?.last_air_date}
                    </div>
                    <div>
                        Seasons: {show?.number_of_seasons}
                    </div>
                    <div>
                        Episodes: {show?.number_of_episodes}
                    </div>
                    <div>
                        {/* Genres: {show?.genres.map(x => x.name)} */}
                    </div>
                    <div>
                        Language: {show?.original_language}
                    </div>
                    <div>
                        {/* Spoken Languages: {show?.spoken_languages.map(x => x.english_name)} */}
                    </div>
                    <div>
                        {/* the [0] is doesn't seem to be working, added todo */}
                        {/* Runtime: {show?.episode_run_time[0]} minutes */}
                    </div>
                    <div>
                        Vote Average: {show?.vote_average} / 10
                    </div>
                    <div>
                        {/* Country: {show?.production_countries.map(x => x.name)} */}
                    </div>
                    <div>
                        {/* add logos to companies later */}
                        {/* Production Companies: {show?.production_companies.map(x => x.name)} */}
                    </div>
                    <div>
                        {/* maybe add this too? will consider */}
                        {/* {show?.belongs_to_collection} */}
                    </div>
                    <div>
                        {show?.tagline}
                    </div>
                    <div>
                        {show?.overview}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowPage
