import React from 'react'
import './Banner.css'
import styled from 'styled-components';

function Banner({ link, movie }) {

    return (
        <div>
            <div
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${link})`,
                    backgroundPosition: '50% 10%',
                    opacity: '0.518',
                    height: '888px',
                    // height: '688px',
                    position: 'relative'
                }}
            >
                {/* <div className={movie ? "banner--fadeBottom-2" : "banner--fadeBottom"}></div> */}
            </div>
        </div>
    )
};

export default Banner;
