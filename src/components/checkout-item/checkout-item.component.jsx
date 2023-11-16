import './checkout-item.styles.scss'
import { useContext, useState, useEffect } from "react";
import { CartContext } from '../../contexts/cart.context';
const CheckoutItem = ({checkoutItem}) => {
    const {addItemToCart, clearItemFromCart, removeItemToCart} = useContext(CartContext);
    const {name, imageUrl, price, quantity} = checkoutItem;
    const decreasingQuantity = () => removeItemToCart(checkoutItem);
    const clearItemHandler = () => clearItemFromCart(checkoutItem);
    const addProductToCart = () => addItemToCart(checkoutItem);
    

    return (
        <div className='checkout-item-container'>
            <img className='image-container' src={imageUrl} alt={`${name}`}/>
            <span className='name'>{name}</span>
            <span className='quantity'> <div className='arrow' onClick={decreasingQuantity}>&#10094;</div>
            <span className='value'>{quantity}</span> 
            <div className='arrow' onClick={addProductToCart}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;