import { useState, useEffect } from "react";


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

    console.log(meals)

    return (
        <ul id="meals">
            { 
                // list of meals
            }
        </ul>
    )
}

export default Meals