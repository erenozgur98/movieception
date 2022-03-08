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
import API from './utils/API';
import MoviePage from './Pages/MoviePage';
import ShowPage from './Pages/ShowPage';
import ActorPage from './Pages/ActorPage';
import SearchResults from './components/SearchResults';
import SeasonPage from './Pages/SeasonPage';
import EpisodePage from './Pages/EpisodePage';
import Collections from './components/Collections';
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
            <Route exact path='/shows/:ShowId/season/:SeasonId' component={SeasonPage} />
            <Route exact path='/shows/:ShowId/season/:SeasonId/episode/:EpisodeId' component={EpisodePage} />
            <Route exact path='/actors' component={Actors} />
            <Route exact path='/actors/:ActorId' component={ActorPage} />
            <Route exact path='/users/:username' render={() => <Profile user={user} />} />
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
