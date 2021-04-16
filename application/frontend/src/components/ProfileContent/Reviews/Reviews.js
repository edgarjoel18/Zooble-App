import React from 'react';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import styles from './Reviews.module.css';
import styled from 'styled-components';

const reviews = [
    {
       user_id: 1,
       review: "I saw this on TV and wanted to give it a try. one of my hobbies is web-browsing. and when i'm browsing the web this works great.",
       rating: 3 
    },
    {
        user_id: 2,
        review: 'It\'s a good place',
        rating: 4 
    },
    {
        user_id: 3,
        review: 'My neighbor Georgie has one of these. She works as a busboy and she says it looks brown.',
        rating: 5
    },
    // {
    //     user_id: 4,
    //     review: 'I saw one of these in Canada and I bought one. My ant loves to play with it.',
    //     rating: 4.5 
    // }
]

function Reviews() {

    // function displayReviewStack(val) {
    //     let reviewStack = [];
    //     for (let i = 0; i < val; i++) {
    //         reviewStack.push(i);
    //     }

    //     return (
    //         <div className={styles.ReviewStack} >
    //             {reviewStack.map((_, index) => {
    //                 let position = '';
    //                 let top = '';
    //                 let left = '';
    //                 if (index > 0) {
    //                     position = 'absolute';
    //                     top = '0';
    //                     left = '0';
    //                 }
    //                 const StyledDiv = styled.div `
    //                     height: 162px;
    //                     width: 162px;
    //                     top: ${top};
    //                     left: ${left};
    //                     position: ${position};
    //                     margin-left: ${(val-index-1) * 100  + 'px'};
    //                     border-radius: 10px;
    //                     z-index: ${-index};
    //                     `;
    //                 return (
    //                     // <a href={pets[index].profile_pic} key={pets[index].pet_id} >
    //                     //     <Img 
    //                     //         src={pets[index].profile_pic} 
    //                     //         alt="No Image Found" 
    //                     //     />
    //                     // </a>
    //                     <StyledDiv>
    //                         <Box 
    //                             key={reviews[index].user_id}
    //                             className={styles.Reviews} 
    //                             component="fieldset" mb={3} 
    //                             borderColor="transparent"
    //                             style={{zIndex: `${-index}`}}
    //                             >
    //                             <textarea
    //                                 rows='4'
    //                                 cols='8'
    //                                 readOnly
    //                                 value={reviews[index].review} 
    //                                 style={{zIndex: `${-index}`}}
    //                             />
    //                             <Rating name="read-only" value={reviews[index].rating} readOnly style={{float: 'right', zIndex: `${-index}`}} />
    //                         </Box>
    //                     </StyledDiv>
    //                 );
    //             })}
    //         </div>
    //     );
    // }

    return (  
        <div className={styles.Container} >      
            {
                reviews.map(ele => (
                    <Box 
                        key={ele.user_id}
                        className={styles.Reviews} 
                        component="fieldset" mb={3} 
                        borderColor="transparent"
                    >
                        <textarea
                            rows='4'
                            cols='8'
                            readOnly
                            value={ele.review} 
                        />
                        <Rating name="read-only" value={ele.rating} readOnly style={{float: 'right', paddingLeft: '15px'}} />
                    </Box>
            ))}
        </div>   
    );
}

export default Reviews;