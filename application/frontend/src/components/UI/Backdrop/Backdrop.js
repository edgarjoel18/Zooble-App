import React from 'react';

import styles from './Backdrop.module.css';

function Backdrop(props) {
    console.log('[Backdrop] is open ? ' + props.show )
    return props.show ? <div className={styles.Backdrop} onClick={props.clicked}></div> : null
};

export default Backdrop;