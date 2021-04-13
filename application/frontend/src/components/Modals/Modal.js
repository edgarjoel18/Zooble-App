import React from 'react'
import ReactDom from 'react-dom' 
 
import './Modal.css'

function Modal({display,children, onClose}) {
    if(!display) return null
    return ReactDom.createPortal(
        <>
        <div className="overlay"/>
        <div className="modal">
            {children}
            <button onClick={onClose} className="exit-button"/>
        </div>
        </>,
        document.getElementById('modal-portal')
    )
}

export default Modal
