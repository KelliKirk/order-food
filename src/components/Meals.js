import { useState, useEffect } from 'react'
import { fetchMeals } from '../services/api'
import { useCartContext } from '../store/CartContext'
import Button from './UI/Button'

const Meals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { dispatch } = useCartContext()

    useEffect(() => {
        async function loadMeals() {
            try {
                setIsLoading(true)
                const mealsData = await fetchMeals()
                setMeals(mealsData)
                setError(null)
            } catch (error) {
                setError('Failed to fetch meals. Please try again later.')
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        loadMeals()
    }, [])

    function handleAddToCart(meal) {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: meal.id,
                name: meal.name,
                price: parseFloat(meal.price),
                description: meal.description,
                image: meal.image
            }
        })
    }

    if (isLoading) {
        return <p className="center">Loading meals...</p>
    }

    if (error) {
        return <p className="error">{error}</p>
    }

    return (
        <section id="meals">
            {meals.map(meal => (
                <article className="meal-item" key={meal.id}>
                    <img src={`/images/${meal.image.split('/').pop()}`}  alt={meal.name} />
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">
                        {new Intl.NumberFormat('et-ET', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(meal.price)}
                    </p>
                    <p className="meal-item-description">{meal.description}</p>
                    <Button textOnly={false} onClick={() => handleAddToCart(meal)}>
                        Add to Cart
                    </Button>
                </article>
            ))}
        </section>
    )
}

export default Meals