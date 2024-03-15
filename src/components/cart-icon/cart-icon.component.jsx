import { useContext } from 'react';
// import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg' ;
import { CartContext } from '../../contexts/cart.context';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen, selectCartItems, selectCartCount } from '../../store/cart/cart.selector';
// import './cart-icon.styles.scss';
import { ShoppingIcon, CartIconContainer, ItemCount,  } from './cart-icon.styles';

const CartIcon = () => {
    const dispatch = useDispatch();
    // const {isCartOpen, setIsCartOpen, cartItems, cartCount} = useContext(CartContext);
    // const {cartItems, cartCount} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const number = cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.quantity,0);
    
    const toggleIsCarOpen = () => dispatch(setIsCartOpen(!isCartOpen));//setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCarOpen}>
            <ShoppingIcon/>
            <ItemCount className='item-count' >{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;