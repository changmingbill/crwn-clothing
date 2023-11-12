import { useContext } from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg' ;
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartItems, cartCount} = useContext(CartContext);
    const number = cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.quantity,0);
    console.log("🚀 ~ file: cart-icon.component.jsx:9 ~ CartIcon ~ number:", number);
    
    const toggleIsCarOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleIsCarOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count' >{cartCount}</span>
        </div>
    )
}

export default CartIcon;