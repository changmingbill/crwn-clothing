import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
const Checkout = () => {
    // const {cartItems, cartTotal} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    // const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <span className="header-block">Product</span>
                <span className="header-block">Description</span>
                <span className="header-block">Quantity</span>
                <span className="header-block">Price</span>
                <span className="header-block">Remove</span>
            </div>
           { cartItems.map((checkoutItem) => (<CheckoutItem key={checkoutItem.id} checkoutItem={checkoutItem}/>))}
            <span className='total'>Total: ${cartTotal}</span>
        </div>
    )
}

export default Checkout;