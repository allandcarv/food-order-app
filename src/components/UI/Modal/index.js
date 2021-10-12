import { createPortal } from 'react-dom';

import classes from './styles.module.css';

const Backdrop = ({ onClose }) => {
    return (
        <div className={classes.backdrop} onClick={ onClose } ></div>
    )
};

const ModalOverlay = ({ children }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{ children }</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays');

const Modal = ({ onClose, children }) => {
    return (
        <>
            {createPortal(<Backdrop onClose={ onClose } />, portalElement)}
            {createPortal(<ModalOverlay>{ children }</ModalOverlay>, portalElement)}
        </>
    );
}

export default Modal;