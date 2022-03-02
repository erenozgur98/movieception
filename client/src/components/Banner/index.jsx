import React from 'react'
import './Banner.css'

function Banner({ link }) {

    return (
        <div>
            <div
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${link})`,
                    backgroundPosition: '50% 10%',
                    opacity: '0.518',
                    height: '762px',
                    // backgroundImage: 'linear-radient(180deg, transparent, rgba(37, 37, 37, 0.61), #111)'
                    // height: '688px',
                    // position: 'fixed'
                }}
            >
                <div className="fadeBottom"></div>
            </div>
        </div>
    )
};

export default Banner;
