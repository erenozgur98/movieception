import React from "react";
import { Container, Card, Button } from 'react-bootstrap';

function MovieDetail(props) {

  const redirect = () => {
    console.log('will work soon')
  }

  const addToFavorites = () => {
    console.log('will work soon')
  }

  return (
    <Container className='text-center'>
            <Card style={{ width: '15rem', backgroundColor: 'black', margin: '0 auto' }}>
                <Card.Img onClick={redirect} variant='top' src={props.Poster} style={{ width: ''}} />
                <Card.Body>
                    <Card.Title>{props.Title} - {props.Year}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                    <Button
                        className='btn btn-primary'
                        onClick={() => {
                            addToFavorites()
                        }}
                    >
                        Go To {props.Title}
                    </Button>
                </Card.Body>
            </Card>
        </Container>
  );
}

export default MovieDetail;
