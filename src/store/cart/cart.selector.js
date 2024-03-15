import { createSelector } from "reselect";

const selectCartReducer = (state) => {//root state
    // console.log('selecter 1 fired');
    return state.cart;
};

export const selectCartItems = createSelector(
    [selectCartReducer],//input
    (cartSlice) => {//cartSlice equal to selectCartReducer
        // console.log('selecter 2 fired');
        return cartSlice.cartItems //output
    }
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.isCartOpen
);
// (state) => state.cart.isCartOpen;


export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => {
        // console.log('selectCartCount 3 fired');
        return cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity,0);
    }
);
//(state) => state.cart.cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity,0);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => {
        // console.log('selectCartTotal 3 fired');
        return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }
);
//(state) => state.cart.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
