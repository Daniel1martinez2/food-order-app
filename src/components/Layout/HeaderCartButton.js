import React, {useContext} from 'react';
import classes from './HeaderCartButton.module.css'; 
import CartIcon from '../Cart/CartIcon';

import CartContext from '../../store/cart-context'; //✅ ✅ ✅ 👈

const HeaderCartButton = props => {
  //usar context aqui significa que cada que cambie la data del context, este componente se reevaluara
  const cartCtx = useContext(CartContext); 
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  console.log(cartCtx);
  return(
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span >
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderCartButton; 