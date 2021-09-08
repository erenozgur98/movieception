import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
import './HomeShow.css'

function HomeShow({ fetchUrl }) {
    const [shows, setShow] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showsPerPage, setShowsPerPage] = useState(20);

    const history = useHistory();
    const base_url = 'https://image.tmdb.org/t/p/w300/';

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`${fetchUrl}&page=${currentPage}`)
            setShow(request.data.results);
        }
        fetchData();
    }, [fetchUrl, currentPage]);

    const handleClick = () => {
        history.push(`/shows/${shows[count].id}`);
    };

    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);

    return (
        <div className='home'>
            <div>#{count + 1} Top 10</div>
            <div className='home-show'>
                <div onClick={() => count >= 1 ? setCount(count - 1) : setCount(count)}><i className="arrow fas fa-angle-left"></i></div>
                <img
                    onClick={handleClick}
                    className='home-show-poster'
                    src={currentShows[count]?.poster_path ?
                        `${base_url}${currentShows[count]?.poster_path}`
                        :
                        "https://via.placeholder.com/300"
                    }
                    alt={currentShows[count]?.name}
                />
                <div onClick={() => count < 9 ? setCount(count + 1) : setCount(count)}><i className="arrow fas fa-angle-right"></i></div>
            </div>
        </div>
    );
};

export default HomeShow;
