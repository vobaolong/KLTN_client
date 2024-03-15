import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { listSellingProductsByStore } from '../../apis/product'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import ProductCard from '../../components/card/ProductCard'
import Pagination from '../../components/ui/Pagination.js'
import Loading from '../../components/ui/Loading'
import Error from '../../components/ui/Error'
import ProductFilter from '../../components/filter/ProductFilter'
import StoreLayout from '../../components/layout/StoreLayout'
import MainLayout from '../../components/layout/MainLayout'
import { useTranslation } from 'react-i18next'

const CollectionPage = (props) => {
  const store = useSelector((state) => state.store.store)
  const { t } = useTranslation()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const keyword = new URLSearchParams(useLocation().search).get('keyword') || ''
  const [listProducts, setListProducts] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: keyword,
    rating: '',
    minPrice: 0,
    maxPrice: '',
    sortBy: 'sold',
    order: 'desc',
    categoryId: '',
    limit: 10,
    page: 1
  })

  const init = () => {
    setError('')
    setIsLoading(true)
    listSellingProductsByStore(filter, store._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
          setListProducts(data.products)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
      })
  }
  useEffect(() => {
    init()
  }, [filter, store])

  useUpdateEffect(() => {
    setFilter({
      ...filter,
      search: keyword,
      page: 1
    })
  }, [keyword])

  const handleChangePage = (newPage) => {
    setFilter({
      ...filter,
      page: newPage
    })
  }

  return typeof store.isActive === 'boolean' && !store.isActive ? (
    <MainLayout>
      <Error msg='This store is banned by Zenpii!' />
    </MainLayout>
  ) : (
    <StoreLayout store={store}>
      <div className='position-relative'>
        {isLoading && <Loading />}
        {error && <Error msg={error} />}

        <div className='d-flex justify-content-between align-items-end'>
          <div className=''>
            <ProductFilter filter={filter} setFilter={setFilter} />
          </div>
          <span className='me-3'>
            Showing {Math.min(pagination.size || 0, filter.limit)} of{' '}
            {filter.limit} {t('result')}
          </span>
        </div>

        <div className='row mt-3'>
          {listProducts?.map((product, index) => (
            <div
              className='col-xl-2-5 col-lg-3 col-md-3 col-sm-4 col-6 mb-4'
              key={index}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {pagination.size !== 0 && (
          <Pagination pagination={pagination} onChangePage={handleChangePage} />
        )}
      </div>
    </StoreLayout>
  )
}

export default CollectionPage
