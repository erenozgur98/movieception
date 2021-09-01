import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
import Profile from './Pages/Profile';
import Movies from './Pages/Movies';
import Shows from './Pages/Shows';
import Actors from './Pages/Actors';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Discover from './Pages/Discover';
import Header from './components/Header';
import './index.css'
import API from './utils/API';
import MoviePage from './Pages/MoviePage';
import ShowPage from './Pages/ShowPage';
import ActorPage from './Pages/ActorPage';
import SearchResults from './components/SearchResults';
// import Banner from './components/Banner';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [, setLoaded] = useState(false);

  useEffect(() => {
    API.loggedIn()
      .then(result => {
        setUser(result.data)
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setLoaded(true);
      })
  }, []);

  const handleLogout = () => {
    setUser({});
    API.logOut();
  };

  return (
    <div>
      <Router>
        <Header user={user} handleLogout={handleLogout} />
        {/* Banner here? or no banner? */}
        {/* <Banner /> */}
        <div className='main'>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/search/query=:searchResults' component={SearchResults} />
          <Route exact path='/discover' component={Discover} />
          <Route exact path='/movies' component={Movies} />
          <Route exact path='/movies/:MovieId' component={MoviePage} />
          <Route exact path='/shows' component={Shows} />
          <Route exact path='/shows/:ShowId' component={ShowPage} />
          <Route exact path='/actors' component={Actors} />
          <Route exact path='/actors/:ActorId' component={ActorPage} />
          <Route exact path='/profile' component={Profile} />
          {/* create UserProfile page, replace profile */}
          <Route exact path='/profile/:username' component={Profile} />
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
