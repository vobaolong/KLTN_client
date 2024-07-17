/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import {
  listReturnByStore,
  sellerUpdateReturnStatusOrder
} from '../../apis/order'
import { humanReadableDate } from '../../helper/humanReadable'
import { formatPrice } from '../../helper/formatPrice'
import Pagination from '../ui/Pagination'
import Loading from '../ui/Loading'
import SortByButton from './sub/SortByButton'
import OrderReturnStatusLabel from '../label/OrderReturnStatusLabel'
import OrderPaymentLabel from '../label/OrderPaymentLabel'
import UserSmallCard from '../card/UserSmallCard'
import SearchInput from '../ui/SearchInput'
import { useTranslation } from 'react-i18next'
import ShowResult from '../ui/ShowResult'
import Error from '../ui/Error'
import noItem from '../../assets/noItem.png'

const SellerReturnTable = ({
  storeId = '',
  isEditable = false,
  status = ''
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [displayError, setDisplayError] = useState(false)
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
    let timerId = null
    listReturnByStore(_id, accessToken, filter, storeId)
      .then((data) => {
        console.log(data)
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
        if (timerId) clearTimeout(timerId)
      })
      .catch((error) => {
        setError('Server Error')
        setIsLoading(false)
        if (timerId) clearTimeout(timerId)
      })
    timerId = setTimeout(() => {
      if (error) setDisplayError(true)
    }, 3000)
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

  //
  const handleUpdateStatus = async (orderId, status) => {
    try {
      setIsLoading(true)
      setError('')
      setDisplayError(false)

      const result = await sellerUpdateReturnStatusOrder(
        _id,
        accessToken,
        status,
        orderId,
        storeId
      )

      if (result.success) {
        init()
      } else {
        throw new Error(result.error || 'Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      setError(`Failed to update status: ${error.message}`)
      setDisplayError(true)
    } finally {
      setIsLoading(false)
    }
  }
  //

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {displayError && <Error msg={error} />}

      <div className='p-3 box-shadow bg-body rounded-2'>
        <SearchInput onChange={handleChangeKeyword} />
        {!isLoading && pagination.size === 0 ? (
          <div className='my-4 text-center'>
            <img className='mb-3' src={noItem} alt='noItem' width={'100px'} />
            <h5>{t('orderDetail.noOrder')}</h5>
          </div>
        ) : (
          <>
            <div className='table-scroll my-2'>
              <table className='table align-middle table-hover table-sm text-start'>
                <thead>
                  <tr>
                    <th scope='col' className='text-center'></th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('orderDetail.id')}
                        sortBy='_id'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('orderDetail.date')}
                        sortBy='createdAt'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col' className='text-end'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('orderDetail.total')}
                        sortBy='amountFromUser'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('orderDetail.buyer')}
                        sortBy='userId'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('orderDetail.paymentMethod')}
                        sortBy='isPaidBefore'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('status.status')}
                        sortBy='status'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <span>{t('orderDetail.reason')}</span>
                    </th>
                    <th scope='col'>
                      <SortByButton
                        currentOrder={filter.order}
                        currentSortBy={filter.sortBy}
                        title={t('orderDetail.date')}
                        sortBy='createdAt'
                        onSet={(order, sortBy) =>
                          handleSetSortBy(order, sortBy)
                        }
                      />
                    </th>
                    <th scope='col'>
                      <span>{t('action')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, index) => (
                    <tr key={index}>
                      <th scope='row' className='text-center'>
                        {index + 1 + (filter.page - 1) * filter.limit}
                      </th>
                      <td>
                        <small>{order._id}</small>
                      </td>
                      <td style={{ whiteSpace: 'normal' }}>
                        <small>{humanReadableDate(order.createdAt)}</small>
                      </td>
                      <td className='text-end'>
                        <small className='text-nowrap'>
                          {formatPrice(order.amountFromUser?.$numberDecimal)}
                          <sup>₫</sup>
                        </small>
                      </td>
                      <td className='hidden-avatar'>
                        <UserSmallCard user={order.userId} />
                      </td>
                      <td>
                        <span>
                          <OrderPaymentLabel
                            isPaidBefore={order.isPaidBefore}
                          />
                        </span>
                      </td>
                      <td>
                        <span>
                          <OrderReturnStatusLabel
                            status={order.returnRequests?.status}
                          />
                        </span>
                      </td>
                      <td>
                        <span>{order.returnRequests?.reason}</span>
                      </td>
                      <td>
                        <small>
                          {humanReadableDate(order.returnRequests?.createdAt)}
                        </small>
                      </td>
                      <td>
                        <>
                          <button
                            className='btn btn-success rounded-1 btn-sm'
                            onClick={() =>
                              handleUpdateStatus(order._id, 'Approved')
                            }
                            disabled={
                              order.returnRequests?.status === 'Approved'
                            }
                          >
                            {t('button.approve')}
                          </button>
                          <button
                            className='btn btn-outline-danger rounded-1 btn-sm ms-2'
                            onClick={() =>
                              handleUpdateStatus(order._id, 'Rejected')
                            }
                            disabled={
                              order.returnRequests?.status === 'Rejected'
                            }
                          >
                            {t('button.reject')}
                          </button>
                        </>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          </>
        )}
      </div>
    </div>
  )
}

export default SellerReturnTable
