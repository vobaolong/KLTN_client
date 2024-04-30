import React, { useState } from 'react'
import StarRating from '../label/StarRating'
import Input from '../ui/Input'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

const ProductFilter = ({ filter, setFilter }) => {
  const { t } = useTranslation()
  const [price, setPrice] = useState({
    min: 0,
    max: ''
  })
  const history = useHistory()
  const location = useLocation()

  const handleFilter = (name, value, order = 'desc') => {
    let newOrder = order
    if (value === 'asc' || value === 'desc') {
      newOrder = value
      value = 'salePrice'
    }

    setFilter({ ...filter, [name]: value, order: newOrder })

    const searchParams = new URLSearchParams(location.search)
    searchParams.set(name, value)

    if (name === 'sortBy' && value === 'salePrice') {
      searchParams.set('order', newOrder)
    } else {
      searchParams.delete('order')
    }
    history.push(`${location.pathname}?${searchParams.toString()}`)
  }

  const handleSetPrice = (name1, name2, value) => {
    setPrice({
      ...price,
      [name1]: value
    })
  }

  const applyPriceFilter = (event) => {
    event.preventDefault()
    handleFilter('minPrice', price.min)
    handleFilter('maxPrice', price.max)
  }

  const handleResetFilter = () => {
    setFilter({
      ...filter,
      rating: '',
      minPrice: 0,
      maxPrice: ''
    })
    setPrice({
      min: 0,
      max: ''
    })
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete('rating')
    searchParams.delete('minPrice')
    searchParams.delete('maxPrice')
    history.push(`${location.pathname}?${searchParams.toString()}`)
  }

  const renderFilterRating = () => {
    const render = []
    for (let i = 0; i <= 5; i++)
      render.push(
        <div key={i} className='form-check'>
          <input
            className='form-check-input pointer'
            type='radio'
            name='rating'
            id={`rating${i}`}
            checked={i !== 0 ? filter.rating === i : filter.rating === ''}
            onClick={() => {
              if (i === 0) handleFilter('rating', '')
              else handleFilter('rating', i)
            }}
          />
          <label className='form-check-label pointer' htmlFor={`rating${i}`}>
            {i === 0 ? (
              <span>{t('filters.all')}</span>
            ) : (
              <small>
                <StarRating stars={i} /> {i !== 5 && t('filters.up')}
              </small>
            )}
          </label>
        </div>
      )
    return render
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        className='d-flex align-items-center justify-content-between'
        style={{ width: '100%' }}
      >
        <button
          className='btn btn-primary rounded-1 ripple'
          style={{ width: 'max-content' }}
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasFilter'
          aria-controls='offcanvasFilter'
        >
          <i className='fa-light fa-filter'></i>
          <span className='ms-2'>{t('filters.filter')}</span>
        </button>
        <select
          className='form-select rounded-1 pointer'
          style={{ width: 'max-content' }}
          value={filter.sortBy === 'salePrice' ? filter.order : filter.sortBy}
          onChange={(e) => {
            const value =
              e.target.value === 'sold'
                ? 'sold'
                : e.target.value === 'createdAt'
                ? 'createdAt'
                : 'salePrice'
            const order = e.target.value === 'asc' ? 'asc' : 'desc'
            handleFilter('sortBy', value, order)
          }}
        >
          <option value='sold'>{t('filters.topSale')}</option>
          <option value='createdAt'>{t('filters.latest')}</option>
          <option value='asc'>{t('filters.lowToHigh')}</option>
          <option value='desc'>{t('filters.hightToLow')}</option>
        </select>
      </div>
      <div
        className='offcanvas offcanvas-start'
        tabIndex='-1'
        id='offcanvasFilter'
        aria-labelledby='offcanvasFilterLabel'
      >
        <div className='offcanvas-header'>
          <h2 className='offcanvas-title' id='offcanvasFilterLabel'>
            {t('filters.filter')}
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
            <h6>{t('filters.rating')}</h6>
            {renderFilterRating()}
          </div>
          <hr />
          <div className='mb-2'>
            <h6>{t('filters.price')}</h6>
            <form className='row'>
              <div className='col-md-6 col-sm-12'>
                <Input
                  type='number'
                  label={t('filters.min')}
                  feedback='Please provide a valid price.'
                  validator='position|zero'
                  value={price.min}
                  onChange={(value) => handleSetPrice('min', 'minPrice', value)}
                />
              </div>
              <div className='col-md-6 col-sm-12'>
                <Input
                  type='number'
                  label={t('filters.max')}
                  feedback='Please provide a valid price.'
                  validator='position|zero'
                  value={price.max}
                  onChange={(value) => handleSetPrice('max', 'maxPrice', value)}
                />
              </div>
              <div className='col-sm-12'>
                <button
                  className='btn btn-outline-primary w-100 mt-3 rounded-1 ripple'
                  onClick={applyPriceFilter}
                >
                  {t('filters.apply')}
                </button>
              </div>
            </form>
          </div>
          <hr />
          <button
            className='btn btn-primary w-100 mb-2 rounded-1 ripple'
            onClick={(event) => handleResetFilter(event)}
          >
            {t('filters.reset')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
