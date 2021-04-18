import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './ImageContainer.module.css';
import styled from 'styled-components';

import PostModal from '../../Modals/PostModal'

function ImageContainer(props) {
    const [postModalDisplay, setPostModalDisplay] = useState(true);
    let history = useHistory();

    function closePostModal(){
        console.log('exit button clicked')
        setPostModalDisplay(false);
    }
    function presentPostModal(postImage){
        console.log('clicked on image');
        setPostModalDisplay(true);
    }

    // const[pets, setPets] = useState([
    //     { pet_id: 1,
    //         name: 'Mimi',
    //         size_name: 'medium',
    //         age_name: 'six',
    //         profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
    //     }, 
    //     {   pet_id: 2,
    //         name: 'Max',
    //         size_name: 'small',
    //         age_name: 'two',
    //         profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
    //     },
    //     {   pet_id: 3,
    //         name: 'Juju',
    //         size_name: 'larg',
    //         age_name: 'ten',
    //         profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
    //     }
    // ]);
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
                    let position = '';
                    let top = '';
                    let right = '';
                    if (index > 0) {
                        position = 'absolute';
                        top = '0';
                        right = '0';
                    }
                    const Img = styled.img `
                        height: 162px;
                        width: 162px;
                        top: ${top};
                        right: ${right};
                        position: ${position};
                        margin-right: ${(val-index-1) * marginToRight  + 'px'};
                        border-radius: 15px;
                        z-index: 0;
                        box-shadow: var(--elevation-${index < 6 ? 6-index : 1});
                        object-fit: cover;
                        `;
                    return (
                        // <a href={props.image[index].profile_pic} key={props.image[index].pet_id} > //Removed to test post modal functionality
                            <Img 
                                key={props.image[index].pet_id}
                                src={props.image[index].profile_pic} 
                                alt="No Image Found"
                                // onClick={presentPostModal(props.image[index].profile_pic)}
                                className={styles.ImageStack_pic}
                            />
                        // </a>
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
        <PostModal display={postModalDisplay} onClose={closePostModal}/>
        <div className={styles.ImageContainer} >
            <h2>{props.title}</h2>
            {imageStack}
            {seeAll}
        </div>
        </>
    );
}

export default ImageContainer;