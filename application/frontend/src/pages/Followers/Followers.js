import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";

// import { RedirectPathContext } from '../../context/redirect-path';

// import Spinner from '../../components/UI/Spinner/Spinner';

// Import Components Here
function Followers() {

  const {profileID} = useParams();
  console.log("profileID: ",profileID);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const getFollowers = axios.get('/api/followers',{params: {profileID}}) // call to get followers
 
  const getFollowing = axios.get('/api/following',{params: {profileID}}) //call to get followed Users (following)

  // const redirectContext = useContext(RedirectPathContext);

  useEffect(() =>{
    // redirectContext.updateLoading(true);
    Promise.all([getFollowers, getFollowing])
    .then((responses)=>{
      console.log("responses: ", responses);
      setFollowers(responses[0].data);
      setFollowing(responses[1].data);
    })
    .catch((err) =>{
      console.log(err)
    })
  },[profileID])


  return (
    <div>
      <UserProfileCard followersList={followers} followingList={following}/>
    </div>
  );
}

export default Followers;
