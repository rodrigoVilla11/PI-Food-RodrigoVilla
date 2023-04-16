import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getDiets, postRecipe} from '../actions'

const Form = () =>{
  const dispatch = useDispatch()
  const diets = useSelector((state) => state.diets)

  const [input, setInput] = useState({
    title: '',
    summary: '',
    healthScore: 0,
    instructions: '',
    image: '',
    diets: []
  })

  const handleChange = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }

  const handleDiets = e => {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    }
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postRecipe(input))
    alert('Personaje Creado')
    setInput({
      title: '',
    summary: '',
    healthScore: 0,
    instructions: '',
    image: '',
    diets: []
    })
  }
  useEffect(() =>{
    dispatch(getDiets())
  }, [dispatch])
    return(
        <div>
          <Link to='/home'><button>Back to Home</button></Link>
          <h1>Create your Recipe</h1>
          <form onSubmit={e=>handleSubmit(e)}>
          <div>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" value={input.title} onChange={e=>handleChange(e)}/>
          </div>

          <div>
            <label htmlFor="summary">Summary: </label>
            <textarea type="text" name="summary" value={input.summary} onChange={e=>handleChange(e)}/>
          </div>

          <div>
            <label htmlFor="healthScore">Health Score: </label>
            <input type="text" name="healthScore" value={input.healthScore} onChange={e=>handleChange(e)}/>
          </div>
          
          <div>
            <label htmlFor="instructions">Instructions: </label>
            <textarea type="text" name="instructions" value={input.instructions} onChange={e=>handleChange(e)}/>
          </div>

          <div>
            <label htmlFor="image">Image: </label>
            <input type="text" name="image" value={input.image} onChange={e=>handleChange(e)}/>
          </div>
          <div>
            <label htmlFor="diets">Diets: </label>
            <select onChange={e=>handleDiets(e)}> 
              {diets.map((diet) =>(
                <option value={diet.name} >{diet.name}</option>
              ))}
            </select>
            <ul><li>{input.diets.map(elem => elem + "," + <button>X</button>)}</li></ul>
          </div>
          <button type="submit" >Create Recipe</button>
          </form>
        </div>
    )
    }
    export default Form;