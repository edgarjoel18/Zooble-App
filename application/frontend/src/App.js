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

import AccountTypePage from './pages/AccountType/AccountType.js'
import LoginPage from './pages/Login/LoginPage.js'
import SignUpPage from './pages/Sign Up/SignUpPage.js'
import ShelterSignUpPage from './pages/Sign Up/ShelterSignUp.js'
import ShelterSignUpPage2 from './pages/Sign Up/ShelterSignUpPage2.js'
import BusinessSignUpPage from './pages/Sign Up/BusinessSignUp.js'
import BusinessSignUpPage2 from './pages/Sign Up/BusinessSignUpPage2.js'
import ProfilePage from './pages/Profile/Profile'
import PetOwnerPage from './pages/Profile/PetOwnerProfilePage'
import Messages from './pages/Messages/Messages'
import MyPets from './pages/Pets/MyPets'
import Pets from './pages/Pets/Pets'

import Feed from './pages/Feed/Feed.js'
import Photo from './pages/Photo/Photo';
import Followers from './pages/Followers/Followers';
import ExploreUsers from './pages/ExploreUsers/ExploreUsers';

import MapSearch from './pages/MapSearch/MapSearch.js'

function App() {
  const [appUser, setAppUser] = useState(null);

  return (
    <Router>
      <NavBar appUser={appUser}/>
       <Switch>
        <Route path="/" exact component={Home}/>
        <Route 
          path="/login-page" 
          exact component={LoginPage}
          appUser={appUser} 
          setAppUser={setAppUser}
        />
        <Route path="/account-type" exact component={AccountTypePage}/>
        <Route path="/signup-page" exact component={SignUpPage}/>
        <Route path="/shelter-signup" exact component={ShelterSignUpPage}/>
        <Route path="/shelter-signup2" exact component={ShelterSignUpPage2}/>
        <Route path="/business-signup" exact component={BusinessSignUpPage}/>
        <Route path="/business-signup2" exact component={BusinessSignUpPage2}/>
        <Route path="/Feed" component={Feed}/>
        <Route path="/MapSearch" component={MapSearch}/>
        <Route path="/Profile" exact component={ProfilePage}/>
        <Route path="/Profile/Alex" component={PetOwnerPage}/>
        <Route path="/Photo" component={Photo}/>
        <Route path="/Messages" component={Messages}/>
        <Route path="/MyPets" component={MyPets}/>
        <Route path="/Pets" component={Pets}/>
        <Route path="/Followers" component={Followers}/>
        <Route path="/ExploreUsers" component={ExploreUsers}/>
        <Route path="/Edgar" component={Edgar}/>
        <Route path="/Daniel" component={Daniel}/>
        <Route path="/Em" component={Em}/>
        <Route path="/Sabrina" component={Sabrina}/>
        <Route path="/Wenjie" component={Wenjie}/>
        <Route path="/Cameron" component={Cameron}/>
        <Route path="/Wameedh" component={Wameedh}/>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
