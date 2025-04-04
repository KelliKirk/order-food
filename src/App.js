import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext"
// useReducer on CartContext komponendis juba olemas



const App = () => {
 return (
    <CartContextProvider>
     <h1>Food Order App</h1>
    <Header />
    <Meals />
    </CartContextProvider>
    
  );
}

export default App;
