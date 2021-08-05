import React from "react";
import { Card, Container, Button } from 'react-bootstrap';

const Details = ({ movie }) => {

    const redirect = (movie) => {
        console.log('redirect, will work soon')
        console.log(movie)
    }

    const addToFavorites = (movie) => {
        console.log('add to favorites, will work soon')
        console.log(movie)
    }

    const base_url = 'https://image.tmdb.org/t/p/original/';

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <Container className='text-center'>
            <Card style={{ width: '18rem', backgroundColor: 'black', margin: '0 auto' }}>
                <Card.Img onClick={() => redirect(movie)} variant='top' src={`${base_url}${movie?.poster_path}`} style={{ width: '' }} />
                <Card.Body>
                    <Card.Title>{movie?.title || movie?.original_name}</Card.Title>
                    <Card.Text>
                        <p>{truncate(movie?.overview, 150)}</p>
                        <p>Rating: {movie?.vote_average} / 10.0</p>
                        <p>Votes: {movie?.vote_count}</p>
                        <p>Relase Date: {movie?.release_date || movie?.first_air_date}</p>
                    </Card.Text>
                    <Button
                        className='btn btn-primary'
                        onClick={() => {
                            addToFavorites(movie)
                        }}
                    >
                        Add To Favorites
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Details;
