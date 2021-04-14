import React, {useState} from 'react';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import styles from './Reviews.module.css';

function Reviews() {
    const [value, setValue] = useState(2);

    return (
        <div className={styles.Reviews} >
            
                {/* <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Controlled</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Read only</Typography>
                <Rating name="read-only" value={value} readOnly />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Disabled</Typography>
                <Rating name="disabled" value={value} disabled />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Pristine</Typography>
                <Rating name="pristine" value={null} />
            </Box> */}
        </div>

    );
}

export default Reviews;