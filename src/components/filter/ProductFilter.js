import { useState, useRef } from 'react'
import StarRating from '../label/StarRating'
import Input from '../ui/Input'

const ProductFilter = ({ filter, setFilter, onReset }) => {
  const [price, setPrice] = useState({
    min: 0,
    max: ''
  })
  const typingTimeoutRef = useRef(null)

  const handleFilter = (name, value) => {
    setFilter({
      ...filter,
      [name]: value
    })
  }

  const handleSetPrice = (name1, name2, value) => {
    setPrice({
      ...price,
      [name1]: value
    })

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleFilter(name2, value)
    }, 600)
  }
  const resetFilter = () => {
    // Reset filter state and price state
    setFilter({
      sortBy: '',
      rating: '',
      minPrice: 0,
      maxPrice: ''
    })
    setPrice({
      min: 0,
      max: ''
    })

    // Call the onReset callback function if provided
    if (onReset) {
      onReset()
    }
  }
  const renderFilterRating = () => {
    const render = []
    for (let i = 0; i <= 5; i++)
      render.push(
        <div key={i} className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='rating'
            id={`rating${i}`}
            defaultChecked={
              i !== 0 ? filter.rating === i : filter.rating === ''
            }
            onClick={() => {
              if (i === 0) handleFilter('rating', '')
              else handleFilter('rating', i)
            }}
            style={{
              cursor: 'pointer'
            }}
          />
          <label
            className='form-check-label'
            htmlFor={`rating${i}`}
            style={{
              cursor: 'pointer'
            }}
          >
            {i === 0 ? (
              <span>All</span>
            ) : (
              <small>
                <StarRating stars={i} /> {i !== 5 && 'up'}
              </small>
            )}
          </label>
        </div>
      )
    return render
  }

  return (
    <div>
      <button
        className='btn btn-primary ripple'
        type='button'
        data-bs-toggle='offcanvas'
        data-bs-target='#offcanvasFilter'
        aria-controls='offcanvasFilter'
      >
        <i className='fas fa-sliders-h'></i>
        <span className='ms-2'>All filters</span>
      </button>

      <div
        className='offcanvas offcanvas-start'
        tabIndex='-1'
        id='offcanvasFilter'
        aria-labelledby='offcanvasFilterLabel'
      >
        <div className='offcanvas-header'>
          <h2 className='offcanvas-title' id='offcanvasFilterLabel'>
            Filters
          </h2>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body'>
          <div className='mb-4'>
            <h6>Sort by</h6>

            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='sortBy'
                id='sortBy1'
                defaultChecked={filter.sortBy === 'sold'}
                onClick={() => handleFilter('sortBy', 'sold')}
                style={{
                  cursor: 'pointer'
                }}
              />
              <label
                className='form-check-label'
                htmlFor='sortBy1'
                style={{
                  cursor: 'pointer'
                }}
              >
                Best seller
              </label>
            </div>

            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='sortBy'
                id='sortBy2'
                defaultChecked={filter.sortBy === 'createdAt'}
                onClick={() => handleFilter('sortBy', 'createdAt')}
                style={{
                  cursor: 'pointer'
                }}
              />
              <label
                className='form-check-label'
                htmlFor='sortBy2'
                style={{
                  cursor: 'pointer'
                }}
              >
                New product
              </label>
            </div>
          </div>

          <div className='mb-4'>
            <h6>Rating</h6>
            {renderFilterRating()}
          </div>

          <div className='mb-4'>
            <h6 className='mb-0'>Price</h6>
            <form className='row'>
              <div className='col-12'>
                <Input
                  type='number'
                  label='Min price'
                  feedback='Please provide a valid price.'
                  validator='position|zero'
                  value={price.min}
                  onChange={(value) => handleSetPrice('min', 'minPrice', value)}
                />
              </div>
              <div className='col-12'>
                <Input
                  type='number'
                  label='Max price'
                  feedback='Please provide a valid price.'
                  validator='position|zero'
                  value={price.max}
                  onChange={(value) => handleSetPrice('max', 'maxPrice', value)}
                />
              </div>
            </form>
          </div>
          <button className='btn btn-secondary mb-2' onClick={resetFilter}>
            Reset filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
