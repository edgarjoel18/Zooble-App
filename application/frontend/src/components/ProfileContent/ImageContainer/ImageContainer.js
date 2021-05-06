import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './ImageContainer.module.css';
import styled from 'styled-components';

import PostModal from '../../Modals/PostModal'

function ImageContainer(props) {
    const [postModalDisplay, setPostModalDisplay] = useState(false);
    const [imageStack, setImageStack] = useState();
    const [text, setText] = useState('');

    const [selectedPost,setSelectedPost] = useState({});

    let history = useHistory();

    function closePostModal(){
        console.log('exit button clicked')
        setPostModalDisplay(false);
    }
    function presentPostModal(index){
        setSelectedPost(props.image[index])
        console.log('clicked on image');
        setPostModalDisplay(true);
    }

    useEffect (() => {
        setImageStack(displayImageStack(props.image.length, props.accountType));
        console.log(props.profile)
    }, [])

    //display a given number of pictures
    const displayImageStack = (val, accountType) => {
        console.log('displayImageStack');
        console.log(props.image);
        console.log(props.image[0]);
        if (val === 0)
            return (
                <Link onMouseEnter={() => setText('Photo upload coming soon')} onMouseLeave={() => setText('')}>
                    <div className={styles.EmptyDiv} >
                    </div>
                </Link>
            );
        // set limited amount of photos displayed 
        let marginToRight = null;
        if (accountType === 'shelter') {
            marginToRight = 40;
            val = Math.min(val, 3);
        }
        else {
            marginToRight = 67.6;
            val = Math.min(val, 6);
        }
        // accountType === 'shelter' ? marginToRight = 40 : marginToRight = 67.6;
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
                        <div onClick={() => presentPostModal(index)} key={props.image[index].timestamp + index}>
                            <Img 
                                className={styles.ImageStack_pic}
                            >
                                <img src={props.image[index].profile_pic} alt="No Image Found" className={styles.ImageStack_pic} />
                            </Img>
                        </div>
                    )
                    if (props.title === 'My Siblings' || props.title === 'My Pets' || props.title === 'Pets')
                        displayPostModal = (
                            <Link to={"/Profile/" + props.image[index].name} key={props.image[index].timestamp + index} >
                                <Img 
                                    className={styles.ImageStack_pic}
                                >
                                    <img src={props.image[index].profile_pic} alt="No Image Found" className={styles.ImageStack_pic} />
                                    <div className={styles.ImageStackText} >{props.image[index].name}</div>
                                </Img>
                            </Link>
                        )
                    return displayPostModal
                })}
            </div>
        );
    }

    function seeAllImageHandler(path) {
        const queryParams = (
            encodeURIComponent('id') + '=' + encodeURIComponent(props.profile.id) + '&' 
            + encodeURIComponent('name') + '=' + encodeURIComponent(props.profile.userName)
            );
        history.push({
            pathname: path,
            search: '?' + queryParams
        });

    }
    
    let seeAll = null;
    if (props.title === 'Photos' || props.title === 'My Photos') {
        props.selfView ? 
        seeAll = <p style={{cursor: 'pointer'}} onClick={() => seeAllImageHandler('/MyPhoto')} >See All</p>
        :
        seeAll = <p style={{cursor: 'pointer'}} onClick={() => seeAllImageHandler('/Photo')} >See All</p>;
    }
    else if (props.title === 'My Pets') {
        seeAll = <p style={{cursor: 'pointer'}} onClick={() => history.push("/MyPets")} >See All</p>
    }
    else {
        seeAll = <p style={{cursor: 'pointer'}} onClick={() => history.push("/Pets")} >See All</p>
    }

    return (
        <>
        {/* for debugging  <button onClick={()=>{setPostModalDisplay(true)}}></button> */}
        <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={selectedPost}/>
        <div className={styles.ImageContainer} >
            <h2>{props.title}</h2>
            {text}
            {imageStack}
            {seeAll}
        </div>
        </>
    );
}

export default ImageContainer;