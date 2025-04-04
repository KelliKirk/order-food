import ReactDOM from "react-dom"
import { useRef, useEffect } from 'react'
import { useCartContext } from "../../store/CartContext" 

const Modal = () => {
    const { cart } = useCartContext()
    const modalRef = useRef (null) 

    useEffect(() => {
        if (cart.modalVisible){
            modalRef.current?.showModal()
        } else {
            modalRef.current?.close()
        } 
    }, [cart.modalVisible]) 

    return (
        <>
       {ReactDOM.createPortal(
        <dialog ref={modalRef} className="modal">
           {cart.modalContent} 
        </dialog>,
        document.getElementById("modal")
       )} 
        </>
    )
} 