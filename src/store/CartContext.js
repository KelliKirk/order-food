import { createContext, useContext, useReducer } from "react";

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

const initialState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            console.log("item added", action.payload)
            // Create a new state object instead of modifying the existing one
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        default:
            console.log("default")
            return state  // Always return the state, even if unchanged
    }
}

export const CartContextProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState)
    
    return (
        <CartContext.Provider value={{cart, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}