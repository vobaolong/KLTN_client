/* eslint-disable react-hooks/exhaustive-deps */
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
import ShowResult from '../ui/ShowResult'

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
    limit: 7,
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
        console.log('Something went wrong')
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
      {heading && (
        <>
          {status ===
            'Not processed|Processing|Shipped|Delivered|Cancelled' && (
            <h5 className='text-center text-uppercase'>
              {t('title.allOrders')}
            </h5>
          )}
          {status === 'Not processed' && (
            <h5 className='text-center text-uppercase'>
              {t('title.notProcessedOrders')}
            </h5>
          )}
          {status === 'Processing' && (
            <h5 className='text-center text-uppercase'>
              {t('title.processingOrders')}
            </h5>
          )}
          {status === 'Shipped' && (
            <h5 className='text-center text-uppercase'>
              {t('title.shippedOrders')}
            </h5>
          )}
          {status === 'Delivered' && (
            <h5 className='text-center text-uppercase'>
              {t('title.deliveredOrders')}
            </h5>
          )}
          {status === 'Cancelled' && (
            <h5 className='text-center text-uppercase'>
              {t('title.cancelledOrders')}
            </h5>
          )}
        </>
      )}
      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <div className='p-3 box-shadow bg-body rounded-1'>
        <SearchInput onChange={handleChangeKeyword} />
        {!isLoading && pagination.size === 0 ? (
          <div className='d-flex justify-content-center mt-3 text-primary text-center'>
            <h5>{t('orderDetail.noOrder')}</h5>
          </div>
        ) : (
          <div className='table-scroll my-2'>
            <table className='table table-sm table-hover align-middle text-start'>
              <thead>
                <tr>
                  <th scope='col' style={{ width: '20px' }}></th>
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('orderDetail.id')}
                      sortBy='_id'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col' className='text-end'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('orderDetail.date')}
                      sortBy='createdAt'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col' className='text-end'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('orderDetail.total')}
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
                  <th scope='col' className='text-end'>
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
                  <th scope='col'>
                    <SortByButton
                      currentOrder={filter.order}
                      currentSortBy={filter.sortBy}
                      title={t('status.status')}
                      sortBy='status'
                      onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                    />
                  </th>
                  <th scope='col'>
                    <span
                      style={{ fontWeight: '400', fontSize: '.875rem' }}
                      className='text-secondary'
                    >
                      {t('action')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={index}>
                    <th scope='row' className='text-center'>
                      {index + 1 + (filter.page - 1) * filter.limit}
                    </th>
                    <td className='text-start'>
                      <small>{order._id}</small>
                    </td>
                    <td className='text-end' style={{ whiteSpace: 'normal' }}>
                      <small>{humanReadableDate(order.createdAt)}</small>
                    </td>
                    <td className='text-end'>
                      <small className='text-nowrap'>
                        {order.amountFromUser &&
                          formatPrice(order.amountFromUser.$numberDecimal)}
                        <sup>₫</sup>
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
                          {formatPrice(order.deliveryId.price.$numberDecimal)}
                          <sup>₫</sup>
                        </small>
                      )}
                    </td>
                    <td className='text-center'>
                      <span style={{ fontSize: '1rem' }}>
                        <OrderPaymentLabel isPaidBefore={order.isPaidBefore} />
                      </span>
                    </td>
                    <td className='text-center'>
                      <span style={{ fontSize: '1rem' }}>
                        <OrderStatusLabel status={order.status} />
                      </span>
                    </td>
                    <td className='text-nowrap text-center'>
                      <Link
                        type='button'
                        className='btn btn-outline-secondary opacity-75 rounded-1'
                        to={`/account/purchase/detail/${order._id}`}
                        title={t('button.view')}
                      >
                        <i className='fa-solid fa-eye'></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className='d-flex justify-content-between align-items-center px-4'>
          <ShowResult
            limit={filter.limit}
            size={pagination.size}
            pageCurrent={pagination.pageCurrent}
          />
          {pagination.size !== 0 && (
            <Pagination
              pagination={pagination}
              onChangePage={handleChangePage}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserOrdersTable
