import {BrowserRouter as Router, Switch, Route, Redirect, useParams} from 'react-router-dom'

import {useEffect, useState} from 'react';
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
import ProfilePage from './pages/Profile/Profile';
import MyProfilePage from './pages/Profile/MyProfile';
import PetOwner1Page from './pages/Profile/AlexProfilePage';
import PetOwner2Page from './pages/Profile/MaryProfilePage';
import MimiProfilePage from './pages/Profile/MimiProfilePage';
import MaxProfilePage from './pages/Profile/MaxProfilePage';
import JujuProfilePage from './pages/Profile/JujuProfilePage';
import Shelter1ProfilePage from './pages/Profile/BadBoysDogPound';
import Shelter2ProfilePage from './pages/Profile/BurgsdalePetShelter';
import PetProfileCreatePage from './pages/Profile/PetProfileCreatePage';
import Business1ProfilePage from './pages/Profile/BoomingPoodleGroomingProfilePage';
import Business2ProfilePage from './pages/Profile/PawSpaProfilePage';
import Messages from './pages/Messages/Messages'
import MyPets from './pages/Pets/MyPets'
import Pets from './pages/Pets/Pets'
import ResetPage from './pages/Reset/ResetPage'

import ProfileTest from './pages/Profile/ProfileTest'

import AdminFeed from './pages/Feed/AdminFeed.js';
import Feed from './pages/Feed/Feed.js'
import Photo from './pages/Photo/Photo';
import MyPhoto from './pages/Photo/MyPhoto';
import Followers from './pages/Followers/Followers';
import ExploreUsers from './pages/ExploreUsers/ExploreUsers';

import SignUpSuccess from './pages/Sign Up/SignUpSuccess'


import MapSearch from './pages/MapSearch/MapSearch.js'

import axios from 'axios';
import UploadImage from './pages/UploadImage';

const App = () => {

  const [appUser,setAppUser] = useState("");

  console.log("rerendering app");

  useEffect(() => {
    axios.get("/api/login",{withCredentials: true}).then((response) =>{
      console.log(response.data);
      console.log(response.data);
      setAppUser(response.data);
      console.log(appUser);
    })
    .catch((err) =>{
      console.log(err);
    })
    // console.log('AppUser in App changed to: ', appUser)
  },[])


  function updateLoginState(loggedIn, user){
    console.log("Updating Login State");
    console.log(loggedIn);
    setAppUser(user);
    console.log(user);
  }





  return (
    <Router>
      <NavBar
            appUser={appUser}
            updateLoginState={updateLoginState} 
      />
       <Switch>
        <Route exact path="/" >
          <Home appUser={appUser} />
        </Route>
        <Route exact path="/login-page" >
          <LoginPage appUser={appUser} updateLoginState={updateLoginState}/>
        </Route>
        <Route path="/account-type" exact component={AccountTypePage}/>
        <Route path="/signup-page" exact component={SignUpPage}/>
        <Route path="/shelter-signup" exact component={ShelterSignUpPage}/>
        <Route path="/shelter-signup2" exact component={ShelterSignUpPage2}/>
        <Route path="/business-signup" exact component={BusinessSignUpPage}/>
        <Route path="/business-signup2" exact component={BusinessSignUpPage2}/>
        <Route path="/Edgar" component={Edgar}/>
        <Route path="/Daniel" component={Daniel}/>
        <Route path="/Em" component={Em}/>
        <Route path="/Sabrina" component={Sabrina}/>
        <Route path="/Wenjie" component={Wenjie}/>
        <Route path="/Cameron" component={Cameron}/>
        <Route path="/Wameedh" component={Wameedh}/>





        <Route path="/Feed" component={Feed} appUser={appUser}/>
        <Route path="/AdminFeed" component={AdminFeed}/>
        <Route path="/MapSearch" component={MapSearch}/>
        <Route exact path="/Profile/:profileID">
          <ProfilePage appUser={appUser}/>
        </Route>
        <Route path="/Photo" component={Photo}/>
        <Route path="/MyPhoto" component={MyPhoto}/>
        <Route path="/Messages" component={Messages}/>
        <Route path="/MyPets" component={MyPets}/>
        <Route path="/Pets" component={Pets}/>
        <Route path="/Followers" component={Followers}/>
        <Route path="/ExploreUsers" component={ExploreUsers}/>

        <Route path="/SignUpSuccess" component={SignUpSuccess}/>
        <Route path="/user/:user" component={ProfilePage}/>
        <Route path="/pet/:pet" component={ProfilePage}/>
        <Route path="/shelter/:shelter" component={ProfilePage}/>
        <Route path="/business/:business" component={ProfilePage}/>
        <Route path="/business/Register" component={ResetPage}/>
        <Route path="/uploadImage" component={UploadImage}/>


        <Route path="/reset/:token" component={ResetPage}/>

        {/* <Redirect to="/" /> */}
      </Switch>
    </Router>
  );
}

export default App;
