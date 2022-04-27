import React from "react";
import HeartIcon from '../Icons/heart';
import HistoryIcon from '../Icons/history';
import WatchListIcon from '../Icons/watchList';
import './buttons.css'

function Buttons({ user, movie }) {
    return (
        <div className='buttons-under-homepage-btn'>
            <div className='buttons-under-homrpage-btn-sizes'>
                <HistoryIcon movie={movie} user={user} />
            </div>
            <div className='buttons-under-homrpage-btn-sizes'>
                <HeartIcon movie={movie} user={user} />
            </div>
            <div className='buttons-under-homrpage-btn-sizes'>
                <WatchListIcon movie={movie} user={user} />
            </div>
        </div>
    )
}

export default Buttons;
