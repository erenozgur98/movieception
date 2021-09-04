import React from 'react'
import './Banner.css'

function Banner({ link, title }) {

    return (
        <div>
            <header
                className='banner'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${link})`,
                    backgroundPosition: 'center center'
                }}
            >
                <div className="banner-contents">
                    <h2 className="banner-title">
                        {title}
                    </h2>
                </div>
                <div className="banner--fadeBottom"></div>
            </header>
        </div>
    )
}

export default Banner;
