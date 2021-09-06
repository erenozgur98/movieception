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

    console.log(movie)

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
                        <h1 className='banner-real-title truncate'>
                            {movie?.title || movie?.name}
                        </h1>
                        <h1 className='banner-description truncate'>
                            {movie?.overview}
                        </h1>
                        <button className='banner-btn btn btn-primary' onClick={redirect}>Go To Movie</button>
                    </div>
                    :
                    null
                }
                <div className={movie ? "banner--fadeBottom-2" : "banner--fadeBottom"}></div>
            </header>
        </div>
    )
}

export default Banner;
