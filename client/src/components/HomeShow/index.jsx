import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../Axios';
import './HomeShow.css'

function HomeShow({ fetchUrl }) {
    const [shows, setShow] = useState([]);
    const [count, setCount] = useState(0);

    const history = useHistory();
    const base_url = 'https://image.tmdb.org/t/p/w300/';

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl)
            setShow(request.data.results);
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = () => {
        history.push(`/shows/${shows[count].id}`);
    };

    return (
        <div className='home-show'>
            <img
                onClick={handleClick}
                className='home-show-poster'
                src={shows[count]?.poster_path ?
                    `${base_url}${shows[count]?.poster_path}`
                    :
                    "https://via.placeholder.com/300"
                }
                alt={shows[count]?.name}
            />
            <div onClick={() => setCount(count + 1)}>ARROW +</div>
            <div onClick={() => setCount(count - 1)}>ARROW -</div>
        </div>
    );
};

export default HomeShow;
