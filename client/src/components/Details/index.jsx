import React from "react";
import { Card, Container, Button } from 'react-bootstrap';

const Details = (props) => {

    const redirect = () => {
        console.log('will work soon')
    }

    const addToFavorites = () => {
        console.log('will work soon')
    }

    return (
        <Container className='text-center'>
            <Card style={{ width: '25rem', backgroundColor: 'black', margin: '0 auto' }}>
                <Card.Img onClick={redirect} variant='top' src={props.src} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        <p>{props.plot}</p>
                        <p>Rating: {props.rating} / 10.0</p>
                        <p>Votes: {props.votes}</p>
                        <p>Relase Date: {props.released}</p>
                    </Card.Text>
                    <Button
                        className='btn btn-primary'
                        onClick={() => {
                            addToFavorites()
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
