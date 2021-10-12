import { useRef, useState } from 'react';

import Input from '../../../UI/Input';

import classes from './styles.module.css';

const MealItemForm = ({ onAddToCart }) => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = +amountInputRef.current.value.trim() ?? 0;

        if (enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }

        onAddToCart(enteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: `amount_${Math.random().toString().slice(-5)}`,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <small>Please enter a number between 1-5</small>}
        </form>
    )
}

export default MealItemForm;