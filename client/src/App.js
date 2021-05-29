import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
// import Profile from './Pages/Profile';
// import Movies from './Pages/Movies';
// import Shows from './Pages/Shows';
import SignUp from './Pages/SignUp';
// import Login from './Pages/Login';
// import Discover from './Pages/Discover';
import Header from './components/Header';
function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className='main'>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/home' component={HomePage} />
          {/* <Route exact path='/login' component={Login} /> */}
          <Route exact path='/signup' component={SignUp} />
        </div>
      </Router>
    </div>
  );
}

export default App;
