import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

/* 
product 
{
    id,
    name,
    price,
    imageUrl
}

cart Item
{
    id,
    name,
    imageUrl,
    quantity
}

*/

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


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity,0);
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}