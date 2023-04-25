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
        { recipe.title ?
        <><Link to='/home'><button className={styles.goBackHome}>HOME</button></Link><div className={styles.card}>
            <div className={styles.header}>
              <span className={styles.title}><h2>Recipe: {recipe.title}</h2></span>
              <div className={styles.imgAndDetails}>
                <div className={styles.image}>
                  <img className={styles.detailImage} src={recipe.image} alt={recipe.title} />
                </div>
                <div className={styles.details}>
                  <h5>-Summary: {recipe.summary?.replace(/<[^>]*>/g, '')}</h5>
                </div>	</div>
            </div>
            <div className={styles.info}>
              <p className={styles.description}>
                <span><h5>-Health Score: {recipe.healthScore}</h5></span>
                <span><h5>-In whichs diets the recipe can be? {recipe.diets?.length ? isArrayOfObjects(recipe.diets) ? recipe.diets.map(el => el.name + ' | ') : recipe.diets.join(' | ') : 'There is no diets for this recipe'}</h5></span>
                <h5>Instructions: {recipe.instructions?.replace(/<[^>]*>/g, '')}</h5>
              </p>
            </div>
          </div></> : <div className={styles.loadingDiv}></div>
  }
        </div>
    )
    }
    export default Detail;