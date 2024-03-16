import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { listOrdersForAdmin } from '../../apis/order'
import { humanReadableDate } from '../../helper/humanReadable'
import { formatPrice } from '../../helper/formatPrice'
import Pagination from '../ui/Pagination'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import SortByButton from './sub/SortByButton'
import OrderStatusLabel from '../label/OrderStatusLabel'
import OrderPaymentLabel from '../label/OrderPaymentLabel'
import StoreSmallCard from '../card/StoreSmallCard'
import UserSmallCard from '../card/UserSmallCard'
import SearchInput from '../ui/SearchInput'
import { useTranslation } from 'react-i18next'

const AdminOrdersTable = ({ heading = true, status = '' }) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])
  const [pagination, setPagination] = useState({
    size: 0
  })
  const [filter, setFilter] = useState({
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
    status,
    limit: 8,
    page: 1
  })

  const { _id, accessToken } = getToken()

  const init = () => {
    setError('')
    setIsLoading(true)
    listOrdersForAdmin(_id, accessToken, filter)
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
    setFilter({
      ...filter,
      status
    })
  }, [status])

  useEffect(() => {
    init()
  }, [filter])

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
      {heading &&
        (status === '' ? (
          <h4 className='text-center text-uppercase'>All Orders In System</h4>
        ) : (
          <h4 className='text-center text-uppercase'>
            Processing Orders In System
          </h4>
        ))}

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

      <div className='table-scroll my-2'>
        <table className='table align-middle table-hover table-striped table-sm text-center'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col' className='text-start'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Order'
                  sortBy='_id'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col' className='text-end'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Order Placed'
                  sortBy='createdAt'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col' className='text-end'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Total'
                  sortBy='amountFromUser'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col' className='text-start'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Buyer'
                  sortBy='userId'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col' className='text-start'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Store'
                  sortBy='storeId'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col' className='text-end'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Commission'
                  sortBy='amountToGD'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col' className='text-end'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Delivery Unit'
                  sortBy='deliveryId'
                  onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                />
              </th>
              <th scope='col'>
                <SortByButton
                  currentOrder={filter.order}
                  currentSortBy={filter.sortBy}
                  title='Payment Method'
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

              <th scope='col'> </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <th scope='row'>
                  {index + 1 + (filter.page - 1) * filter.limit}
                </th>
                <td className='text-start'>
                  <small>{order._id}</small>
                </td>
                <td style={{ whiteSpace: 'normal' }} className='text-end'>
                  <small>{humanReadableDate(order.createdAt)}</small>
                </td>
                <td className='text-end'>
                  <small className='text-nowrap'>
                    {order.amountFromUser &&
                      formatPrice(order.amountFromUser.$numberDecimal)}{' '}
                    ₫
                  </small>
                </td>
                <td className='text-start'>
                  <small className='hidden-avatar'>
                    <UserSmallCard user={order.userId} />
                  </small>
                </td>
                <td className='text-start'>
                  <small className='hidden-avatar'>
                    <StoreSmallCard store={order.storeId} />
                  </small>
                </td>
                <td className='text-end'>
                  <small className='text-nowrap'>
                    <i className='text-primary'>For Seller: </i>
                    {order.amountToStore &&
                      formatPrice(order.amountToStore.$numberDecimal)}{' '}
                    ₫
                  </small>
                  <br />
                  <small className='text-nowrap'>
                    <i className='text-success'>For Zenpii: </i>
                    {order.amountToGD &&
                      formatPrice(order.amountToGD.$numberDecimal)}{' '}
                    ₫
                  </small>
                </td>
                <td className='text-end'>
                  {order.deliveryId && (
                    <small>
                      <i>{order.deliveryId.name}</i>
                      <br />
                      {formatPrice(order.deliveryId.price.$numberDecimal)} ₫
                    </small>
                  )}
                </td>
                <td className='text-center'>
                  <span>
                    <OrderPaymentLabel isPaidBefore={order.isPaidBefore} />
                  </span>
                </td>
                <td className='text-center'>
                  <span>
                    <OrderStatusLabel status={order.status} />
                  </span>
                </td>
                <td className='text-center'>
                  <div className='position-relative d-inline-block'>
                    <Link
                      type='button'
                      className='btn btn-secondary rounded-1 ripple cus-tooltip'
                      to={`/admin/order/detail/${order._id}`}
                    >
                      <i className='fas fa-info-circle'></i>
                    </Link>
                    <small className='cus-tooltip-msg'>View order detail</small>
                  </div>
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

export default AdminOrdersTable
