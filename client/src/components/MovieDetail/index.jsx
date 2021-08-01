import React, { useState } from "react";
import { useEffect } from "react";
import axios from '../Axios';
import './MovieDetail.css'

const base_url = 'https://image.tmdb.org/t/p/original/';

function MovieDetail({ fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      console.log(request.data.results)
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl])

  console.log(movies);

  return (
    <div className='movie-detail'>
      {!movies ?
        <img
          key={movies[0]?.id}
          className='movie-detail-poster'
          src={`${base_url}${movies[0]?.poster_path || movies[0]?.profile_path}`}
          alt={movies[0]?.name}
        />
        : null
      }
    </div>
  );
}

export default MovieDetail;
