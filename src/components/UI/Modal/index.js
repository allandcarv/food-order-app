import { createPortal } from 'react-dom';

import classes from './styles.module.css';

const Backdrop = props => {
    return (
        <div className={classes.backdrop}></div>
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

const Modal = ({ children }) => {
    return (
        <>
            {createPortal(<Backdrop />, portalElement)}
            {createPortal(<ModalOverlay>{ children }</ModalOverlay>, portalElement)}
        </>
    );
}

export default Modal;