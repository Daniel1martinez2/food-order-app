import React, {useContext,useEffect, useState} from 'react';
import classes from './HeaderCartButton.module.css'; 
import CartIcon from '../Cart/CartIcon';

import CartContext from '../../store/cart-context'; //✅ ✅ ✅ 👈

const HeaderCartButton = props => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false); 
  //usar context aqui significa que cada que cambie la data del context, este componente se reevaluara
  const cartCtx = useContext(CartContext); 
  const {items} = cartCtx; 
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted? classes.bump : ''}`

  useEffect(()=>{
    if(cartCtx.items.length ===0) return; 
    setBtnIsHighlighted(true); 
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false); 
    }, 300);
    //toda funcion que to retorne dentro de useEffect -> se tomara como la cleaning function
    // cada que este effect reruns, se limpia el timer
    //🔥 si añadimos muchos items de manera rapida
    //necesitamos limpiar el viejo timer con cada item añadido, y setear un nuevo timer
    return () => {
      clearTimeout(timer); 
    }
  },[items]); 

  return(
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span >
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderCartButton; 