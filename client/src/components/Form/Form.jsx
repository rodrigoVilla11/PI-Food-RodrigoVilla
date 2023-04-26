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
    image: '',
    diets: ''
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
     if(!input.diets.includes(e.target.value)){
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })}else{
       alert('This recipe already has this diet')
      }
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
    if(errors.diets || errors.healthScore || errors.image || errors.instructions || errors.summary || errors.title){
      alert("You can't create a recipe with errors")
      console.log(errors)
    }
    else{
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
          {diets ? <><Link to='/home'><button className={styles.backHome}>Back to Home</button></Link>
          <div className={styles.titleDiv}><h1 className={styles.title}>Create your Recipe</h1></div>
          <form className={styles.form} onSubmit={e=>handleSubmit(e)}>
          <div className={styles.div}>
            <div className={styles.labelDiv} > <label htmlFor="title">Title: </label></div>
            <div className={styles.inputDiv}> <input className={styles.input} type="text" name="title" value={input.title} onChange={e=>handleChange(e) } />            </div>
          </div>
          <div className={styles.errors}>{errors.title}</div>
          <div className={styles.div}>
            <div className={styles.labelDiv}> <label className={styles.label} htmlFor="summary">Summary: </label></div>
            <div className={styles.inputDiv}><textarea className={styles.input} type="text" name="summary" value={input.summary} onChange={e=>handleChange(e)}/></div>
          </div>
          <div className={styles.errors}>{errors.summary}</div>
          <div className={styles.div}>
            <div className={styles.labelDiv}><label htmlFor="healthScore">Health Score: </label></div>
            <div className={styles.inputDiv}><input className={styles.input} type="text" name="healthScore" value={input.healthScore} onChange={e=>handleChange(e)}/></div>
          </div>
          <div className={styles.errors}>{errors.healthScore}</div>
          <div className={styles.div}>
          <div className={styles.labelDiv}><label htmlFor="instructions">Instructions: </label></div>
          <div className={styles.inputDiv}><textarea className={styles.input} type="text" name="instructions" value={input.instructions} onChange={e=>handleChange(e)}/></div>
          </div>
          <div className={styles.errors}>{errors.instructions}</div>
          <div className={styles.div}>
          <div className={styles.labelDiv}><label htmlFor="image">Image: </label></div>
          <div className={styles.inputDiv}><input className={styles.input} type="text" name="image" value={input.image} onChange={e=>handleChange(e)}/></div>
          </div>
          <div className={styles.errors}>{errors.image}</div>
          <div className={styles.div}>
          <div className={styles.labelDiv}><label htmlFor="diets">Diets: </label></div>
          <div className={styles.inputDiv}><select className={styles.input} onChange={e=>handleDiets(e)}> 
              {diets.map((diet) =>(
                <option value={diet.name} >{diet.name}</option>
              ))}
            </select></div>
            <button className={styles.button} onClick={e=>handleCleanDiets(e)}>Clean diets</button>
          </div>
          <div  className={styles.div}> 
            <ul className={styles.listaDiets}><li>{input.diets.map(elem => elem + ",")}</li></ul></div>
            <button type="submit" className={styles.buttonSubmit}>Create Recipe</button>
          </form>
          
          </> : <div>LOADING...</div>}</div>
    )
    }
    export default Form;