import styles from './Home.module.css'

const Paginated = ({recipesPerPage, recipes, paginated}) => {
    const pageNumbers = []

    for(let i = 0; i <= Math.ceil(recipes/recipesPerPage); i++) {
        pageNumbers.push(i + 1)
    }
    
    return(
        <nav className={styles.navPaginated}>
            <ul className={styles.paginated}>
                <button className={styles.eachPaginated}>←</button>
                { pageNumbers && pageNumbers.map(number =>{ 
                    return <li key={number} style={{listStyle: 'none'} }>   
                    <button className={styles.eachPaginated} onClick={()=> paginated(number)}>{number}</button>
                    </li>
                })}
                <button className={styles.eachPaginated}>→</button>
            </ul>
        </nav>
    )
}
export default Paginated