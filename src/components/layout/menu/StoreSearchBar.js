import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

const StoreSearchBar = ({ storeId = '' }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const history = useHistory()

  const [query, setQuery] = useState(
    () => new URLSearchParams(location.search).get('keyword') || ''
  )

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    history.push(`/store/collection/${storeId}?keyword=${query}`)
  }

  return (
    <form
      className='store-search-bar m-0 input-group'
      onSubmit={handleFormSubmit}
    >
      <input
        className='form-control rounded-1'
        type='search'
        placeholder={t('search')}
        aria-label='Search'
        value={query}
        onChange={handleChange}
      />
      <button
        className='btn btn-outline-light border border-primary cus-outline text-white ripple rounded-end-1'
        type='submit'
        onClick={handleFormSubmit}
      >
        <i className='fa-solid fa-search'></i>
      </button>
    </form>
  )
}

export default StoreSearchBar
