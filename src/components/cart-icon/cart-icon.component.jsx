import { useContext } from 'react';
// import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg' ;
import { CartContext } from '../../contexts/cart.context';
// import './cart-icon.styles.scss';
import { ShoppingIcon, CartIconContainer, ItemCount,  } from './cart-icon.styles';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartItems, cartCount} = useContext(CartContext);
    const number = cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.quantity,0);
    
    const toggleIsCarOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCarOpen}>
            <ShoppingIcon/>
            <ItemCount className='item-count' >{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;