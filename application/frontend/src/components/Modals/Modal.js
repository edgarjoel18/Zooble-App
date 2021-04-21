import React from 'react'
import ReactDom from 'react-dom'
 
import styles from './Modal.module.css'

function Modal({display,children, onClose}) {
    console.log("Children: " + {children});
    if(!display) return null
    return ReactDom.createPortal(
        <>
        <div className={styles["overlay"]}/>
        <div className={styles["modal"]}>
            {children}
            <button onClick={onClose} className={styles["exit-button"]}/>
        </div>
        </>,
        document.getElementById('modal-portal')
    )
}

export default Modal
