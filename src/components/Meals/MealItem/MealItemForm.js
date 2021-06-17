import React, {useRef, useState} from "react";
import classes from './MealItemForm.module.css'; 
import Input from "../../UI/Input";
const MealItemForm = props => {
  
  const [amountIsValid, setAmountIsValid] = useState(true);
  //adding something
  const handleAddItem = (event) => {
    event.preventDefault(); 
    const enteredAmount = amountInputRef.current.value; 
    const enteredAmountNumber = parseInt(enteredAmount); 
    if(enteredAmount.trim().length ===0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
      setAmountIsValid(false); 
      return;  
    }
    props.onAddToCart(enteredAmountNumber); 
    
    
  }
  const amountInputRef = useRef(); 
  return(
    <form className={classes.form} onSubmit={handleAddItem} >
      <Input 
        ref={amountInputRef}
        label='Amount' 
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }} 
      />
      <button >+ Add</button>
      {!amountIsValid && <p>Plsssssss</p>}
    </form>
  ); 
}
export default MealItemForm;  