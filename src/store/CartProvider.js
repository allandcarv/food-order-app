import { useReducer } from 'react';

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CART_ITEM': {
            let parsedItems;

            const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
            
            const indexOfItem = state.items.findIndex(item => item.id === action.payload.id);

            if (indexOfItem > -1) {
                parsedItems = [ ...state.items ];
                const parsedItem = { ...state.items[indexOfItem] };
                parsedItem.amount += action.payload.amount;
                parsedItems[indexOfItem] = parsedItem;
            } else {
                parsedItems = [ ...state.items, { ...action.payload } ];
            }

            return ({
                items: [ ...parsedItems ],
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