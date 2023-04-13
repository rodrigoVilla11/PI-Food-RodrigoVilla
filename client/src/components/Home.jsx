import SearchBar from './SearchBar'
import FiltersCards from './FiltersCards'
import OrderCards from './OrderCards'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRecipes } from '../actions'
import Paginado from './Paginado'

const Home = () =>{
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.filteredRecipes)
  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber);
  }

   
  useEffect(()=>{
    dispatch(getRecipes())
  },[dispatch])

  const handleClick = (e) =>{
    e.preventDefault()
    dispatch(getRecipes());
  }
return(
    <div>
      <h1>HOME</h1>
      <SearchBar/>
      <FiltersCards />
      <OrderCards />
      <Link to='/form'><button>Crear Receta</button></Link>
      <button onClick={e=>{handleClick(e)}}>Volver a cargar</button>
      <Paginado recipesPerPage={recipesPerPage} recipes={recipes.length} paginado={paginado}/>
      <div>{currentRecipes.map(({id,title, image, diets})=> {
        return <Link to={`/detail/${id}`} style={{textDecoration: 'none', color: 'black'}}> 
        <div>
        <div>
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <h5>{diets}</h5>
        </div>
        </div></Link>} )}</div>
      
    </div>
)
}
export default Home;