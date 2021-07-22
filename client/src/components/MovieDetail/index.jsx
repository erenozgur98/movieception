import React from "react";
import { Container, Card, Button } from 'react-bootstrap';

function MovieDetail(props) {

  const moviePage = () => {
    console.log(props.Title)
  }

  return (
    <Container className='text-center'>
      <Card style={{ minWidth: '14rem', maxWidth: '15rem', backgroundColor: '' }}>
        {/* <Card.Title>{props.Title}</Card.Title> */}
        <Card.Img
          onClick={moviePage}
          src=
          {
            props.Poster === "N/A"
              ?
              // placeholder image if no poster available, will change later
              "https://via.placeholder.com/600"
              :
            props.Poster
          }
          style={{ width: '' }}
        />
        {/* <Card.Body>
                    <Card.Text>
                    </Card.Text>
                    <Button
                        className='btn btn-primary'
                        onClick={() => {
                            moviePage()
                        }}
                    >
                        Go To Movie
                    </Button>
                </Card.Body> */}
      </Card>
    </Container>
  );
}

export default MovieDetail;
