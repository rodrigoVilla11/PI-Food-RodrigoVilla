import styles from './Home.module.css'

const Paginated = ({recipesPerPage, recipes, currentPage, totalPages, setCurrentPage}) => {
    const pageNumbers = []
  

    const paginated = (pageNumber) => {
    if (pageNumber !== currentPage) setCurrentPage(pageNumber)
    console.log('page' + pageNumber)
    console.log('current' + currentPage)
    }

    for(let i = 0; i <= Math.ceil(recipes/recipesPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    const nextButton = () =>{
        if(currentPage < totalPages){
          setCurrentPage(currentPage + 1)
        }
      }
      const prevButton = () => {
        if(currentPage > 1){
          setCurrentPage(currentPage - 1)
        }
      }

    return(
        <nav className={styles.navPaginated}>
            <ul className={styles.paginated}>
                <button className={styles.eachPaginated} onClick={()=>prevButton()}>←</button>
                { pageNumbers && pageNumbers.map(number =>{ 
                    return <li key={number} style={{listStyle: 'none'} }>   
                    <button /*style={{color: 'white'}}*/ className={styles.eachPaginated} onClick={()=> paginated(number)}>{number}</button>
                    </li>
                })}
                <button className={styles.eachPaginated} onClick={() => nextButton()}>→</button>
            </ul>
        </nav>
    )
}
export default Paginated