import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {useNavigate} from 'react-router-dom';
// import './cart-dropdown.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
    const dispatch = useDispatch();
    // const {cartItems, setIsCartOpen} = useContext(CartContext);
    // const {cartItems} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        dispatch(setIsCartOpen(false));
        // setIsCartOpen(false);
        navigate("/checkout");
    }
    return (
        <CartDropdownContainer>
            <CartItems>
            {
                cartItems.length ? (cartItems.map((cartItem) => 
                <CartItem key={cartItem.id} cartItem={cartItem}/>
            )) : <EmptyMessage>Your Cart Is Empty</EmptyMessage>
            }
               
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO To CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;