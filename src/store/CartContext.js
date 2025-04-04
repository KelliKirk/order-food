import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

const initialState = {
    items: []
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            console.log("Adding item:", action.payload);
            
            // Find if the item already exists in the cart
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            
            if (existingItemIndex !== -1) {
                // Item exists, create a new array with updated quantity
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1
                };
                
                console.log("Updated items:", updatedItems);
                return { ...state, items: updatedItems };
            } else {
                // Item doesn't exist, add it with quantity 1
                const newItem = { ...action.payload, quantity: 1 };
                console.log("New item:", newItem);
                return { ...state, items: [...state.items, newItem] };
            }
            
        default:
            console.log("Invalid action type for Cart");
            return state;
    }
};

export const CartContextProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState);
    
    return (
        <CartContext.Provider value={{cart, dispatch}}>
            {children}
        </CartContext.Provider>
    );
};