import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import DropDownMenu from '../../ui/DropDownMenu'

const listOptions = [
  {
    value: 'products',
    label: 'product',
    icon: <i className='fas fa-box'></i>
  },
  {
    value: 'stores',
    label: 'store',
    icon: <i className='fas fa-store'></i>
  },
  {
    value: 'users',
    label: 'user',
    icon: <i className='fas fa-user-friends'></i>
  }
]

const SearchBar = (props) => {
  const location = useLocation()
  const history = useHistory()

  const currentOption = location.pathname.split('/')[1]

  const [query, setQuery] = useState(() => {
    if (
      currentOption === 'products' ||
      currentOption === 'stores' ||
      currentOption === 'users'
    )
      return new URLSearchParams(location.search).get('keyword') || ''
    else return ''
  })
  const [option, setOption] = useState(() => {
    if (
      currentOption === 'products' ||
      currentOption === 'stores' ||
      currentOption === 'users'
    )
      return currentOption
    else return 'products'
  })

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    history.push(`/${option}/search?keyword=${query}`)
  }

  return (
    <form
      className='search-bar m-0 input-group border-1 border rounded-2'
      onSubmit={handleFormSubmit}
    >
      <DropDownMenu
        listItem={listOptions}
        value={option}
        setValue={setOption}
      />

      <input
        className='form-control'
        type='search'
        placeholder='Search'
        value={query}
        onChange={handleChange}
      />

      <button
        className='btn btn-outline-light cus-outline text-white ripple'
        type='submit'
        onClick={handleFormSubmit}
      >
        <i className='fas fa-search'></i>
      </button>
    </form>
  )
}

export default SearchBar
