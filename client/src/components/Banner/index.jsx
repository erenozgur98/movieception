import React from 'react'
import './Banner.css'

function Banner({ link }) {

    return (
        <div>
            <div
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${link ? link : '/6MQmtWk4cFwSDyNvIgoJRBIHUT3.jpg'})`,
                    backgroundPosition: '50% 10%',
                    opacity: '0.518',
                    height: '762px'
                }}
            >
                <div className="fadeBottom"></div>
            </div>
        </div>
    )
};

export default Banner;
