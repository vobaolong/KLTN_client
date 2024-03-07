import { useState, useEffect } from 'react'
import { listActiveCategories } from '../../apis/category'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import CategoryCard from '../card/CategoryCard'

const ListCategories = ({
  heading = '',
  categoryId = null,
  col = 'col-xl-2-5 col-md-3 col-sm-4 col-6',
  limit = '5'
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [categories, setCategories] = useState([])

  const init = () => {
    setError('')
    setIsLoading(true)
    listActiveCategories({
      search: '',
      categoryId,
      sortBy: 'name',
      order: 'asc',
      limit,
      page: 1
    })
      .then((data) => {
        if (data.error) setError(data.error)
        else setCategories(data.categories)
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [categoryId])

  return (
    <div className='position-relative'>
      {heading && <h4>{heading}</h4>}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      <div className='row mt-3'>
        {categories &&
          categories.map((category, index) => (
            <div className={`${col} mb-4`} key={index}>
              <CategoryCard category={category} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default ListCategories
