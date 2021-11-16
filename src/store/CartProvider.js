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
        case 'REMOVE_CART_ITEM': {
            const indexOfItem = state.items.findIndex(item => item.id === action.payload.id );

            if (indexOfItem > -1) { 
                const totalAmount = state.totalAmount - state.items[indexOfItem].price;

                const finalItems = state.items.reduce((final, current, index) => {
                    if (index !== indexOfItem) {
                        return [ ...final, { ...current } ];
                    }

                    const newAmount = current.amount - 1;

                    if (newAmount) {
                        return [ ...final, { ...current, amount: newAmount } ];
                    } else {
                        return [ ...final ];
                    }
                }, []);

                return ({ 
                    items: [ ...finalItems ],
                    totalAmount,
                })

            } else {
                return ({ ...state })
            }
        }
        case 'CLEAR': {
            return defaultCartState;
        }
        default: {
            return state;
        }
    } 
}

const CartProvider = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = ( item ) => {
        dispatchCartAction({ type: 'ADD_CART_ITEM', payload: item });
    }

    const removeItemFromCartHandler = ( id ) => {
        dispatchCartAction({ type: 'REMOVE_CART_ITEM', payload: id });
    }

    const clearCartHandler = () => dispatchCartAction({ type: 'CLEAR' });

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={cartContext} >{ children }</CartContext.Provider>
    );
}


export default CartProvider