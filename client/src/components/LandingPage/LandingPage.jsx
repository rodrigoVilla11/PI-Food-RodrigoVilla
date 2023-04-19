import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'
import {useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getExamples } from "../../actions";

const LandingPage = () =>{
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.recipes)
  useEffect(()=>{
    dispatch(getExamples())
  },[dispatch])
  
  const [actualImage, setactualImage] = useState(0);
  const images = recipes.map(({title, image}, index)=> {
    return <>
    <div className={actualImage === index ? `${styles.carrousel} ${styles.active}` : styles.carrousel }>{ actualImage === index &&( <><h2 className={styles.titleCarrousel}>{title}</h2><img key={index} src={image} alt={title} className={styles.imageCarrousel} /></>)}
    </div>
    </>} )
  const totalImages = images?.length
  
  const nextImage = () =>{
    setactualImage(actualImage === totalImages - 1 ? 0 : actualImage + 1)
  }
  const prevImage = () =>{
    setactualImage(actualImage === 0 ? totalImages - 1 : actualImage - 1)
  }
  
    return(
        <> <div className={styles.goHomeDiv}><Link to='/home' style={{textDecoration: 'none', color: 'black'}}><p className={styles.goHomeP}>Click here to go to the Home page</p></Link></div>
        <div className={styles.firstDiv}></div>
        <div className={styles.secondDiv}>ABOUT</div>
        <div className={styles.thirdDiv}>CARROUSEL
        <button onClick={prevImage} className={styles.prevButtonCarrousel}>←</button>
        {images}
        <button onClick={nextImage} className={styles.nextButtonCarrousel}>→</button>
        </div>
        <div className={styles.fourthDiv}>Copyright 2023</div></>
    )
    }
    export default LandingPage;

