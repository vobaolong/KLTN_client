/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { listOrdersByStore } from '../../apis/order'
import { humanReadableDate } from '../../helper/humanReadable'
import { formatPrice } from '../../helper/formatPrice'
import Pagination from '../ui/Pagination'
import Loading from '../ui/Loading'
import SortByButton from './sub/SortByButton'
import OrderStatusLabel from '../label/OrderStatusLabel'
import OrderPaymentLabel from '../label/OrderPaymentLabel'
import UserSmallCard from '../card/UserSmallCard'
import SearchInput from '../ui/SearchInput'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import { toast } from 'react-toastify'

const StoreOrdersTable = ({
  heading = true,
  storeId = '',
  isEditable = false,
  status = ''
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    listOrdersByStore(_id, accessToken, filter, storeId)
      .then((data) => {
        if (data.error) toast.error(data.error)
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

      <div className='p-3 box-shadow bg-body rounded-2'>
        <SearchInput onChange={handleChangeKeyword} />
        {!isLoading && pagination.size === 0 ? (
          <div className='d-flex justify-content-center mt-5 text-primary text-center'>
            <h5>{t('orderDetail.noOrder')}</h5>
          </div>
        ) : (
          <div className='table-scroll my-2'>
            <table className='table align-middle table-hover table-sm text-end'>
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
                  <th scope='col' className='text-end'>
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
                    <td className='text-start'>
                      <small>{order._id}</small>
                    </td>
                    <td style={{ whiteSpace: 'normal' }}>
                      <small>{humanReadableDate(order.createdAt)}</small>
                    </td>
                    <td>
                      <small className='text-nowrap'>
                        {formatPrice(order.amountFromUser?.$numberDecimal)}
                        <sup>₫</sup>
                      </small>
                    </td>
                    <td
                      className='text-start ps-2'
                      style={{ maxWidth: '300px' }}
                    >
                      <UserSmallCard user={order.userId} />
                    </td>
                    <td>
                      <small className='text-nowrap'>
                        <i className='text-success'>For Store: </i>
                        {order.amountToStore &&
                          formatPrice(order.amountToStore.$numberDecimal)}
                        <sup>₫</sup>
                      </small>
                      <br />

                      <small className='text-nowrap'>
                        <i className='text-primary'>For Zenpii: </i>
                        {order.amountToGD &&
                          formatPrice(order.amountToGD.$numberDecimal)}
                        <sup>₫</sup>
                      </small>
                    </td>
                    <td>
                      {order.deliveryId && (
                        <small>
                          <i>{order.deliveryId.name}</i>
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
                    <td className='text-center'>
                      <Link
                        type='button'
                        className='btn btn-secondary ripple cus-tooltip'
                        to={`/vendor/orders/detail/${order._id}/${storeId}`}
                        title={t('button.detail')}
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
          {pagination.size !== 0 && (
            <ShowResult
              limit={filter.limit}
              size={pagination.size}
              pageCurrent={pagination.pageCurrent}
            />
          )}
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

export default StoreOrdersTable
