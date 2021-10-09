import CartIcon from '../../Cart/CartIcon';

import classes from './styles.module.css';

const HeaderCartButton = () => {
    return (
        <button className={classes.button}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                3
            </span>
        </button>
    )
}

export default HeaderCartButton;