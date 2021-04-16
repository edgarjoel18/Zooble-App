import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './ImageContainer.module.css';
import styled from 'styled-components';

function ImageContainer(props) {
    const[pets, setPets] = useState([
        { pet_id: 1,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        }, 
        {   pet_id: 2,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        },
        {   pet_id: 3,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        }
    ]);

    //display number of pictures
    function displayImageStack(val) {
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
                        margin-right: ${(val-index-1) * 60  + 'px'};
                        border-radius: 15px;
                        z-index: 0;
                        `;
                    return (
                        <a href={pets[index].profile_pic} key={pets[index].pet_id} >
                            <Img 
                                src={pets[index].profile_pic} 
                                alt="No Image Found" 
                            />
                        </a>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={styles.ImageContainer} >
            <h1>{props.title}</h1>
                {/* <a href={pets[0].profile_pic} >
                    <img className={styles.TopImage} src={pets[0].profile_pic} alt="No Image Found" />
                </a>
                <a href={pets[1].profile_pic} >
                    <img className={styles.MiddleImage} src={pets[1].profile_pic} alt="No Image Found" />
                </a>
                <a href={pets[2].profile_pic} >
                    <img className={styles.BottomImage} src={pets[2].profile_pic} alt="No Image Found" />
                </a> */}
            {displayImageStack(3)}
            <p><Link>See All</Link></p>
        </div>
    );
}

export default ImageContainer;