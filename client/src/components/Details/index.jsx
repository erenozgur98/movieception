import React from "react";
import { Container, Button } from 'react-bootstrap';
import Favorite from "../Favorite";
import './Details.css'

const Details = ({ movie, handleClose }) => {

    const redirect = (movie) => {
        console.log('redirect, will work soon')
        console.log(movie)
    };

    const addToFavorites = (movie) => {
        <Favorite movie={movie} />
        console.log(movie)
    };

    const base_url = 'https://image.tmdb.org/t/p/original/';

    // const truncate = (str, n) => {
    //     return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    // }

    return (
        <Container className='details'>
            <img
                onClick={() => redirect(movie)}
                className='image'
                src={
                    movie?.backdrop_path || movie?.poster_path || movie?.profile_path ?
                        `${base_url}${movie?.backdrop_path || movie?.poster_path || movie?.profile_path}`
                        :
                        "https://via.placeholder.com/300"
                }
                alt={movie?.title || movie?.original_name}
            />
            <div className='content'>
                <i onClick={handleClose} className="fas fa-times"></i>
                <h3>{movie?.title || movie?.original_name}</h3>
                <div>
                    <div className="truncate">{movie?.overview}</div>
                    <div>Rating: {movie?.vote_average} / 10.0</div>
                    <div>Release Date: {movie?.release_date || movie?.first_air_date}</div>
                </div>
                <Button className="btn btn-warning" onClick={() => addToFavorites(movie)}>Add To Favorites</Button>
                {/* <Button className="btn btn-danger" onClick={handleClose}>CLOSE</Button> */}
            </div>
        </Container>
    );
}

export default Details;
