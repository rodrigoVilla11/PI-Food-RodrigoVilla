import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getDiets, postRecipe} from '../../redux/actions'
import styles from './Form.module.css'

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

  const [errors, setErrors] = useState({
    title: '',
    summary: '',
    healthScore: '',
    instructions: '',
    image: ''
  })

  const handleChange = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })

    switch (e.target.name){
      case 'title':
        setErrors((prevState) => ({...prevState, title: validateTitle(e.target.value)}))
        break;
      case 'healthScore':
        setErrors((prevState) => ({...prevState, healthScore: validateHealthScore(e.target.value)}))
        break;
      case 'image':
        setErrors((prevState) => ({...prevState, image: validateImage(e.target.value)}))
        break;
      case 'summary':
        setErrors((prevState) => ({...prevState, summary: validateSummary(e.target.value)}))
        break;
      case 'instructions':
        setErrors((prevState) => ({...prevState, instructions: validateInstructions(e.target.value)}))
        break;
      default:
        break;
    }
  }

  const handleDiets = e => {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    }
  
  const handleCleanDiets = e => {
    e.preventDefault()
    setInput({
      ...input,
      diets: []
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(!errors){
      dispatch(postRecipe(input))
      alert('Recipe Created')
      setInput({
        title: '',
        summary: '',
        healthScore: 0,
        instructions: '',
        image: '',
        diets: []
        })}
    else{
      alert("You can't create a recipe with errors")
    }   
  }
  useEffect(() =>{
    dispatch(getDiets())
  }, [dispatch])

  const validateTitle = (title) => {
    if(!title){
      return 'Title empty'
    }// eslint-disable-next-line 
    else if (!/([A-Za-z]+([A-Za-z]+)+)/.test(title)){
      return 'Title only accept letters'
    } else {
      return ''
    }
  }

  const validateHealthScore = (healthScore) => {
    if(!healthScore){
      return 'Health Score empty'
    }else if(isNaN(healthScore)){
      return 'Health Score must be a number'
    }else if(healthScore < 0 || healthScore > 100){
      return 'Health Score must be a number between 0 and 100'
    } else{
      return ""
    }
  }

  const validateImage = (image) => {
    if(!image){
      return 'Image empty'
    }// eslint-disable-next-line
    else if(!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(image)){
      return 'Image must be a URL'
    } else{
      return ''
    }
  }
  
  const validateInstructions = (instructions) =>{
    if(!instructions){
      return 'Instructions empty'
    }else if(instructions.length < 40){
      return 'Instructions to short'
    } else{
      return ''
    }
  }

  const validateSummary = (summary) => {
    if(!summary){
      return 'Summary empty'
    }else if(summary.length < 10){
      return 'Summary to short'
    }else{
      return ''
    }
  }

    return(
        <div className={styles.body}>
          <Link to='/home'><button>Back to Home</button></Link>
          <h1>Create your Recipe</h1>
          <form className={styles.form} onSubmit={e=>handleSubmit(e)}>
          <div>
            <div className={styles.div}> <label htmlFor="title">Title: </label></div>
            <div className={styles.inputDiv}> <input className={styles.inputs} type="text" name="title" value={input.title} onChange={e=>handleChange(e)}/>            </div>
          </div>
          <div>{errors.title}</div>
          <div>
            <div className={styles.div}> <label className={styles.label} htmlFor="summary">Summary: </label></div>
            <textarea type="text" name="summary" value={input.summary} onChange={e=>handleChange(e)}/>
          </div>
          <div>{errors.summary}</div>
          <div>
          <div className={styles.div}><label htmlFor="healthScore">Health Score: </label></div>
            <input type="text" name="healthScore" value={input.healthScore} onChange={e=>handleChange(e)}/>
          </div>
          <div>{errors.healthScore}</div>
          <div>
          <div className={styles.div}><label htmlFor="instructions">Instructions: </label></div>
            <textarea type="text" name="instructions" value={input.instructions} onChange={e=>handleChange(e)}/>
          </div>
          <div>{errors.instructions}</div>
          <div>
          <div className={styles.div}><label htmlFor="image">Image: </label></div>
            <input type="text" name="image" value={input.image} onChange={e=>handleChange(e)}/>
          </div>
          <div>{errors.image}</div>
          <div>
          <div className={styles.div}><label htmlFor="diets">Diets: </label></div>
            <select onChange={e=>handleDiets(e)}> 
              {diets.map((diet) =>(
                <option value={diet.name} >{diet.name}</option>
              ))}
            </select>
            <button onClick={e=>handleCleanDiets(e)}>Clean diets</button>
            <ul><li>{input.diets.map(elem => elem + ",")}</li></ul>
          </div>
          <button type="submit" >Create Recipe</button>
          </form>
        </div>
    )
    }
    export default Form;