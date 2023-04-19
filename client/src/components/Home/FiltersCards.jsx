import { filterRecipesByDiets,filterRecipesByCreator } from "../../actions";
import {useDispatch} from 'react-redux'

const FiltersCards = () =>{
  const dispatch = useDispatch()

function handleFilterByDiets(e){
  dispatch(filterRecipesByDiets(e.target.value))
}
function handleFilterByCreator(e){
  dispatch(filterRecipesByCreator(e.target.value))
}
    return(
        <div>
          <span> Filter by diets: </span>
          <select onChange={e => handleFilterByDiets(e)}>
            <option value="All">All</option>
            <option value="gluten free">Gluten Free</option>
            <option value="dairy free">Dairy Free</option>
            <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="whole 30">Whole 30</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="fodmap friendly">Fodmap Friendly</option>
            <option value="vegetarian">Vegetarian</option>
          </select>
          <span> Recipes: </span>
          <select onChange={e =>handleFilterByCreator(e)}>
            <option value="All">All</option>
            <option value="dbRecipes">Created By Me</option>
            <option value="apiRecipes">Created By Others</option>
          </select>
        </div>
    )
    }
    export default FiltersCards;