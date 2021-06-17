//the goal is to manage the current context to data and provide that context to all components thar want
//access to it.
import React, {useReducer} from "react";
import CartContext from "./cart-context";

  //ACCIONES ⚠️ ⚠️ ⚠️
  const ACTIONS = {
    ADD_ITEM: 'add-item',
    REMOVE_ITEM: 'remove',
    UPDATE_ITEM: 'update'
  }

 //CENTRAL de acciones de mi reducer state ⚠️ ⚠️ ⚠️
 const cartItemsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const updatedItems = state.items.concat(action.payLoad.item);
      const updatedTotalAmount = state.totalAmount + action.payLoad.item.price * action.payLoad.item.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };

    case ACTIONS.REMOVE_ITEM:
      return 
    case ACTIONS.UPDATE_ITEM:
      return 
    default:
      return { //estado default
        items: [],
        totalAmount: 0,
      }; 
  }
}
const CartProvider = props => {

  //FUNCIONES que tendran acceso los componentes que sean wrap por el provider ⚠️ ⚠️ ⚠️
  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: ACTIONS.ADD_ITEM, payLoad:{item:item}})
    // console.log(item,'🍔');
  }
  const removeItemFromCartHandler = (id ) => {
    dispatchCartAction({type: ACTIONS.REMOVE_ITEM, payLoad:{id:id}})
  }

  // REDUCER declaro el hook ⚠️ ⚠️ ⚠️
  const [cartState, dispatchCartAction] = useReducer(cartItemsReducer, { 
    items: [], 
    totalAmount: 0,
  }); 
  //PROVIDER esto es lo que todos los otros componentes que estan wrap por el provider tienen ACCESO 🔥 🔥 🔥 🔥
  const cartContext = {
    items: cartState.items, //utilizo la data del reducer
    totalAmount: cartState.totalAmount,  //utilizo la data del reducer
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }
  //JSX code ⚠️ ⚠️ ⚠️
  return(
    //esto nos permite to wrap cualquier componente que deberia tener acceso a este contexto 
    //con el cartProvider component
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  ); 
}
export default CartProvider; 