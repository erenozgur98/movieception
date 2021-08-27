import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from '../../utils/API';
import "./MoviePage.css"

function MoviePage() {
    const [movie, setMovie] = useState({});
    const { MovieId } = useParams();

    useEffect(() => {
        // API.getOneMovie, will be set later
    }, [MovieId])

    return (
        <div>
            {/* banner, has movie's backdrop path */}

            {/* actual movie picture */}
            {/* make the movie picture sticky after scroll? will look into that later when styling */}

            {/* under movie picture external id's eg FB link, IG link, twitter link */}

            {/* link to where to watch the movie */}

            {/* movie title */}

            {/* Release date, country, language, genres */}

            {/* movie description */}

            {/* videos, select type: 'trailer' , 'featurette', 'teaser' */}

            {/* video link type: youtube.com/watch?v=${key} <-- key being the video link key from the api */}

            {/* actors, with names */}
            <section className="top-section">
                <div className="background-picture">
                    <img src="https://image.tmdb.org/t/p/original/dq18nCTTLpy9PmtzZI6Y2yAgdw5.jpg" alt="black-widow" className='movie-background' />
                </div>
                <div className="poster-picture">
                    <img src="https://image.tmdb.org/t/p/original/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg" alt="black-widow" className='movie-poster' />
                    <h2>Black Widow</h2>
                </div>
            </section>
            <section className="bottom-section">
                <div className="movie-overview">
                    <p>
                        release_date: 2021-07-07
                        genre_ids: [ 28, 12, 53, 878 ]
                        original_language: "en"
                    </p>
                    <p>
                        Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default MoviePage
