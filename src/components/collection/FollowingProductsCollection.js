import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { listFollowingProducts } from '../../apis/follow'
import ProductCard from '../card/ProductCard'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import Pagination from '../ui/Pagination'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'

const FollowingProductsCollection = (props) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [run, setRun] = useState(false)

  const [listProducts, setListProducts] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    order: 'desc',
    limit: 8,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    listFollowingProducts(_id, accessToken, filter)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setListProducts(data.products)
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    init()
  }, [filter, run])

  const handleChangePage = (newPage) => {
    setFilter({
      ...filter,
      page: newPage
    })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <h4 className='text-center'>{t('favProduct')}</h4>
      <div className='d-flex justify-content-end align-items-end'>
        <ShowResult
          limit={filter.limit}
          size={pagination.size}
          pageCurrent={pagination.pageCurrent}
        />
      </div>

      <div className='container-fluid p-0 mt-3'>
        <div className='row'>
          {listProducts?.map((product, index) => (
            <div className='col-lg-3 col-sm-4 col-6 mb-4' key={index}>
              <ProductCard product={product} onRun={() => setRun(!run)} />
            </div>
          ))}
        </div>
      </div>

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default FollowingProductsCollection
