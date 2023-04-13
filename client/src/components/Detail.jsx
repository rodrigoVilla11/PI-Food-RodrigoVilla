import { getRecipes, getRecipesById } from "../actions";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom";

const Detail = () =>{
  const dispatch = useDispatch()
  const recipe = useSelector((state) => state.recipe)
  const {id} = useParams()

  useEffect(()=>{
    dispatch(getRecipesById(id))
  }, [dispatch])

    return(
        <div>
          <Link to='/home'><button>Volver al HOME</button></Link>
        <h2>Recipe: {recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />
        <h5>Summary: {recipe.summary}</h5>
        <h5>Health Score: {recipe.healthScore}</h5>
        <h5>Instructions: {recipe.instructions}</h5>
        <h5>In whichs diets the recipe can be? {recipe.diets}</h5>
        </div>

    )
    }
    export default Detail;