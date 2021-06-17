import React, {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShow, setCartIsShow] = useState(false); 
  const handleToggleCart = () => {
    setCartIsShow(prev=>!prev); 
  }
  return (
    <CartProvider>
      {cartIsShow && <Cart onToggleCart={handleToggleCart} /> }
      <Header onToggleCart={handleToggleCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
