import classes from './styles.module.css';

import mealsImg from '../../../assets/meals.jpeg';

const Header = () => {
    return (
        <>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <button>Cart</button>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="A table full of delicious food" />
            </div>
        </>
    )
}

export default Header;