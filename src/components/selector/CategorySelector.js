/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { listCategories, listActiveCategories } from '../../apis/category'
import SearchInput from '../ui/SearchInput'
import CategorySmallCard from '../card/CategorySmallCard'
import Loading from '../ui/Loading'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const CategorySelector = ({
  defaultValue = '',
  isActive = false,
  selected = 'child',
  label = 'Chosen category',
  onSet = () => {},
  isSelected = true,
  isRequired = false
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [lv1Categories, setLv1Categories] = useState([])
  const [lv2Categories, setLv2Categories] = useState([])
  const [lv3Categories, setLv3Categories] = useState([])
  const [lv1Filter, setLv1Filter] = useState({
    search: '',
    categoryId: null,
    sortBy: 'name',
    order: 'asc',
    limit: 100,
    page: 1
  })
  const [lv2Filter, setLv2Filter] = useState({
    search: '',
    categoryId: '',
    sortBy: 'name',
    order: 'asc',
    limit: 100,
    page: 1
  })
  const [lv3Filter, setLv3Filter] = useState({
    search: '',
    categoryId: '',
    sortBy: 'name',
    order: 'asc',
    limit: 100,
    page: 1
  })

  const [selectedCategory, setSelectedCategory] = useState(defaultValue)

  const loadCategories = (filter, setCategories) => {
    setIsLoading(true)
    if (isActive) {
      listActiveCategories(filter)
        .then((data) => {
          if (data.error) toast.error(data.error)
          else setCategories(data.categories)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Something went wrong')
          setIsLoading(false)
        })
    } else {
      const { _id, accessToken } = getToken()
      listCategories(_id, accessToken, filter)
        .then((data) => {
          if (data.error) toast.error(data.error)
          else setCategories(data.categories)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Something went wrong')
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    loadCategories(lv1Filter, setLv1Categories)
  }, [lv1Filter])

  useEffect(() => {
    if (lv2Filter.categoryId) loadCategories(lv2Filter, setLv2Categories)
    else setLv2Categories([])
  }, [lv2Filter])

  useEffect(() => {
    if (lv3Filter.categoryId) loadCategories(lv3Filter, setLv3Categories)
    else setLv3Categories([])
  }, [lv3Filter])

  useEffect(() => {
    setSelectedCategory(defaultValue)
  }, [defaultValue])

  const handleChangeKeyword = (keyword) => {
    setLv1Filter({
      ...lv1Filter,
      search: keyword
    })
    setLv2Filter({
      ...lv2Filter,
      categoryId: ''
    })
    setLv3Filter({
      ...lv3Filter,
      categoryId: ''
    })
  }

  const handleClick = (filter, setFilter, category) => {
    if ((setFilter, filter))
      setFilter({
        ...filter,
        categoryId: category._id
      })

    if (filter === lv2Filter)
      setLv3Filter({
        ...lv3Filter,
        categoryId: ''
      })

    if (isSelected)
      if (
        (selected === 'parent' && filter === lv2Filter) ||
        (selected === 'parent' && filter === lv3Filter) ||
        (selected === 'child' && filter === null)
      ) {
        setSelectedCategory(category)
        if (onSet) onSet(category)
      }
  }

  const handleDelete = () => {
    setSelectedCategory('')
    if (onSet) onSet('')
  }

  return (
    <div className='row'>
      <div className='col'></div>
      <div className='col-12 position-relative'>
        <SearchInput onChange={handleChangeKeyword} />

        {isLoading && <Loading />}
        <div className='d-flex box-shadow p-2 mt-2 bg-body'>
          <div
            className='list-group m-1'
            style={{
              width: '33.33333%',
              overflowY: 'auto',
              height: '250px'
            }}
          >
            {lv1Categories?.map((category, index) => (
              <div>
                <button
                  key={index}
                  type='button'
                  className={`list-group-item ripple list-group-item-action d-flex justify-content-between align-items-center  ${
                    category._id === lv2Filter.categoryId ? 'active' : ''
                  }`}
                  onClick={() => handleClick(lv2Filter, setLv2Filter, category)}
                >
                  <span className='res-smaller-md'>{category.name}</span>
                  <i className='fa-solid fa-angle-right res-smaller-lg res-hide'></i>
                </button>
              </div>
            ))}
          </div>

          <div
            className='list-group m-1'
            style={{
              width: '33.33333%',
              overflowY: 'auto',
              height: '250px'
            }}
          >
            {lv2Categories?.map((category, index) => (
              <div>
                <button
                  key={index}
                  type='button'
                  className={`list-group-item ripple list-group-item-action d-flex justify-content-between align-items-center  ${
                    category._id === lv3Filter.categoryId && 'active'
                  }`}
                  onClick={() => handleClick(lv3Filter, setLv3Filter, category)}
                >
                  <span className='res-smaller-md'>{category.name}</span>
                  <i className='fa-solid fa-angle-right res-smaller-lg res-hide'></i>
                </button>
              </div>
            ))}
          </div>

          <div
            className='list-group m-1'
            style={{
              width: '33.33333%',
              overflowY: 'auto',
              height: '250px'
            }}
          >
            {lv3Categories?.map((category, index) => (
              <div>
                <button
                  key={index}
                  type='button'
                  className={`list-group-item ripple list-group-item-action ${
                    selectedCategory && category._id === selectedCategory._id
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => handleClick(null, null, category)}
                >
                  <span className='res-smaller-md'>{category.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isSelected && (
        <div className='col mt-2'>
          <div className='mt-4 position-relative'>
            <label
              className='position-absolute text-muted'
              style={{
                fontSize: '0.8rem',
                left: '12px',
                top: '-18px'
              }}
            >
              {label}
            </label>

            <div className='form-control border bg-light-subtle'>
              {selectedCategory ? (
                <div className='position-relative'>
                  <div className='me-5'>
                    <CategorySmallCard category={selectedCategory} />
                  </div>

                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm ripple position-absolute'
                    style={{
                      top: '50%',
                      transform: 'translateY(-50%)',
                      right: '0'
                    }}
                    onClick={() => handleDelete()}
                  >
                    <i className='fa-solid fa-xmark'></i>
                  </button>
                </div>
              ) : (
                <span className={isRequired && 'text-danger'}>
                  {t('variantDetail.required')}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategorySelector
