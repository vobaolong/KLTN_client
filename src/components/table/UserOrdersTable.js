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

const UserOrdersTable = ({ heading = true, status = '' }) => {
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
    limit: 6,
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
        <h4 className='text-center text-uppercase'>Processing Orders</h4>
      ) : (
        <h4 className='text-center text-uppercase'>Processed Orders</h4>
      )}

      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='d-flex justify-content-between align-items-end'>
        <div className='d-flex align-items-center'>
          <SearchInput onChange={handleChangeKeyword} />
        </div>

        <span className='me-2 text-nowrap res-hide'>
          {pagination.size || 0} Kết Quả
        </span>
      </div>

      <div className='table-scroll my-2'>
        <table className='table table-sm table-hover align-middle text-center'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Order'
                  sortBy='_id'
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
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Total'
                  sortBy='amountFromUser'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Seller'
                  sortBy='orderId'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Delivery'
                  sortBy='deliveryId'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Payment'
                  sortBy='isPaidBefore'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Status'
                  sortBy='status'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td>
                  <small>{order._id}</small>
                </td>
                <td style={{ whiteSpace: 'normal' }}>
                  <small>{humanReadableDate(order.createdAt)}</small>
                </td>
                <td>
                  <small className='text-nowrap'>
                    {order.amountFromUser &&
                      formatPrice(order.amountFromUser.$numberDecimal)}{' '}
                    ₫
                  </small>
                </td>
                <td className='text-start ps-2' style={{ maxWidth: '300px' }}>
                  <StoreSmallCard store={order.storeId} />
                </td>
                <td>
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
                    className='btn btn-golden ripple'
                    to={`/account/purchase/detail/${order._id}`}
                  >
                    <i className='fas fa-info-circle'></i>
                    <span className='ms-2 res-hide'>Detail</span>
                  </Link>
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

export default UserOrdersTable
