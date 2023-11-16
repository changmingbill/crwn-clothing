import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    total: 0
});


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



export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity,0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setCartTotal(newTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart = (checkoutItem) => {
        setCartItems(decreaseQuantity(cartItems, checkoutItem));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}