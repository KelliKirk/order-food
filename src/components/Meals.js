import { useState, useEffect } from "react";
import MealItem from "./MealItem";


const Meals = () => {
    const [meals, setMeals] = useState([])

    useEffect(() => {
        async function fetchMeals(){
            fetch("http://localhost:3001/meals")
            .then(response => response.json())
            .then(data => setMeals(data))
        } 
        fetchMeals()
    }, [])


    return (
        <ul id="meals">
            { 
                // list of meals
                meals.map(meal=> <MealItem key = {meal.id} meal={meal} />)
            }
        </ul>
    )
}

export default Meals