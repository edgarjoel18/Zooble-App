import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import {useState} from 'react';
import Home from './pages/Home/Home'
import Edgar from './pages/AboutMe/Edgar'
import Cameron from './pages/AboutMe/Cameron'
import Wameedh from './pages/AboutMe/Wameedh'
import Daniel from './pages/AboutMe/Daniel'
import Em from './pages/AboutMe/Em'
import Sabrina from './pages/AboutMe/Sabrina'
import Wenjie from './pages/AboutMe/Wenjie'
import NavBar from './components/Nav/NavBar'
import SearchResults from './components/Search/SearchResults'


import LoginPage from './pages/Login/LoginPage.js'
import SignUpPage from './pages/Sign Up/SignUpPage.js'
import ProfilePage from './pages/Profile/Profile'
import Messages from './pages/Messages/Messages'
import Pets from './pages/Pets/Pets'

import Feed from './pages/Feed/Feed.js'
import Photo from './pages/Photo/Photo';

import MapSearch from './pages/MapSearch/MapSearch.js'

function App() {
  const [appUser, setAppUser] = useState(null);

  return (
    <Router>
      <NavBar appUser={appUser}/>
       <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/search-results" exact component={SearchResults}/>
        <Route path="/login-page" exact component={LoginPage}/>
        <Route path="/signup-page" exact component={SignUpPage}/>
        <Route path="/Edgar" component={Edgar}/>
        <Route path="/Daniel" component={Daniel}/>
        <Route path="/Em" component={Em}/>
        <Route path="/Sabrina" component={Sabrina}/>
        <Route path="/Wenjie" component={Wenjie}/>
        <Route path="/Cameron" component={Cameron}/>
        <Route path="/Wameedh" component={Wameedh}/>
        <Route path="/Feed" component={Feed}/>
        <Route path="/MapSearch" component={MapSearch}/>
        <Route path="/Profile" component={ProfilePage}/>
        <Route path="/Photo" component={Photo}/>
        <Route path="/Messages" component={Messages}/>
        <Route path="/Pets" component={Pets}/>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
