import React from 'react'

function Card({ image, name, overview }) {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src={image} alt="Card" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{overview}</p>
                {/* <a href="/" className="btn btn-primary"></a> */}
            </div>
        </div>
    )
}

export default Card
