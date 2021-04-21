import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './ImageContainer.module.css';
import styled from 'styled-components';

import PostModal from '../../Modals/PostModal'

function ImageContainer(props) {
    const [postModalDisplay, setPostModalDisplay] = useState(false);
    let history = useHistory();

    function closePostModal(){
        console.log('exit button clicked')
        setPostModalDisplay(false);
    }
    function presentPostModal(postImage){
        console.log('clicked on image');
        setPostModalDisplay(true);
    }
    const[imageStack, setImageStack] = useState();

    useEffect (() => {
        setImageStack(displayImageStack(props.image.length, props.accountType));
        console.log(props.profile)
    }, [])

    //display a given number of pictures
    const displayImageStack = (val, accountType) => {
        console.log('displayImageStack');
        if (props.image.length === 0)
            return (
                <Link>
                    <div className={styles.EmptyDiv} >
                    </div>
                </Link>
            );
        let marginToRight = null;
        accountType === 'shelter' ? marginToRight = 40 : marginToRight = 67.6;
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
                    const Img = styled.img `
                        height: 162px;
                        width: 162px;
                        top: ${top};
                        left: ${left};
                        position: ${position};
                        margin-left: ${(val-index-1) * marginToRight  + 'px'};
                        border-radius: 15px;
                        box-shadow: var(--elevation-1); //-${index < 6 ? 6-index : 1}
                        object-fit: cover;
                        `;
                    return (
                        // <a href={props.image[index].profile_pic} key={props.image[index].pet_id} > //Removed to test post modal functionality
                        <div onClick={() => presentPostModal(props.image[index].profile_pic)} key={props.image[index].pet_id}>
                            <Img 
                                //key={props.image[index].pet_id}
                                src={props.image[index].profile_pic} 
                                alt="No Image Found"
                                className={styles.ImageStack_pic}
                            />
                        </div>
                        //</a>
                    );
                })}
            </div>
        );
    }

    function seeAllImageHandler() {
        const queryParams = (
            encodeURIComponent('id') + '=' + encodeURIComponent(props.profile.id) + '&' 
            + encodeURIComponent('name') + '=' + encodeURIComponent(props.profile.userName)
            );
        history.push({
            pathname: '/Photo',
            search: '?' + queryParams
        });

    }
    
    let seeAll = null;
    if (props.title === 'Photos' || props.title === 'My Photos') {
        seeAll = <p style={{cursor: 'pointer'}} onClick={() => seeAllImageHandler()} >See All</p>;
    }
    else {
        seeAll = <p style={{cursor: 'pointer'}} onClick={() => alert('coming soon')} >See All</p>
    }

    return (
        <>
        {/* for debugging  <button onClick={()=>{setPostModalDisplay(true)}}></button> */}
        <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={{}}/>
        <div className={styles.ImageContainer} >
            <h2>{props.title}</h2>
            {imageStack}
            {seeAll}
        </div>
        </>
    );
}

export default ImageContainer;