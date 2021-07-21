import React from "react";

function MovieDetail(props) {
  return (
    <div className="text-center">
      <img alt={props.title} className="img-fluid" src={props.src} style={{ margin: "0 auto" }} />
      <h4>{props.title}</h4>
      <h4>Plot: {props.plot}</h4>
      <h4>Rating: {props.rating} / 10.0</h4>
      <h4>Votes: {props.votes}</h4>
      <h4>Released: {props.released}</h4>
    </div>
  );
}

export default MovieDetail;
