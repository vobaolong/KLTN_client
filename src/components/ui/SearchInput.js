import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const SearchInput = ({ onChange = () => {} }) => {
  const [keyword, setKeyword] = useState('')
  const { t } = useTranslation()
  const typingTimeoutRef = useRef(null)

  const handleChangeKeyword = (e) => {
    const value = e.target.value
    setKeyword(value)
    if (!onChange) return
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      onChange(value)
    }, 600)
  }

  return (
    <input
      className='form-control rounded-1'
      type='search'
      placeholder={t('search')}
      style={{ maxWidth: '300px' }}
      value={keyword}
      onChange={handleChangeKeyword}
    />
  )
}

export default SearchInput
