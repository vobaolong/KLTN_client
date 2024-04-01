import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { listCategories, listActiveCategories } from '../../apis/category'
import SearchInput from '../ui/SearchInput'
import CategorySmallCard from '../card/CategorySmallCard'
import Error from '../ui/Error'
import Loading from '../ui/Loading'
import { useTranslation } from 'react-i18next'

const MultiCategorySelector = ({
  defaultValue = '',
  isActive = false,
  isRequired = false,
  label = 'Chosen category',
  onSet = () => {},
  isSelected = true
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

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

  const [selectedCategories, setSelectedCategories] = useState(defaultValue)

  const loadCategories = (filter, setCategories) => {
    setError('')
    setIsLoading(true)
    if (isActive) {
      listActiveCategories(filter)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setCategories(data.categories)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
    } else {
      const { _id, accessToken } = getToken()
      listCategories(_id, accessToken, filter)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setCategories(data.categories)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
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
    setSelectedCategories(defaultValue)
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

    if (isSelected && filter === null) {
      const temp = [...selectedCategories].map((category) => category._id)
      if (temp.indexOf(category._id) === -1) {
        setSelectedCategories([...selectedCategories, category])
        if (onSet) onSet([...selectedCategories, category])
      }
    }
  }

  const handleRemove = (index) => {
    let newArray = selectedCategories
    newArray.splice(index, 1)

    if (newArray.length !== 0) {
      setSelectedCategories(newArray)
      if (onSet) onSet(newArray)
    } else {
      setSelectedCategories('')
      if (onSet) onSet('')
    }
  }

  return (
    <div className='row'>
      <div className='col'>
        <SearchInput onChange={handleChangeKeyword} />
      </div>

      <div className='col-12 position-relative'>
        {isLoading && <Loading />}
        {error && <Error msg={error} />}

        <div className='d-flex border p-1 mt-2 rounded-2 bg-body-secondary'>
          <div
            className='list-group m-1'
            style={{
              width: '33.33333%'
            }}
          >
            {lv1Categories?.map((category, index) => (
              <button
                key={index}
                type='button'
                className={`list-group-item ripple list-group-item-action d-flex justify-content-between align-items-center ${
                  category._id === lv2Filter.categoryId && 'active'
                }`}
                onClick={() => handleClick(lv2Filter, setLv2Filter, category)}
              >
                <span className='res-smaller-md'>{category.name}</span>
                <i className='fas fa-angle-right res-smaller-lg res-hide'></i>
              </button>
            ))}
          </div>

          <div
            className='list-group m-1'
            style={{
              width: '33.33333%'
            }}
          >
            {lv2Categories?.map((category, index) => (
              <button
                key={index}
                type='button'
                className={`list-group-item ripple list-group-item-action d-flex justify-content-between align-items-center  ${
                  category._id === lv3Filter.categoryId && 'active'
                }`}
                onClick={() => handleClick(lv3Filter, setLv3Filter, category)}
              >
                <span className='res-smaller-md'>{category.name}</span>
                <i className='fas fa-angle-right res-smaller-lg res-hide'></i>
              </button>
            ))}
          </div>

          <div
            className='list-group m-1'
            style={{
              width: '33.33333%'
            }}
          >
            {lv3Categories?.map((category, index) => (
              <button
                key={index}
                type='button'
                className={`list-group-item ripple list-group-item-action ${
                  selectedCategories &&
                  selectedCategories
                    .map((category) => category._id)
                    .indexOf(category._id) !== -1 &&
                  'active'
                }`}
                onClick={() => handleClick(null, null, category)}
              >
                <span className='res-smaller-md'>{category.name}</span>
              </button>
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
                top: '-16px'
              }}
            >
              {label}
            </label>

            <div className='form-control border-0'>
              {selectedCategories ? (
                selectedCategories.map((category, index) => (
                  <span key={index} className='mb-1 d-flex align-items-center'>
                    <CategorySmallCard category={category} />
                    <button
                      type='button'
                      className='btn btn-outline-danger btn-sm ripple ms-2'
                      onClick={() => handleRemove(index)}
                    >
                      <i className='fa-solid fa-xmark'></i>
                    </button>
                  </span>
                ))
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

export default MultiCategorySelector
