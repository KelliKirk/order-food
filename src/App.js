import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider, useCartContext } from "./store/CartContext"; 


const App = () => {
 return (
  <>
    <CartContextProvider>
     <h1>Food Order App</h1>
    <Header />
    <Meals />
    </CartContextProvider>
    </>
    
  );
}

export default App;
