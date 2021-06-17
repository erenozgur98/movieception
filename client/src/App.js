import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
import Profile from './Pages/Profile';
import Movies from './Pages/Movies';
import Shows from './Pages/Shows';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Discover from './Pages/Discover';
import Header from './components/Header';
// import WithAuth from './components/withAuth';
import './index.css'
// import API from './utils/API';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <div>
      <Router>
        <Header />
        <div className='main'>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/discover' component={Discover} />
          <Route exact path='/movies' component={Movies} />
          <Route exact path='/shows' component={Shows} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/login' render={(props) => <Login {...props}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setUser={setUser}
            user={user}
          />} />
          <Route exact path='/signup' render={(props) => <SignUp {...props}
            setLoggedIn={setLoggedIn}
            setUser={setUser}
            user={user}
          />} />
        </div>
      </Router>
    </div>
  );
}

export default App;
