import { useContext, useState } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

import classes from './styles.module.css';
import { Fragment } from 'react';

const Cart = ({ onClose }) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = !!cartCtx.items.length;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem({ id });
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async userData => {
        setIsSubmitting(true);

        await fetch('https://food-app-59048-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItem: cartCtx.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart()
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {
                (cartCtx.items || []).map(item => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        amount={item.amount}
                        price={item.price}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        onAdd={cartItemAddHandler.bind(null, item)}
                    />
                ))
            }
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onClose={onClose} />}
            {!isCheckout && modalActions}
        </Fragment>
    )

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = <p>Succesfully sent the order!</p>

    return (
        <Modal onClose={onClose} >
          {!isSubmitting && !didSubmit && cartModalContent}
          {isSubmitting && isSubmittingModalContent}
          {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;