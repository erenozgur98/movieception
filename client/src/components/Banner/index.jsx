import React from 'react'
import { useHistory } from 'react-router-dom'
import './Banner.css'
import styled from 'styled-components'


function Banner({ link, title, movie }) {
    const history = useHistory();
    const redirect = () => {
        if (movie.media_type === 'tv') {
            history.push(`/shows/${movie.id}`)
        } else {
            history.push(`/movies/${movie.id}`)
        }
    }

    const StyledDiv = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: 50% 10%;
        transition: all 1s;
    `

    return (
        <div>
            <header
                className='banner'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${link})`,
                    // backgroundPosition: 'center center'
                }}
            >
                <div>
                    {title ?
                        <h2 className="banner-title">
                            Image from: {title}
                        </h2>
                        :
                        null
                    }
                </div>
                {movie ?
                    <div className='banner-description'>
                        <button className='banner-btn' onClick={redirect}>Go To {movie?.title || movie?.name}</button>
                    </div>
                    :
                    null
                }
                <div className={movie ? "banner--fadeBottom-2" : "banner--fadeBottom"}></div>
            </header>
        </div>
    )
};

export default Banner;
