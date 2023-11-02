import './product-card.styles.scss';
import Button from '../button/button.component';

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    console.log("🚀 ~ file: product-card.component.jsx:6 ~ ProductCard ~ name:", name);
    return (
    <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Button buttonType='inverted'>Add to card</Button>
    </div>
    )
}

export default ProductCard;