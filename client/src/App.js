import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import API from './utils/API';
import Shows from './Pages/Shows';
import Login from './Pages/Login';
import HomePage from './Pages/Home';
import Actors from './Pages/Actors';
import SignUp from './Pages/SignUp';
import Movies from './Pages/Movies';
import Profile from './Pages/Profile';
import ShowPage from './Pages/ShowPage';
import Discover from './Pages/Discover';
import Settings from './Pages/Settings';
import Header from './components/Header';
import MoviePage from './Pages/MoviePage';
import ActorPage from './Pages/ActorPage';
import SeasonPage from './Pages/SeasonPage';
import Collections from './components/Collections';
import ScrollToTop from './components/ScrollToTopBtn';
import SearchResults from './components/SearchResults';
import { SnackbarProvider } from "notistack";
import './index.css';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    API.loggedIn()
      .then(result => {
        setUser(result.data)
      })
  }, []);

  return (
    <div>
      <Router>
        <SnackbarProvider>
          <Header user={user} setUser={setUser} />
          <ScrollToTop />
          <div className='main'>
            <Route exact path='/' render={() => <HomePage user={user} setUser={setUser} />} />
            <Route exact path='/home' render={() => <HomePage user={user} setUser={setUser} />} />
            <Route exact path='/search' component={SearchResults} />
            <Route exact path='/discover' component={Discover} />
            <Route exact path='/discover/movies' component={Movies} />
            <Route exact path='/movies/:MovieId' render={() => <MoviePage user={user} />} />
            <Route exact path='/movies/:MovieId/collections/:CollectionId' component={Collections} />
            <Route exact path='/discover/shows' component={Shows} />
            <Route exact path='/shows/:ShowId' render={() => <ShowPage user={user} />} />
            <Route exact path='/shows/:ShowId/season/:SeasonId' render={() => <SeasonPage user={user} />} />
            <Route exact path='/actors' component={Actors} />
            <Route exact path='/actors/:ActorId' component={ActorPage} />
            <Route exact path='/users/:username' render={() => <Profile user={user} />} />
            <Route exact path='/settings' render={() => <Settings user={user} />} />
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
        </SnackbarProvider>
      </Router>
    </div>
  );
};

export default App;
