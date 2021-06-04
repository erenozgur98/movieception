import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
// import Profile from './Pages/Profile';
// import Movies from './Pages/Movies';
// import Shows from './Pages/Shows';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Discover from './Pages/Discover';
import Header from './components/Header';
import './index.css'

function App() {
  const [user, setUser] = useState({});


  return (
    <div>
      <Router>
        <Header />
        <div className='main'>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/discover' component={Discover} />
          <Route exact path='/signup' render={(props) => <SignUp {...props}
            setUser={setUser}
            user={user}
          />} />
        </div>
      </Router>
    </div>
  );
}

export default App;
