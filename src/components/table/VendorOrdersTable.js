import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { listOrdersByStore } from '../../apis/order'
import { humanReadableDate } from '../../helper/humanReadable'
import { formatPrice } from '../../helper/formatPrice'
import Pagination from '../ui/Pagination'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import SortByButton from './sub/SortByButton'
import OrderStatusLabel from '../label/OrderStatusLabel'
import OrderPaymentLabel from '../label/OrderPaymentLabel'
import UserSmallCard from '../card/UserSmallCard'
import SearchInput from '../ui/SearchInput'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'

const StoreOrdersTable = ({
  heading = true,
  storeId = '',
  isEditable = false,
  status = ''
}) => {
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
    listOrdersByStore(_id, accessToken, filter, storeId)
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
        setError(error)
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
  }, [filter, storeId])

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
      {heading && (
        <>
          {status ===
            'Not processed|Processing|Shipped|Delivered|Cancelled' && (
            <h4 className='text-center text-uppercase'>
              {t('title.allOrders')}
            </h4>
          )}
          {status === 'Not processed' && (
            <h4 className='text-center text-uppercase'>
              {t('title.notProcessedOrders')}
            </h4>
          )}
          {status === 'Processing' && (
            <h4 className='text-center text-uppercase'>
              {t('title.processingOrders')}
            </h4>
          )}
          {status === 'Shipped' && (
            <h4 className='text-center text-uppercase'>
              {t('title.shippedOrders')}
            </h4>
          )}
          {status === 'Delivered' && (
            <h4 className='text-center text-uppercase'>
              {t('title.deliveredOrders')}
            </h4>
          )}
          {status === 'Cancelled' && (
            <h4 className='text-center text-uppercase'>
              {t('title.cancelledOrders')}
            </h4>
          )}
        </>
      )}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='d-flex justify-content-between align-items-end'>
        <SearchInput onChange={handleChangeKeyword} />

        <ShowResult
          limit={filter.limit}
          size={pagination.size}
          pageCurrent={pagination.pageCurrent}
        />
      </div>
      {!isLoading && pagination.size === 0 ? (
        <div className='d-flex justify-content-center mt-5 text-primary text-center'>
          <h5>{t('orderDetail.noOrder')}</h5>
        </div>
      ) : (
        <div className='table-scroll my-2'>
          <table className='table align-middle table-hover table-striped table-sm text-end'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col' className='text-start'>
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
                    title={t('orderDetail.total')}
                    sortBy='amountFromUser'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col' className='text-start'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('orderDetail.buyer')}
                    sortBy='userId'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col' className='text-start'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('orderDetail.commission')}
                    sortBy='amountToGD'
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
                <th scope='col' className='text-center'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('orderDetail.paymentMethod')}
                    sortBy='isPaidBefore'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>
                <th scope='col' className='text-center'>
                  <SortByButton
                    currentOrder={filter.order}
                    currentSortBy={filter.sortBy}
                    title={t('status.status')}
                    sortBy='status'
                    onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                  />
                </th>

                <th scope='col' className='text-center'></th>
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
                    <UserSmallCard user={order.userId} />
                  </td>
                  <td>
                    <small className='text-nowrap'>
                      <i className='text-success'>For Store: </i>
                      {order.amountToStore &&
                        formatPrice(order.amountToStore.$numberDecimal)}{' '}
                      ₫
                    </small>
                    <br />

                    <small className='text-nowrap'>
                      <i className='text-primary'>For Zenpii: </i>
                      {order.amountToGD &&
                        formatPrice(order.amountToGD.$numberDecimal)}{' '}
                      ₫
                    </small>
                  </td>
                  <td>
                    {order.deliveryId && (
                      <small>
                        <i>{order.deliveryId.name}</i>
                        <br />
                        {formatPrice(order.deliveryId.price.$numberDecimal)} ₫
                      </small>
                    )}
                  </td>
                  <td className='text-center'>
                    <small>
                      <OrderPaymentLabel isPaidBefore={order.isPaidBefore} />
                    </small>
                  </td>
                  <td className='text-center'>
                    <small>
                      <OrderStatusLabel status={order.status} />
                    </small>
                  </td>
                  <td className='text-center'>
                    <Link
                      type='button'
                      className='btn btn-secondary ripple cus-tooltip'
                      to={`/vendor/orders/detail/${order._id}/${storeId}`}
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

export default StoreOrdersTable
