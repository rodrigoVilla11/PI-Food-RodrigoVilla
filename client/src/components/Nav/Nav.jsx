import styles from './Nav.module.css'
import { useState } from 'react'

const Nav = () =>{
    const [navTop, setNavTop] = useState('')

    let noScrollYet = window.pageYOffset
    window.onscroll = () => {
        let scrolling = window.pageYOffset;
        if(noScrollYet >= scrolling){
            setNavTop('0')
        }else{
            setNavTop('-100px')
        }
    } 
return(
    <nav className={styles.Nav} style={{ top: navTop}}>
        <div className={styles.logo}></div>
        <div className={styles.title}></div>
        <div className={styles.contacts}>
            <a href="https://www.instagram.com/_villarodrigo/" target="_blank" rel="noreferrer"><div className={styles.instagram}></div></a>
            <a href="https://www.linkedin.com/in/rodrigonicolasvillarreal/" target="_blank" rel="noreferrer"><div className={styles.linkedin}></div></a>
            <a href="https://github.com/rodrigoVilla11" target="_blank" rel="noreferrer"><div className={styles.github}></div></a>
        </div>
    </nav>
)
}
export default Nav;