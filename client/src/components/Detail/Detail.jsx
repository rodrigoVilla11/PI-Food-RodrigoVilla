import { getRecipesById } from "../../redux/actions";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom";
import styles from './Detail.module.css'

const Detail = () =>{
  const dispatch = useDispatch()
  const recipe = useSelector((state) => state.recipe)
  const {id} = useParams()

  useEffect(()=>{
    dispatch(getRecipesById(id))
  }, [dispatch, id])
  
  const isArrayOfObjects = (arr) => {
    return Array.isArray(arr) && arr.every((item) => typeof item === 'object' && item !== null);
  };
  
    return(
        <div className={styles.body}>
        <Link to='/home'><button className={styles.goBackHome}>HOME</button></Link>
        <div className={styles.detailTitle}><h2>Recipe: {recipe.title}</h2></div>
         <div className={styles.imageAndSummary}> <div className={styles.detailImageDiv}> <img className={styles.detailImage} src={recipe.image} alt={recipe.title} /></div>
        <div className={styles.detailSummary}><h5>-Summary: {recipe.summary?.replace(/<[^>]*>/g, '')}</h5></div></div>
        <div className={styles.detailHealthScore}><h5>-Health Score: {recipe.healthScore}</h5></div>
        <div className={styles.detailInstructions}><h5>Instructions: {recipe.instructions?.replace(/<[^>]*>/g, '')}</h5></div>
        <div className={styles.detailDiets}><h5>-In whichs diets the recipe can be? {isArrayOfObjects(recipe.diets) ? recipe.diets.map(el=>el.name + ' | ' ): recipe.diets}</h5></div>
        </div>
    )
    }
    export default Detail;