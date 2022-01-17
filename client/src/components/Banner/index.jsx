import React from 'react'
import { useHistory } from 'react-router-dom'
import './Banner.css'

function Banner({ link, title, movie }) {
    const history = useHistory();
    const redirect = () => {
        if (movie.media_type === 'tv') {
            history.push(`/shows/${movie.id}`)
        } else {
            history.push(`/movies/${movie.id}`)
        }
    }

    return (
        <div>
            <header
                className='banner'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${link})`,
                    backgroundPosition: '50% 10%'
                    // backgroundPosition: 'center center'
                }}
            >
                <div className='banner-button-container'>
                    {title ?
                        <h2 className="banner-title">
                            Image from: {title}
                        </h2>
                        :
                        null
                    }
                </div>
                {movie ?
                    <div className='banner-button-container'>
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
