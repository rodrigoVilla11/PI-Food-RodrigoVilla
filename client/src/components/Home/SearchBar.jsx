import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getRecipesByName} from '../../redux/actions'
import styles from './Home.module.css'

const SearchBar = () =>{
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleSearchName = (e) => {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(getRecipesByName(name))
        setName('')
    }
    return(
        <div className={styles.searchBar}>
            <input className={styles.inputSearchBar} type="search" placeholder='Recipe...' onChange={e=>handleSearchName(e)}/>
            <button className={styles.buttonSearchBar} type='submit' onClick={e=>handleSubmit(e)}>Search Recipe</button>
        </div>
    )
    }
    export default SearchBar;