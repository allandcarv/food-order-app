import MealItemForm from './MealItemForm';

import classes from './styles.module.css';

const MealItem = ({ description, name, price }) => {
    const parsedPrice = `$${price.toFixed(2)}`;
    return (
        <li className={classes.meal}>
            <div>
                <h3>{ name }</h3>
                <div className={classes.description}>{ description }</div>
                <div className={classes.price}>{ parsedPrice }</div>
            </div>
            <div>
                <MealItemForm />
            </div>
        </li>
    )
}

export default MealItem