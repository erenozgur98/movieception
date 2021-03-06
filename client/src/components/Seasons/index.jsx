import React, { useState, useEffect } from 'react';
import './Seasons.css';
import { base_url } from '../../utils/helper';

function Seasons({ show }) {
    const [season, setSeasons] = useState([]);

    useEffect(() => {
        setSeasons(show?.seasons);
    }, [show]);

    const redirect = (x) => {
        const result = season[0].name === 'Specials'
        window.location.assign(`/shows/${show?.id}/season/${result ? x?.season_number + 1 : x?.season_number}`)
    };


    return (
        <div className='seasons'>
            {season &&
                <div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        {season?.length} Seasons
                    </div>
                    <div className='seasons-posters'>
                        {season?.map((x) => (
                            <div className='seasons-map'>
                                <img
                                    key={x.id}
                                    onClick={() => redirect(x)}
                                    src={`${base_url}${x?.poster_path}`}
                                    alt={x?.name}
                                    className='seasons-poster'
                                />
                                <div className='seasons-name'>{x?.name}</div>
                                <div className='seasons-episodes'>{x?.episode_count} Episodes</div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Seasons;
