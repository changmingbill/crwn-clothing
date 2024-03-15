import { createContext, useReducer} from "react";
import { createAction } from "../utils/reducer/reducer.utils";
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0
});

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
};

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                // cartItems: payload
                ...payload
            }
        default:
            throw new Error(`Unhandle type ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}


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
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const setIsCartOpen = (isCartOpen) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));
    };

    // const setCartItems = (cartItems) => {
    //     const payload = updateCartItemsReducer(cartItems);
    //     dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: payload})
    // };

    const updateCartItemsReducer = (newCartItems) => {
        
        const newCartCount = newCartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity,0);
        const newTotal = newCartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        const payload = {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotal: newTotal
        };
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,payload));
    };


    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity,0);
    //     setCartCount(newCartCount);
    // }, [cartItems]);

    // useEffect(() => {
    //     const newTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    //     setCartTotal(newTotal);
    // }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        
        // setCartItems(addCartItem(cartItems, productToAdd));
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemToCart = (checkoutItem) => {
        // setCartItems(decreaseQuantity(cartItems, checkoutItem));
        const newCartItems = decreaseQuantity(cartItems, checkoutItem);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        // setCartItems(clearCartItem(cartItems, cartItemToClear));
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}