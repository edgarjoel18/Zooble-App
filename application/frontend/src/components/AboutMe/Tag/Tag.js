import React from 'react';

import styles from './Tag.module.css';

function Tag(props) {

    let textStyle = styles.Text;
    let tagStyle = styles.Tag
    if (props.id === props.selected) {
        textStyle = [styles.Text, styles.ActiveText].join(' ');
        tagStyle = [styles.Tag, styles.ActiveTag].join(' ');
    }

    let tagText = props.section;
    if (tagText === 'About') {
        if (props.accountType === 'pet owner' || props.accountType === 'pet')
            tagText = props.section + ' Me';
        else 
        tagText = props.section + ' Us';
    }

    return (
        <div className={tagStyle}  onClick={() => props.clicked(props.id)}>
            <p className={textStyle} >
                {tagText}
            </p>
        </div>
    );
}

export default Tag;