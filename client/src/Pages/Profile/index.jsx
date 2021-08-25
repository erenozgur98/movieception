import React from 'react'
import { Container } from 'react-bootstrap';

function Profile() {
    return (
        <>
            <Container>
                <div className="card bg-dark">
                    <img className="card-img-top" src="" alt="Card" />
                    <div className="card-body">
                        <h4 className="card-title">Some Example Header</h4>
                        <p className="card-text">Some example text</p>
                        <a href="/" className="btn btn-danger">See Profile</a>
                    </div>
                </div>
                <h4>Some Header</h4>
                <div className="card-deck">
                    <div className="card bg-primary">
                        <div className="card-body text-center">
                            <p className="card-text"></p>
                        </div>
                    </div>
                    <div className="card bg-warning">
                        <div className="card-body text-center">
                            <p className="card-text"></p>
                        </div>
                    </div>
                    <div className="card bg-success">
                        <div className="card-body text-center">
                            <p className="card-text"></p>
                        </div>
                    </div>
                    <div className="card bg-danger">
                        <div className="card-body text-center">
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Profile



