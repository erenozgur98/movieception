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
                <div className="banner-contents">
                    <h1 className="banner-title">
                        
                    </h1>
                </div>
                <h1 className="banner-description">
                    
                </h1>
                <div className="banner--fadeBottom"></div>
            </header>
        </div>
    )
}

export default Banner;
