import {useDispatch, useSelector } from 'react-redux'
import styles from './LandingPage.module.css'
import { useState, useEffect } from 'react'
import { getExamples } from "../../redux/actions";

const Carrousel = () =>{
    const dispatch = useDispatch()
  const recipes = useSelector((state) => state.recipes)
  useEffect(()=>{
    dispatch(getExamples())
  },[dispatch])
  
  const [actualImage, setactualImage] = useState(0);
  const images = recipes.map(({title, image}, index)=> {
    return <>
    <div className={actualImage === index ? `${styles.carrousel} ${styles.active}` : styles.carrousel }>
        { actualImage === index &&( <>
        <h2 className={styles.titleCarrousel}>{title}</h2>
        <img key={index} src={image} alt={title} className={styles.imageCarrousel} />
        </>)}
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
        <div>
            <button onClick={prevImage} className={styles.button}><span class={styles.text}>←</span><span>←</span></button>
        {images}
          <button onClick={nextImage} className={styles.buttonNext}><span class={styles.text}>→</span><span>→</span></button>
        </div>
    )
}
export default Carrousel