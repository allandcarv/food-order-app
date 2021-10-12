import { useReducer } from 'react';

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CART_ITEM': {
            const updatedItems = [ ...state.items, action.item ];
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
            return ({
                items: [...updatedItems],
                totalAmount: updatedTotalAmount
            });
        }
        default: {
            return state;
        }
    } 
}

const CartProvider = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = ( item ) => {
        dispatchCartAction({ type: 'ADD_CART_ITEM', payload: item })
    }

    const removeItemFromCartHandler = ( id ) => {}
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext} >{ children }</CartContext.Provider>
    );
}


export default CartProvider