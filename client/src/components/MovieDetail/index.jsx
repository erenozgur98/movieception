import React from "react";

function MovieDetail(props) {
  return (
    <div className="text-center">
      <img alt={props.title} className="img-fluid" src={props.src} style={{ margin: "0 auto" }} />
      <h3>{props.title}</h3>
      <h3>Plot: {props.plot}</h3>
      <h3>Rating: {props.rating}/10.0</h3>
      <h3>Votes: {props.votes}</h3>
      <h3>Released: {props.released}</h3>
      <h3>Box Office: {props.boxOffice}</h3>
    </div>
  );
}

export default MovieDetail;
