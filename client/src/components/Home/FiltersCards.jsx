import { filterRecipesByDiets,filterRecipesByCreator } from "../../redux/actions";
import {useDispatch} from 'react-redux'
import styles from './Home.module.css'

const FiltersCards = ({setCurrentPage}) =>{
  const dispatch = useDispatch()

function handleFilterByDiets(e){
  dispatch(filterRecipesByDiets(e.target.value))
  setCurrentPage(1)
}
function handleFilterByCreator(e){
  dispatch(filterRecipesByCreator(e.target.value))
  setCurrentPage(1)
}
    return(
        <div className={styles.filterCards}>
          <div className={styles.selectsDiv}>
          <span> Filter by diets: </span>
          <select onChange={e => handleFilterByDiets(e)} className={styles.selects}>
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
          </select></div>
          <div className={styles.selectsDiv}>
          <span> Recipes: </span>
          <select onChange={e =>handleFilterByCreator(e)} className={styles.selects}>
            <option value="All">All</option>
            <option value="dbRecipes">Created By Me</option>
            <option value="apiRecipes">Created By Others</option>
          </select></div>
        </div>
    )
    }
    export default FiltersCards;