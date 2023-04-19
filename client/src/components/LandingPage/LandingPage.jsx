import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'
import {useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRecipes } from "../../actions";

const LandingPage = () =>{
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.filteredRecipes)
  useEffect(()=>{
    dispatch(getRecipes())
  },[dispatch])
  
    return(
        <> <div className={styles.goHomeDiv}><Link to='/home' style={{textDecoration: 'none', color: 'black'}}><p className={styles.goHomeP}>Click here to go to the Home page</p></Link></div>
        <div className={styles.firstDiv}></div>
        <div className={styles.secondDiv}>ABOUT</div>
        <div className={styles.thirdDiv}>CARROUSEL
        {recipes.map(({title, image})=> {
        return <>
        <div>
        <h2>{title}</h2>
        <img src={image} alt={title} />
        </div>
        </>} )}
        </div>
        <div className={styles.fourthDiv}>Copyright 2023</div></>
    )
    }
    export default LandingPage;

