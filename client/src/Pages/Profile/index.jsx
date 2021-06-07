import React from 'react'
import { Container } from 'react-bootstrap';

function Profile() {
    return (
        <div className="card" style="width:400px">
          <img className="card-img-top" src="img_avatar1.png" alt="Card image" />
          <div className="card-body">
            <h4 className="card-title">John Doe</h4>
            <p className="card-text">Some example text.</p>
            <a href="/" className="btn btn-primary">See Profile</a>
          </div>
        </div>
        
    )
}

export default Profile



{/* <div className="card-deck">
  <div className="card bg-primary">
    <div className="card-body text-center">
      <p className="card-text">Some text inside the first card</p>
    </div>
  </div>
  <div className="card bg-warning">
    <div className="card-body text-center">
      <p className="card-text">Some text inside the second card</p>
    </div>
  </div>
  <div className="card bg-success">
    <div className="card-body text-center">
      <p className="card-text">Some text inside the third card</p>
    </div>
  </div>
  <div className="card bg-danger">
    <div className="card-body text-center">
      <p className="card-text">Some text inside the fourth card</p>
    </div>
  </div>
</div> */}