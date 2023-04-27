import {useState, useEffect } from "react";
import { filterRecipesByDiets,filterRecipesByCreator } from "../../redux/actions";
import {useDispatch, useSelector} from 'react-redux'
import {getDiets} from '../../redux/actions'
import styles from './Home.module.css'

const FiltersCards = ({setCurrentPage, cleanFilters}) =>{
  const dispatch = useDispatch()
  const diets = useSelector((state) => state.diets)

  const [inputDiets, setInputDiets] = useState({
    diets: []
  })

function handleFilterByDiets(e){
  dispatch(filterRecipesByDiets(e.target.options[e.target.selectedIndex].value))
  setCurrentPage(1)
}
function handleFilterByCreator(e){
  dispatch(filterRecipesByCreator(e.target.options[e.target.selectedIndex].value))
  setCurrentPage(1)
}
const handleDiets = e => {
  if(!inputDiets.diets.includes(e.target.value)){
   setInputDiets({
     ...inputDiets,
     diets: [...inputDiets.diets, e.target.value]
   })}else{
    alert('You already filter by this recipe')
   }
 }
 const handleCleanDiets = e => {
  e.preventDefault()
  setInputDiets({
    ...inputDiets,
    diets: []
  })
}

useEffect(() =>{
  dispatch(getDiets())
}, [dispatch])
    return(
        <div className={styles.filterCards}>
          <div className={styles.selectsDiv}>
          <span> Filter by diets: </span>
          <select onChange={e => {handleFilterByDiets(e); handleDiets(e)}} className={styles.selects}>
            {diets.map((diet) =>(
                <option value={diet.name} >{diet.name}</option>
              ))}
          </select></div>
          <div > 
            <ul className={styles.listDiets}><li>{inputDiets.diets.map(elem => elem + ",")}</li></ul></div>
          <div className={styles.selectsDiv}>
          <span> Recipes: </span>
          <select onChange={e =>handleFilterByCreator(e)} className={styles.selects}>
            <option value="All">All</option>
            <option value="dbRecipes">Created By Me</option>
            <option value="apiRecipes">Created By Others</option>
          </select></div>
          <button className={styles.buttonClean} onClick={e=>{cleanFilters(e); handleCleanDiets(e)}}>Clean Filters</button>
        </div>
    )
    }
    export default (FiltersCards);