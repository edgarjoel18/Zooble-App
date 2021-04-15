import React from 'react';

import styles from './Tag.module.css';

function Tag(props) {

    let textStyle = styles.Text;
    let tagStyle = styles.Tag
    if (props.id === props.selected) {
        textStyle = [styles.Text, styles.ActiveText].join(' ');
        tagStyle = [styles.Tag, styles.ActiveTag].join(' ');
    }

    return (
        <div className={tagStyle}  onClick={() => props.clicked(props.id)}>
            <p className={textStyle} >
                {props.section}
            </p>
        </div>
    )
}

export default Tag;