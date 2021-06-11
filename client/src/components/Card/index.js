import React from 'react'

function Card({ props }) {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src={props.image} alt="Card" />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.overview}</p>
                {/* <a href="/" className="btn btn-primary"></a> */}
            </div>
        </div>
    )
}

export default Card
