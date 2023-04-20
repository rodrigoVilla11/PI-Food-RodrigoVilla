import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'
import Carrousel from './Carrousel';

const LandingPage = () =>{
  
  
    return(
        <div className={styles.body}> <div className={styles.goHomeDiv}><Link to='/home' style={{textDecoration: 'none', color: 'black'}}><p className={styles.goHomeP}>Click here to go to the Home page</p></Link></div>
        <div className={styles.firstDiv}></div>
        <div className={styles.secondDiv}><div className={styles.welcome}>Hi there! Welcome to Kitchen Cabinet</div><div className={styles.about}>  Kitchen Cabinet is a one-stop destination for all cooking enthusiasts. With a vast collection of recipes for a variety of dishes, this website makes it easy for you to find the perfect recipe for any occasion. Whether you are a seasoned chef or a beginner in the kitchen, Kitchen Cabinet offers a user-friendly interface that makes browsing and searching for recipes a breeze. Moreover, the website provides a unique feature where users can create and store their own recipes in their personal cabinet. This allows you to easily access your favorite recipes whenever you need them. With Kitchen Cabinet, cooking has never been so convenient and enjoyable.</div></div>
        <div className={styles.thirdDiv}></div>
        <Carrousel />
        <div className={styles.fourthDiv}>Copyright 2023 | Kitchen Cabinet <div>Developed by: Rodrigo Villarreal</div></div></div>
    )
    }
    export default LandingPage;

