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
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl])

  const handleClick = (movie) => {
    console.log('Movie: ', movie)
  };

  return (
    <div className='movie-detail'>
      {/* {!movies ?
        <img
          key={movies[0]?.id}
          className='movie-detail-poster'
          src={`${base_url}${movies[0]?.poster_path || movies[0]?.profile_path}`}
          alt={movies[0]?.name}
        />
        : null
      } */}
      {movies.map((movie) => (
        <img
          key={movie?.id}
          className='movie-detail-poster'
          onClick={() => handleClick(movie)}
          src={`${base_url}${movie?.poster_path || movie?.profile_path}`}
          alt={movie?.name}
        />
      ))}
    </div>
  );
}

export default MovieDetail;
