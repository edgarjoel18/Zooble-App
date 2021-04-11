import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
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

function App() {
  return (
    <Router>
      <NavBar/>
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
      </Switch>
    </Router>
  );
}

export default App;
