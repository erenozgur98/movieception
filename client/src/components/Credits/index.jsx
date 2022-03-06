import React, { useEffect, useState } from 'react'
import axios from '../Axios';
import './Credits.css'

// change original to w200 or w300 if not styled
const base_url = 'https://image.tmdb.org/t/p/original/';

function Credits({ movie, show, credits }) {
    const [cast, setCast] = useState([]);

    useEffect(() => {
        if (movie?.id) {
            const fetchData = async () => {
                const requestMovie = await axios.get(`/movie/${movie?.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
                setCast(requestMovie?.data.cast);
            }
            fetchData();
        } else if (show?.id) {
            const fetchData = async () => {
                const requestShow = await axios.get(`/tv/${show?.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
                setCast(requestShow?.data.cast);
            }
            fetchData();
        } else {
            setCast(credits?.cast);
        }
    }, [movie?.id, show?.id, credits]);

    const redirect = (theCast) => {
        window.location.assign(`/actors/${theCast?.id}`)
    };

    const slicedCast = cast?.slice(0, 10);

    return (
        <div className='casts'>
            <div className="casts-posters">
                {slicedCast?.map((theCast) => (
                    <>
                        {theCast?.profile_path && (
                            <div className='casts-map' key={theCast.id}>
                                <img
                                    key={theCast.id}
                                    onClick={() => redirect(theCast)}
                                    src={`${base_url}${theCast?.profile_path}`}
                                    alt={theCast?.original_name}
                                    className='cast-poster'
                                />
                                <div className='casts-name'>{theCast?.original_name}</div>
                                <div className='casts-character'>{theCast?.character}</div>
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default Credits;
