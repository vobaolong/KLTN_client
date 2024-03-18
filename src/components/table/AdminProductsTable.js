import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import {
  listProductsForAdmin,
  activeProduct as activeOrInactive
} from '../../apis/product'
import { humanReadableDate } from '../../helper/humanReadable'
import Pagination from '../ui/Pagination'
import SearchInput from '../ui/SearchInput'
import SortByButton from './sub/SortByButton'
import ProductSmallCard from '../card/ProductSmallCard'
import StoreSmallCard from '../card/StoreSmallCard'
import ProductStatusLabel from '../label/ProductStatusLabel'
import StarRating from '../label/StarRating'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'

const AdminProductsTable = ({ heading = true, isActive = true }) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [run, setRun] = useState('')

  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'name',
    isActive,
    order: 'asc',
    limit: 8,
    page: 1
  })

  const [activeProduct, setActiveProduct] = useState({})

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    listProductsForAdmin(_id, accessToken, filter)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setProducts(data.products)
          setPagination({
            size: data.size,
            pageCurrent: data.filter.pageCurrent,
            pageCount: data.filter.pageCount
          })
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
  }, [filter, run])

  useEffect(() => {
    setFilter({
      ...filter,
      isActive
    })
  }, [isActive])

  const handleChangeKeyword = (keyword) => {
    setFilter({
      ...filter,
      search: keyword,
      page: 1
    })
  }

  const handleChangePage = (newPage) => {
    setFilter({
      ...filter,
      page: newPage
    })
  }

  const handleSetSortBy = (order, sortBy) => {
    setFilter({
      ...filter,
      sortBy,
      order
    })
  }

  const handleActiveProduct = (product) => {
    setActiveProduct(product)
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    const value = { isActive: !activeProduct.isActive }
    activeOrInactive(_id, accessToken, value, activeProduct._id)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setTimeout(() => {
            setError('')
          }, 3000)
        } else setRun(!run)
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {heading && (
        <h4 className='text-center text-uppercase'>
          {isActive ? 'Active products' : 'Banned products'}
        </h4>
      )}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={!activeProduct.isActive ? 'Active product' : 'Ban product'}
          color={!activeProduct.isActive ? 'primary' : 'danger'}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <div className='d-flex justify-content-between align-items-end'>
        <div className='option-wrap d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
        </div>
        <small className='text-nowrap res-hide'>
          {t('showing')}{' '}
          <b>
            {Math.min(
              filter.limit,
              pagination.size - filter.limit * (pagination.pageCurrent - 1)
            )}{' '}
          </b>
          {t('of')} {pagination.size} {t('result')}
        </small>
      </div>

      <div className='table-scroll my-2'>
        <table className='table align-middle table-hover table-striped table-sm text-center'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Product Name'
                  sortBy='name'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Store'
                  sortBy='storeId'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Rating'
                  sortBy='rating'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Status'
                  sortBy='isSelling'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>

              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Created at'
                  sortBy='createdAt'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>

              <th scope='col'>
                {' '}
                {/* <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}
                  className='text-secondary'
                >
                  {t('action')}
                </span> */}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td
                  className='text-start py-1'
                  style={{
                    whiteSpace: 'normal',
                    maxWidth: '500px'
                  }}
                >
                  <ProductSmallCard product={product} />
                </td>
                <td className='text-start'>
                  <small>
                    <StoreSmallCard store={product.storeId} />
                  </small>
                </td>
                <td>
                  <small>
                    <i class='fa-solid fa-star text-warning me-1'></i>
                    {product.rating}
                  </small>
                </td>
                <td>
                  <ProductStatusLabel isSelling={product.isSelling} />
                </td>
                <td className='text-end'>
                  <small>{humanReadableDate(product.createdAt)}</small>
                </td>
                <td>
                  <button
                    type='button'
                    className={`btn ${
                      !product.isActive
                        ? 'btn-outline-success'
                        : 'btn-outline-danger'
                    } ripple cus-tooltip`}
                    onClick={() => handleActiveProduct(product)}
                  >
                    {!product.isActive ? (
                      <>
                        <i className='far fa-check-circle'></i>
                        <span className='ms-2 res-hide'>
                          {t('status.active')}
                        </span>
                      </>
                    ) : (
                      <>
                        <i className='fas fa-ban'></i>
                        <span className='ms-2 res-hide'>
                          {t('status.banned')}
                        </span>
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default AdminProductsTable
