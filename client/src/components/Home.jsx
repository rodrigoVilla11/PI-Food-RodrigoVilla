import SearchBar from './SearchBar'
import FiltersCards from './FiltersCards'
import { orderByName,orderByHealtScore, getRecipes } from "../actions";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Paginado from './Paginado'

const Home = () =>{
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.filteredRecipes)
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  // eslint-disable-next-line
  const [order, setOrder] = useState('')

  const paginado = (pageNumber) =>{
    if(pageNumber !== currentPage)
    setCurrentPage(pageNumber);
  }
  const handleOrderByName = (e) => {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setOrder('Ordered')
    setCurrentPage(1)
  }

  const handleOrderByHS = (e) => {
    e.preventDefault()
    dispatch(orderByHealtScore(e.target.value))
    setOrder('Ordered')
    setCurrentPage(1)
  }
  //EL PROBLEMA ES CUANDO ESTOY EN LA PAGE 1 Y ORDENO, NO ME ACTUALIZA, PERO SI CAMBIO LA PAGE Y VUELVO, SE RE-RENDERIZA TODO PERFECTO
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
      <div>
      <span> Order By Name: </span>
          <select onChange={e=>handleOrderByName(e)}>
          <option value="All"></option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>
          <span> Order By Health Score: </span>
          <select onChange={e=>handleOrderByHS(e)}>
            <option value="All"></option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>
        </div>
      <Link to='/form'><button>Crear Receta</button></Link>
      <button onClick={e=>{handleClick(e)}}>Volver a cargar</button>
      <Paginado recipesPerPage={recipesPerPage} recipes={recipes.length} paginado={paginado}/>
      <div>{currentRecipes.map(({id,title, image, diets})=> {
        return <Link key={id} to={`/detail/${id}`} style={{textDecoration: 'none', color: 'black'} }> 
        <div >
        <div>
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <h5>{diets.map(el => el.name)}</h5>
        </div>
        </div></Link>} )}</div>
      
    </div>
)
}
export default Home;