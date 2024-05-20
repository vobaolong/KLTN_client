/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listActiveCategories } from '../../apis/category'
import Skeleton from 'react-loading-skeleton'

const ListCategoryFooter = ({ category = {} }) => {
  const [categoryValue, setCategoryValue] = useState({})
  const [children, setChildren] = useState([])

  useEffect(() => {
    let isMounted = true
    const init = () => {
      setCategoryValue(category)
      listActiveCategories({
        search: '',
        categoryId: category._id,
        sortBy: 'name',
        order: 'asc',
        limit: 20,
        page: 1
      })
        .then((data) => {
          if (!isMounted) return
          if (data.error) return
          else setChildren(data.categories)
        })
        .catch((error) => {
          if (!isMounted) return
          return
        })
    }
    init()
    return () => {
      isMounted = false
    }
  }, [category])

  return (
    <>
      {categoryValue.name ? (
        <Link
          className='link-hover d-flex mt-1 text-start flex-wrap'
          style={{ whiteSpace: 'normal' }}
          to={`/category/${categoryValue._id}`}
          title={categoryValue.name}
        >
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}
            className='text-uppercase text-dark-emphasis'
          >
            {categoryValue.name}
          </span>
        </Link>
      ) : (
        <Skeleton />
      )}

      {children?.length > 0 ? (
        <div className='d-flex gap-1 text-secondary flex-wrap'>
          {children.map((child, index) => (
            <React.Fragment key={index}>
              <Link
                className='text-decoration-none footer-category-child text-secondary'
                to={`/category/${child._id}`}
              >
                <small>{child.name}</small>
              </Link>
              {index < children.length - 1 && (
                <span className='fw-light'>|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <Skeleton count={4} height={20} />
      )}
    </>
  )
}

export default ListCategoryFooter
