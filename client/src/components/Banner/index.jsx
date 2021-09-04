import React from 'react'
// import image from '../../images/barney-stinson-1.jpg';
import './Banner.css'


function Banner({ link, title, image }) {

    return (
        <div>
            <header
                className='banner'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${link})` || `url(${image})`,
                    // backgroundPosition: 'center center'
                }}
            >
                <div className="banner-contents">
                    <h2 className="banner-title">
                        {/* {title} */}
                    </h2>
                </div>
                <div className="banner--fadeBottom"></div>
            </header>
        </div>
    )
}

export default Banner;
