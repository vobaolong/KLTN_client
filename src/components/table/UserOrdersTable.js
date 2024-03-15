import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { listOrdersByUser } from '../../apis/order'
import { formatPrice } from '../../helper/formatPrice'
import { humanReadableDate } from '../../helper/humanReadable'
import StoreSmallCard from '../card/StoreSmallCard'
import Pagination from '../ui/Pagination'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import SortByButton from './sub/SortByButton'
import OrderStatusLabel from '../label/OrderStatusLabel'
import OrderPaymentLabel from '../label/OrderPaymentLabel'
import SearchInput from '../ui/SearchInput'
import { useTranslation } from 'react-i18next'

const UserOrdersTable = ({ heading = true, status = '' }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [orders, setOrders] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    status,
    sortBy: 'createdAt',
    order: 'desc',
    limit: 8,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    listOrdersByUser(_id, accessToken, filter)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setOrders(data.orders)
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
  }, [filter])

  useEffect(() => {
    setFilter({
      ...filter,
      status
    })
  }, [status])

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

  return (
    <div className='position-relative'>
      {heading && status === 'Not processed|Processing|Shipped' ? (
        <h4 className='text-center text-uppercase'>{t('processingOrders')}</h4>
      ) : (
        <h4 className='text-center text-uppercase'>{t('processedOrders')}</h4>
      )}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='d-flex justify-content-between align-items-end'>
        <div className='d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
        </div>

        <span className='me-2 text-nowrap res-hide'>
          Showing{' '}
          <b>
            {Math.min(
              filter.limit,
              pagination.size - filter.limit * (pagination.pageCurrent - 1)
            )}{' '}
          </b>
          of {pagination.size} {t('result')}
        </span>
      </div>
      {!isLoading && orders.length === 0 ? (
        <div className='d-flex justify-content-center mt-3 text-primary text-center'>
          <h5>You haven't placed an order yet!</h5>
        </div>
      ) : (
        <div className='table-scroll my-2'>
          <table className='table table-sm table-hover align-middle text-center'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('orderDetail.id')}
                    sortBy='_id'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('orderDetail.date')}
                    sortBy='createdAt'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('orderDetail.price')}
                    sortBy='amountFromUser'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('orderDetail.store')}
                    sortBy='orderId'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('orderDetail.deliveryUnit')}
                    sortBy='deliveryId'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('orderDetail.payment')}
                    sortBy='isPaidBefore'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('orderDetail.status')}
                    sortBy='status'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col'>
                  {/* <span
                  style={{ fontWeight: '400', fontSize: '.875rem' }}
                  className='text-secondary'
                >
                  Xem
                </span> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr key={index}>
                  <th scope='row'>
                    {index + 1 + (filter.page - 1) * filter.limit}
                  </th>
                  <td className='text-end'>
                    <small>{order._id}</small>
                  </td>
                  <td className='text-end' style={{ whiteSpace: 'normal' }}>
                    <small>{humanReadableDate(order.createdAt)}</small>
                  </td>
                  <td className='text-end'>
                    <small className='text-nowrap'>
                      {order.amountFromUser &&
                        formatPrice(order.amountFromUser.$numberDecimal)}{' '}
                      ₫
                    </small>
                  </td>
                  <td
                    className='text-start hidden-avatar'
                    style={{ maxWidth: '300px' }}
                  >
                    <StoreSmallCard store={order.storeId} />
                  </td>
                  <td className='text-end'>
                    {order.deliveryId && (
                      <small>
                        {order.deliveryId.name}
                        <br />
                        {formatPrice(order.deliveryId.price.$numberDecimal)} ₫
                      </small>
                    )}
                  </td>
                  <td>
                    <small>
                      <OrderPaymentLabel isPaidBefore={order.isPaidBefore} />
                    </small>
                  </td>
                  <td>
                    <small>
                      <OrderStatusLabel status={order.status} />
                    </small>
                  </td>
                  <td className='text-nowrap text-start'>
                    <Link
                      type='button'
                      className='btn btn-secondary opacity-75 ripple rounded-1'
                      to={`/account/purchase/detail/${order._id}`}
                    >
                      <i className='fas fa-info-circle'></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pagination.size !== 0 && (
        <Pagination pagination={pagination} onChangePage={handleChangePage} />
      )}
    </div>
  )
}

export default UserOrdersTable
