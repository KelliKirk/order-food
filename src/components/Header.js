import logo from '../assets/logo.jpg'
import Button from './UI/Button'
import { useCartContext } from '../store/CartContext' 

const Header = () => {
    const { cart } = useCartContext() 
    console.log("Cart items:", cart);
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo}/>
                <h1>React Food Order App</h1>
            </div>
            <nav>
            <Button textOnly={true}>Cart({cart.items.length}) </Button> 
            </nav>
        </header>
    )
}

export default Header