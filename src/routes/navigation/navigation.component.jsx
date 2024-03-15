import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

// import './navigation.styles.scss';
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles';

const Navigation = () => {
  // const {currentUser, setCurrentUser} = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);

  // const {isCartOpen} = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);
  // const signOutHandler = async () => {
  //    await signOutUser();
  //    setCurrentUser(null);
  // }
  
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
      　</LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (<NavLink to='/auth'>
          SIGN IN
          </NavLink>)}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
