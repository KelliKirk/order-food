import logo from '../assets/logo.jpg'
import Button from './UI/Button'
import { useCartContext } from '../store/CartContext'
import { submitOrder } from '../services/api'
import { useState } from 'react'

const Header = () => {
    const { cart, dispatch } = useCartContext()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(null)
    
    console.log("Cart items:", cart);
    const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0)
    
    const emptyCartModal = () => {
        dispatch({type: "MODAL_SET_CONTENT", payload: 
            <div className = 'cart'>
                <h2>Your cart is empty.</h2>
                <div className='modal-actions'>
                    <Button textOnly={false} onClick={() => dispatch({type: "MODAL_CLOSE"})}>Close</Button>
                </div>
            </div>
        })
        dispatch({type: "MODAL_OPEN"})
    }
    
    const handleCheckout = async () => {
        setIsSubmitting(true);
        
        try {
            // Prepare order data
            const orderData = {
                items: cart.items,
                totalAmount: cart.items.reduce((total, item) => total + item.price * item.quantity, 0),
                customer: {
                    // In a real application, you would collect this data from a form
                    name: "Customer",
                    email: "customer@example.com",
                    address: "123 Main St"
                }
            };
            
            // Submit the order
            const response = await submitOrder(orderData);
            
            // Show success message
            setOrderSuccess({
                orderId: response.orderId,
                message: response.message
            });
            
            // Clear cart
            dispatch({type: "CLEAR_CART"});
            
            // Show success modal
            orderSuccessModal(response.orderId);
            
        } catch (error) {
            // Show error modal
            orderErrorModal(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const orderSuccessModal = (orderId) => {
        dispatch({type: "MODAL_SET_CONTENT", payload:
            <div className='cart'>
                <h2>Order Successful!</h2>
                <p>Your order has been placed successfully.</p>
                <p>Order ID: {orderId}</p>
                <div className='modal-actions'>
                    <Button textOnly={false} onClick={() => dispatch({type: "MODAL_CLOSE"})}>
                        Close
                    </Button>
                </div>
            </div>
        });
        dispatch({type: "MODAL_OPEN"});
    };
    
    const orderErrorModal = (errorMessage) => {
        dispatch({type: "MODAL_SET_CONTENT", payload:
            <div className='cart'>
                <h2>Order Failed</h2>
                <p>There was an error placing your order.</p>
                <p>{errorMessage}</p>
                <div className='modal-actions'>
                    <Button textOnly={false} onClick={() => dispatch({type: "MODAL_CLOSE"})}>
                        Close
                    </Button>
                </div>
            </div>
        });
        dispatch({type: "MODAL_OPEN"});
    };
    
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
                    <Button 
                        textOnly={false} 
                        onClick={handleCheckout}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Checkout'}
                    </Button>
                </div>
            </div>
        })
        dispatch({type: "MODAL_OPEN"})
    }
    
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Food Order App Logo"/>
                <h1>React Food Order App</h1>
            </div>
            <nav>
                <Button textOnly={true} onClick={() => totalQuantity === 0 ? emptyCartModal() : fullCartModal()}>
                    Cart({totalQuantity})
                </Button>
            </nav>
        </header>
    )
}

export default Header