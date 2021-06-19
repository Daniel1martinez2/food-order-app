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
      const updatedTotalAmount = state.totalAmount + action.payLoad.item.price * action.payLoad.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        item=> item.id === action.payLoad.item.id
      ); 
      const existingCartItem = state.items[existingCartItemIndex]; 
      let updatedItems; 
      if(existingCartItem){
        const updatedItem = {
          ...existingCartItem, 
          amount: existingCartItem.amount + action.payLoad.item.amount
        }; 
        updatedItems = [...state.items]; 
        updatedItems[existingCartItemIndex] = updatedItem; 
      }else{
        updatedItems = state.items.concat(action.payLoad.item);   
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };

    case ACTIONS.REMOVE_ITEM:
      let copyCat =  [...state.items];
      let removedIndex = copyCat.findIndex(i => i.id === action.payLoad.id); 
      const updatedRemovedAmount = state.totalAmount - copyCat[removedIndex].price; 
      if(copyCat[removedIndex].amount - 1 > 0){
        const modified = {
          ...copyCat[removedIndex],
          amount: copyCat[removedIndex].amount - 1
        }; 
        copyCat[removedIndex] = modified; 
      }else{
        copyCat.splice(removedIndex,1); 
      }
      return {
        items:  copyCat,
        totalAmount: updatedRemovedAmount
      }
    case ACTIONS.UPDATE_ITEM:
      return 
    default:
      return { //estado default
        items: [],
        totalAmount: 0,
      }; 
  }
}
//COMPONENTE 🔥 🔥 🔥
const CartProvider = props => {

  //FUNCIONES que tendran acceso los componentes que sean wrap por el provider ⚠️ ⚠️ ⚠️
  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: ACTIONS.ADD_ITEM, payLoad:{item:item}})
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