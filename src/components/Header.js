import logo from '../assets/logo.jpg'
import Button from './UI/Button'
import { useCartContext } from '../store/CartContext' 

const Header = () => {
    const { cart, dispatch } = useCartContext() 
    console.log("Cart items:", cart);
    const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0)

    const emptyCartModal = () => {
        dispatch({type: MODAL_SET_CONTENT, payload: 
            <div className = 'cart'>
                <h2>Your cart is empty.</h2>
                <div className='modal-actions'>
                    <Button textOnly={false} onClick={() => dispatch({type: "MODAL_CLOSE"} )}>close</Button>
                </div>
            </div>
        })

        dispatch({type: "MODAL_OPEN"})
    } 

    const fullCartModal = () => {
        dispatch({type: "MODAL_SET_CONTENT", payload:
            <div className='cart'>
                <h2>Your cart</h2>
                <ul>
                    {cart.items.map(item => (
                        <li key={item.id} className='cart-item'>
                            <p>{item.name} - {item.quantity}</p>
                        </li>
                    ))}
                </ul>
                <div className='cart-total'>
                    {
                        new Intl.NumberFormat("et-ET", { style: "currency", currency: "EUR" }).format(
                            cart.items.reduce((total, item) => total + item.price * item.quantity, 0),
                        )
                    }
                </div>
                <div className='modal-actions'>
                    <Button textOnly={true} onClick={() => dispatch({type: "MODAL_CLOSE"})}>
                        Close
                    </Button>
                    <Button textOnly={false} onClick={() => {
                            dispatch({type: "MODAL_CLOSE"})
                            dispatch({type: "CLEAR_CART"})
                        }}>
                        Checkout
                    </Button>
                </div>
            </div>
        })
        dispatch({type: "MODAL_OPEN"})
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo}/>
                <h1>React Food Order App</h1>
            </div>
            <nav>
            <Button textOnly={true}>Cart({totalQuantity}) </Button> 
            </nav>
        </header>
    )
}

export default Header