import React from 'react'
import './Banner.css'
import image from '../../images/barney-stinson.png'

function Banner() {

    return (
        <div>
            <header
                className='banner'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${image})`,
                    backgroundPosition: 'center center'
                }}
            >
                <div className="banner-description"></div>
                <div className="banner--fadeBottom"></div>
            </header>
        </div>
    )
}

export default Banner;
