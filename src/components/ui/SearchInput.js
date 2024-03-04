import { useState, useRef } from 'react'

const SearchInput = ({ onChange = () => {} }) => {
  const [keyword, setKeyword] = useState('')
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
      className='form-control'
      type='search'
      placeholder='Tìm kiếm'
      style={{ maxWidth: '206px' }}
      value={keyword}
      onChange={handleChangeKeyword}
    />
  )
}

export default SearchInput
