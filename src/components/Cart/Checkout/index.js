
import classes from './styles.module.css';

const Checkout = ({ onClose }) => {
    const confirmHandler = (event) => {
        event.preventDefault();
    }
    
    return (
        <form onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" />
            </div>
            <div className={classes.control}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" />
            </div>
            <div className={classes.control}>
                <label htmlFor="street">Postal Code</label>
                <input type="text" id="street" />
            </div>
            <div className={classes.control}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" />
            </div>
            <button type="button" onClick={onClose}>Cancel</button>
            <button>Confirm</button>
        </form>
    )
}

export default Checkout;