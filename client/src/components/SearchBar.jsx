import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getRecipesByName} from '../actions'

const SearchBar = () =>{
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleSearchName = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(getRecipesByName(name))
        setName('')
    }
    return(
        <div>
            <input type="search" placeholder='Recipe...' onChange={e=>handleSearchName(e)}/>
            <button type='submit' onChange={e=>handleSubmit(e)}>Search Recipe</button>
        </div>
    )
    }
    export default SearchBar;