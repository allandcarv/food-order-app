import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

import classes from './styles.module.css';

const MealItem = ({ id, description, name, price }) => {
    const cartCtx = useContext(CartContext);

    const parsedPrice = `$${price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id,
            name,
            amount,
            price
        });
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{ name }</h3>
                <div className={classes.description}>{ description }</div>
                <div className={classes.price}>{ parsedPrice }</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
}

export default MealItem