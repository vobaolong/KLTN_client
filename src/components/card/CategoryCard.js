/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listActiveCategories } from '../../apis/category'
import defaultImage from '../../assets/default.png'

const IMG = process.env.REACT_APP_STATIC_URL
const CategoryCard = ({ category = {} }) => {
  const [categoryValue, setCategoryValue] = useState({})

  const init = () => {
    setCategoryValue(category)
    listActiveCategories({
      search: '',
      categoryId: category._id,
      sortBy: 'name',
      order: 'asc',
      limit: 3,
      page: 1
    })
      .then((data) => {
        if (data.error) return
      })
      .catch((error) => {
        return
      })
  }

  useEffect(() => {
    init()
  }, [category])

  return (
    <div className='card-sm py-3'>
      <div className='bg-body-secondary rounded-circle m-auto w-75'>
        <Link
          className='text-reset text-decoration-none'
          to={`/category/${categoryValue._id}`}
          title={categoryValue.name}
        >
          <div className='card-img-top cus-card-img-top'>
            <img
              loading='lazy'
              src={
                categoryValue.image ? IMG + categoryValue.image : defaultImage
              }
              className='cus-card-img rounded-circle border'
              alt={categoryValue.name}
            />
          </div>
        </Link>
      </div>

      <div className='card-body p-0'>
        <Link
          className='text-reset link-hover d-block mt-1 text-center'
          to={`/category/${categoryValue._id}`}
          title={categoryValue.name}
        >
          <span
            className='card-title'
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            {categoryValue.name}
          </span>
        </Link>

        {/* {children?.length > 0 && (
          <div className='card-subtitle ms-2' style={{ minHeight: '80px' }}>
            {children?.map((child, index) => (
              <Link
                key={index}
                className='text-reset link-hover d-block mt-1'
                to={`/category/${child._id}`}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                <small>{child.name}</small>
              </Link>
            ))}
          </div>
        )} */}
      </div>
    </div>
  )
}

export default CategoryCard
