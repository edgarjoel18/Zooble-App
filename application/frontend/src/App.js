import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Edgar from './components/About/Edgar'
import Cameron from './components/About/Cameron'
import Wameedh from './components/About/Wameedh'
import Daniel from './components/About/Daniel'
import Em from './components/About/Em'
import Sabrina from './components/About/Sabrina'
import Wenjie from './components/About/Wenjie'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import SearchResults from './components/SearchResults'

import LoginPage from './components/Login/LoginPage.js'
import SignUpPage from './components/SignUpPage.js'

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
