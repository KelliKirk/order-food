const Button = ({textOnly, onClick, children}) => {
    return ( 
        <button onClick ={onClick} className={textOnly ? "text-button" : "button"} >
            {children}
        </button>
        
    )
}

export default Button