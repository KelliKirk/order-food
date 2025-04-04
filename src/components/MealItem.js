const MealItem = (props) => {
    return (
        <li className = "meal-item">
            <article>
                <img src={require(`../assets/${props.meal.image}`)} alt={props.meal.name}/>
                <div>
                    <h3>{props.meal.name}</h3>
                    <p className="meal-item-price">{
                        new Intl.NumberFormat("et-ET", { style: "currency", currency: "EUR" }).format(props.meal.price,
                        )
                          }</p>
                    <p className="meal-item-description">{props.meal.description} </p>
                </div>
                <p className="meal-item-actions">
                    <button >Add to Cart</button>
                </p>
            </article>
        </li>
        
    )
}

export default MealItem