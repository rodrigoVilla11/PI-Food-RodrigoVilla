import SearchBar from './SearchBar'
import FiltersCards from './FiltersCards'
import { orderByName,orderByHealtScore, getRecipes } from "../../actions";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Paginated from './Paginado'
import styles from './Home.module.css'

const Home = () => {
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.filteredRecipes)
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
  // eslint-disable-next-line
  const [orderByNameValue, setOrderByNameValue] = useState('')
  // eslint-disable-next-line
  const [orderByHSValue, setOrderByHSValue] = useState('')

  const paginated = (pageNumber) => {
    if (pageNumber !== currentPage) setCurrentPage(pageNumber)
  }

  const handleOrderByName = (e) => {
    e.preventDefault()
    const value = e.target.options[e.target.selectedIndex].value
    dispatch(orderByName(value))
    setOrderByNameValue(value)
    setOrderByHSValue('')
    setCurrentPage(1)
  }

  const handleOrderByHS = (e) => {
    e.preventDefault()
    const value = e.target.options[e.target.selectedIndex].value
    dispatch(orderByHealtScore(value))
    setOrderByHSValue(value)
    setOrderByNameValue('')
    setCurrentPage(1)
  }

  const isArrayOfObjects = (arr) => {
    return Array.isArray(arr) && arr.every((item) => typeof item === 'object' && item !== null);
  };

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])
return(
    <div className={styles.body}>
      <SearchBar/>
      <div className={styles.filterAndOrder}>
      <FiltersCards />
      <div className={styles.orderCards}>
        <div className={styles.selectsDiv}>
      <span> Order By Name: </span>
          <select onChange={e=>handleOrderByName(e)} className={styles.selects}>
          <option value="All"></option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>
          </div>
          <div className={styles.selectsDiv}>
          <span> Order By Health Score: </span>
          <select onChange={e=>handleOrderByHS(e)} className={styles.selects}>
            <option value="All"></option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select></div>
        </div>
        <div className={styles.textFilters}>Filter or Order</div>
        <div className={styles.arrowFilters}>→</div>
      </div>
        <div className={styles.createRecipe}><Link to='/form'><button className={styles.createRecipeButton}>Create New Recipe</button></Link></div>
      <Paginated recipesPerPage={recipesPerPage} recipes={recipes.length} paginated={paginated}/>
      <div className={styles.cards}>{currentRecipes.map(({id,title, image, diets})=> {
        return <Link key={id} to={`/detail/${id}`} style={{textDecoration: 'none', color: 'black'} }> 
        <div className={styles.card} >
        <div>
          <div className={styles.cardTitleDiv}><h2 className={styles.cardTitle}>{title}</h2></div>
          <div className={styles.cardImageDiv}> <img src={image} alt={title} className={styles.cardImage} /></div>
        <div className={styles.cardDietsDiv}><h5>Diets: {isArrayOfObjects(diets) ? diets.map(el=>el.name + ' | ' ): diets.join(' | ')}</h5></div>
        </div>
        </div></Link>} )}</div>
      <Paginated recipesPerPage={recipesPerPage} recipes={recipes.length} paginated={paginated}/>
    </div>
)
}
export default Home;