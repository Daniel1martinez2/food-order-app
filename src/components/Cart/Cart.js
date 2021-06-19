import React, {useContext} from 'react'; 
import CartItem from './CartItem'; 
import classes from './Cart.module.css'; 
import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cart-context';
const Cart = props =>  {
  const cartCtx = useContext(CartContext); 
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; 

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id); 

  }
  const cartItemAddHandler = (item ) => {
    cartCtx.addItem({...item, amount: 1})
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem 
          key={item.id} 
          name={item.name} 
          price={item.price} 
          amount={item.amount} 
          id={item.id}
          onRemove={cartItemRemoveHandler} 
          onAdd={cartItemAddHandler.bind(null, item)}   
        /> 
      ))}
    </ul>
  );  
  return(
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onToggleCart}>
          Close
        </button>
        {cartCtx.items.length>0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}
export default Cart; 