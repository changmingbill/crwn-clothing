import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {useNavigate} from 'react-router-dom';
// import './cart-dropdown.styles.scss';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
    const {cartItems, setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        setIsCartOpen(false);
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