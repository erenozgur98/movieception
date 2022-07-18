import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from '../Axios';
import { base_url } from '../../utils/helper';
import './Credits.css';

function Credits({ movie, show, credits }) {
    const [cast, setCast] = useState([]);
    const [loadMore, setLoadMore] = useState(10);

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

    const slicedCast = cast?.slice(0, loadMore);

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
            {cast?.length > loadMore &&
                <div className='movie-credits-button'>
                    <Button onClick={() => setLoadMore(loadMore + 10)}>Load More</Button>
                </div>
            }
        </div>
    );
};

export default Credits;
