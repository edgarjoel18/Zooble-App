import {useParams} from 'react-router-dom';

function ProfileTest() {

    let {profileID} = useParams();
    console.log(profileID);

    return (
        <div>
            <h1>{profileID}</h1>
        </div>
    )
}

export default ProfileTest
