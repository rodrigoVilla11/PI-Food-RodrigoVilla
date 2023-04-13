const Paginado = ({recipesPerPage, recipes, paginado}) => {
    const pageNumbers = []

    for(let i = 0; i <= Math.ceil(recipes/recipesPerPage); i++) {
        pageNumbers.push(i + 1)
    }
    
    return(
        <nav>
            <ul className="paginado">
                { pageNumbers && pageNumbers.map(number =>{ 
                    return <li key={number}>
                    <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                })}
            </ul>
        </nav>
    )
}
export default Paginado