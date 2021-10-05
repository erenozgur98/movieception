import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Seasons.css';

function Seasons({ show }) {
    const [season, setSeasons] = useState([]);

    useEffect(() => {
        setSeasons(show?.seasons);
    }, [show]);

    const history = useHistory();
    const base_url = 'https://image.tmdb.org/t/p/original/';

    const redirect = (x) => {
        // x?.season_number === 0 ?
        // history.push(`/shows/${show?.id}/season/${x?.season_number - 1}`)
        // :
        history.push(`/shows/${show?.id}/season/${x?.season_number}`);
    };

    console.log(season)
    return (
        <div className='seasons'>
            {season ?
                <div>
                    <div>
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
                :
                null
            }
        </div>
    )
}

export default Seasons;
