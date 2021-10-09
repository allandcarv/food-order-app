import Input from '../../../UI/Input';

import classes from './styles.module.css';

const MealItemForm = () => {
    return (
        <form className={classes.form}>
            <Input 
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
        </form>
    )
}

export default MealItemForm;