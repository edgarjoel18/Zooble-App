import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Edgar from './components/Edgar'
import Cameron from './components/Cameron'
import Daniel from './components/Daniel'
import Em from './components/Em'
import Sabrina from './components/Sabrina'
import Wenjie from './components/Wenjie'
import Footer from './components/Footer'
import NavBar from './components/NavBar'

import Nav from './Nav'

function App() {
  return (
    <Router>
      <NavBar/>
       <Switch>
        <Route path="/" exact component={Home}/>
        {/* <Route path="/Edgar" component={Edgar}/>
        <Route path="/Daniel" component={Daniel}/>
        <Route path="/Em" component={Em}/>
        <Route path="/Sabrina" component={Sabrina}/>
        <Route path="/Wenjie" component={Wenjie}/>
        <Route path="/Cameron" component={Cameron}/> */}
      </Switch>
    </Router>
  );
}

export default App;
