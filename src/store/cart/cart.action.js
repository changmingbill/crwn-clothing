import { CART_ACTION_TYPES } from "./cart.type";
import { createAction} from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    //fina if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => (cartItem.id === productToAdd.id));
    //if found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === existingCartItem.id ? 
        {...cartItem, quantity: cartItem.quantity +1} : cartItem);
    } else {
        return [...cartItems, {...productToAdd, quantity: 1}];
    }
    //return new array with modified cartItems/ new cart item
}

const decreaseQuantity = (cartItems, checkoutItem) => {
    const existingCartItem = cartItems.find((cartItem) => (cartItem.id === checkoutItem.id));
    if (checkoutItem.quantity > 1) {
         return cartItems.map((cartItem) => cartItem.id === checkoutItem.id ? 
    {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
    } else if(checkoutItem.quantity === 1) {
        return cartItems.filter((item) => item.id !== checkoutItem.id);
    }else {
        return cartItems;
    }
}

const clearCartItem = (cartItems, removeItem) => cartItems.filter((item) => item.id !== removeItem.id);

export const setIsCartOpen = (isCartOpen) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, checkoutItem) => {
    const newCartItems = decreaseQuantity(cartItems, checkoutItem);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};