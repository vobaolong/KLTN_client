import { useState, useRef } from 'react'
import StarRating from '../label/StarRating'
import Input from '../ui/Input'

const ProductFilter = ({ filter, setFilter }) => {
  const [price, setPrice] = useState({
    min: 0,
    max: ''
  })
  const typingTimeoutRef = useRef(null)

  const handleFilter = (name, value, order) => {
    setFilter({ ...filter, [name]: value, order: order })
  }

  const handleSetPrice = (name1, name2, value) => {
    setPrice({
      ...price,
      [name1]: value
    })
    // if (typingTimeoutRef.current) {
    //   clearTimeout(typingTimeoutRef.current)
    // }
    // typingTimeoutRef.current = setTimeout(() => {
    //   handleFilter(name2, value)
    // }, 600)
    handleFilter(name2, value)
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
              <span>Tất cả</span>
            ) : (
              <small>
                <StarRating stars={i} /> {i !== 5 && 'trở lên'}
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
          className='btn btn-primary ripple'
          style={{ width: 'max-content' }}
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasFilter'
          aria-controls='offcanvasFilter'
        >
          <i className='fas fa-sliders-h'></i>
          <span className='ms-2'>Bộ Lọc</span>
        </button>
        <select
          className='form-select me-2'
          style={{ width: 'max-content', cursor: 'pointer' }}
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
          <option value='sold'>Bán chạy</option>
          <option value='createdAt'>Sản phẩm mới</option>
          <option value='asc'>Giá tăng dần</option>
          <option value='desc'>Giá giảm dần</option>
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
            Bộ Lọc
          </h2>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body'>
          {/* <div className='mb-4'>
            <h6>Sắp Xếp</h6>

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
                Bán Chạy
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
                Sản Phẩm Mới
              </label>
            </div>

            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='sortBy'
                id='sortBy3'
                checked={
                  filter.sortBy === 'salePrice' && filter.order !== 'asc'
                }
                onChange={() => handleFilter('sortBy', 'salePrice', 'desc')}
                style={{ cursor: 'pointer' }}
              />
              <label
                className='form-check-label'
                htmlFor='sortBy3'
                style={{ cursor: 'pointer' }}
              >
                Giảm dần
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='sortBy'
                id='sortBy4'
                checked={
                  filter.sortBy === 'salePrice' && filter.order === 'asc'
                } // Kiểm tra order === 'asc'
                onChange={() => handleFilter('sortBy', 'salePrice', 'asc')}
                style={{ cursor: 'pointer' }}
              />
              <label
                className='form-check-label'
                htmlFor='sortBy4'
                style={{ cursor: 'pointer' }}
              >
                Tăng dần
              </label>
            </div>
          </div> */}
          <div className='mb-4'>
            <h6>Đánh Giá</h6>
            {renderFilterRating()}
          </div>

          <div className='mb-4'>
            <h6 className='mb-0'>Giá</h6>
            <form className='row'>
              <div className='col-12'>
                <Input
                  type='number'
                  label='Giá thấp nhất'
                  feedback='Please provide a valid price.'
                  validator='position|zero'
                  value={price.min}
                  onChange={(value) => handleSetPrice('min', 'minPrice', value)}
                />
              </div>
              <div className='col-12'>
                <Input
                  type='number'
                  label='Giá cao nhất'
                  feedback='Please provide a valid price.'
                  validator='position|zero'
                  value={price.max}
                  onChange={(value) => handleSetPrice('max', 'maxPrice', value)}
                />
              </div>
            </form>
          </div>
          {/* <button className='btn btn-secondary mb-2' onClick={resetFilter}>
            Reset filters
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
