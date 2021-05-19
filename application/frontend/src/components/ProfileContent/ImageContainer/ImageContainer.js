import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './ImageContainer.module.css';
import styled from 'styled-components';

import PostModal from '../../Modals/PostModal'

function ImageContainer({previews, profile, title, selfView}) {
    console.log("previews: ",previews);
    console.log("previews.length: ",previews.length);

    const [postModalDisplay, setPostModalDisplay] = useState(false);
    const [imageStack, setImageStack] = useState();

    const [selectedPost,setSelectedPost] = useState({});

    let history = useHistory();

    function closePostModal(){
        console.log('exit button clicked')
        setPostModalDisplay(false);
    }
    function presentPostModal(index){
        setSelectedPost(previews[index])
        console.log('clicked on image');
        setPostModalDisplay(true);
    }

    useEffect (() => {
        console.log("ImageContainer useEffect");
        setImageStack(displayImageStack(previews.length, profile.type));
        console.log(profile)
    }, [previews])

    //display a given number of pictures
    const displayImageStack = (val, accountType) => {
        console.log('displayImageStack', previews);
        console.log("val: ",val)
        if (val === 0)
            return (
                <Link>
                    <div className={styles.EmptyDiv} >
                    </div>
                </Link>
            );
        // set limited amount of photos displayed 
        let marginToRight = null;
        if (accountType === 'Shelter') {
            marginToRight = 40;
            val = Math.min(val, 3);
        }
        else {
            marginToRight = 67.6;
            val = Math.min(val, 6);
        }
        //accountType === 'Shelter' ? marginToRight = 40 : marginToRight = 67.6;
        let imageStack = [];
        for (let i = 0; i < val; i++) {
            imageStack.push(i);
        }

        return (
            <div className={styles.ImageStack} >
                {imageStack.map((_, index) => {
                    let position = 'sticky';
                    let top = '';
                    //let right = '';
                    let left = ''
                    if (index > 0) {
                        position = 'absolute';
                        top = '0';
                        //right = '0';
                        left = '0';
                    }
                    const Img = styled.div `
                        height: 162px;
                        width: 162px;
                        top: ${top};
                        left: ${left};
                        position: ${position};
                        margin-left: ${(val-index-1) * marginToRight  + 'px'};
                        border-radius: 15px;
                        text-align: center;
                        box-shadow: var(--elevation-1);
                        `;
                    let displayPostModal = (
                        <div onClick={() => presentPostModal(index)} key={previews[index].timestamp + index}>
                            <Img 
                                className={styles.ImageStack_pic}
                            >
                                <img src={previews[index].link} alt="No Image Found" className={styles.ImageStack_pic} />
                            </Img>
                        </div>
                    )
                    if (title === 'My Siblings' || title === 'My Pets' || title === 'Pets')
                        displayPostModal = (
                            <Link to={"/Profile/" + previews[index].profile_id} key={index} >
                                    <Img 
                                        className={styles.ImageStack_pic}
                                    >
                                    <img src={previews[index].profile_pic_link} alt="No Image Found" className={styles.ImageStack_pic} />
                                    <div className={styles.ImageStackText} >{previews[index].display_name}</div>
                                </Img>
                            </Link>
                        )
                    return displayPostModal
                })}
            </div>
        );
    }

    // function seeAllImageHandler(path) {
    //     const queryParams = (
    //         encodeURIComponent('id') + '=' + encodeURIComponent(profile.id) + '&' 
    //         + encodeURIComponent('name') + '=' + encodeURIComponent(profile.userName)
    //         );
    //     history.push({
    //         pathname: path,
    //         search: '?' + queryParams
    //     });

    // }
    
    let seeAll = null;
    if (title === 'Photos' || title === 'My Photos') {
        selfView ?  //this won't work because the user will still able to go to photos/:profileId by directUrl, it will be better to check ownership on the page itself
        seeAll = <Link style={{cursor: 'pointer', float: 'right'}} to={"/Photos/" + profile.profile_id}>See All</Link>
        :
        seeAll = <Link style={{cursor: 'pointer', float: 'right'}} to={"/Photos/" + profile.profile_id}>See All</Link>
    }
    else if (title === 'My Pets') {
        seeAll = <Link style={{cursor: 'pointer', float: 'right'}} to={"/Pets/" + profile.profile_id}>See All</Link>
    }
    else {
        seeAll = <Link style={{cursor: 'pointer', float: 'right'}} to={"/Pets/" + profile.profile_id}>See All</Link>
    }

    return (
        <>
        {/* for debugging  <button onClick={()=>{setPostModalDisplay(true)}}></button> */}
        <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={selectedPost}/>
        <div className={styles.ImageContainer} >
            {/* {typeof previews[0] !== 'undefined' && <img src={previews[0].link}/>} */}
            <h2>{title}</h2>
            {imageStack}
            {seeAll}
        </div>
        </>
    );
}

export default ImageContainer;