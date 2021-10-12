import HeaderCartButton from './HeaderCartButton';

import classes from './styles.module.css';

import mealsImg from '../../../assets/meals.jpeg';

const Header = ({ onShowCart }) => {
    return (
        <>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="A table full of delicious food" />
            </div>
        </>
    )
}

export default Header;