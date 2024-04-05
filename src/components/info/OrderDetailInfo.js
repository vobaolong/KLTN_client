/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import {
  getOrderByUser,
  getOrderByStore,
  getOrderForAdmin,
  listItemsByOrder
} from '../../apis/order'
import { humanReadableDate } from '../../helper/humanReadable'
import { formatPrice } from '../../helper/formatPrice'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import OrderStatusLabel from '../label/OrderStatusLabel'
import Paragraph from '../ui/Paragraph'
import ListOrderItems from '../list/ListOrderItems'
import VendorUpdateOrderStatus from '../button/VendorUpdateOrderStatus'
import AdminUpdateOrderStatus from '../button/AdminUpdateOrderStatus'
import UserCancelOrderButton from '../button/UserCancelOrderButton'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { totalDelivery, totalProducts } from '../../helper/total'
import { useSelector } from 'react-redux'

const OrderDetailInfo = ({
  orderId = '',
  storeId = '',
  by = 'user',
  isEditable = false
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [run, setRun] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState({})
  const { _id, accessToken } = getToken()
  const [items, setItems] = useState([])
  const { level: userLevel } = useSelector((state) => state.account.user)

  const init = () => {
    setError('')
    setIsLoading(true)
    if (by === 'store')
      getOrderByStore(_id, accessToken, orderId, storeId)
        .then((data) => {
          if (data.error) setError(data.error)
          else setOrder(data.order)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
    else if (by === 'admin')
      getOrderForAdmin(_id, accessToken, orderId)
        .then((data) => {
          if (data.error) setError(data.error)
          else setOrder(data.order)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
    else {
      getOrderByUser(_id, accessToken, orderId)
        .then((data) => {
          if (data.error) setError(data.error)
          else {
            setOrder(data.order)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
      listItemsByOrder(_id, accessToken, orderId)
        .then((data) => {
          if (data.error) setError(data.error)
          else setItems(data.items)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    init()
  }, [orderId, storeId, by, run, userLevel])

  const totalOrderSalePrice = items.reduce((total, item) => {
    if (item.productId && item.productId.salePrice) {
      return total + item.productId.salePrice.$numberDecimal * item.count
    }
    return total
  }, 0)

  const saleFromSystem =
    totalOrderSalePrice - totalProducts(items, userLevel).amountFromUser1

  const saleFromShipping =
    order.deliveryId?.price?.$numberDecimal -
    totalDelivery(order.deliveryId, userLevel).amountFromUser2

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      <div className='d-flex flex-wrap justify-content-start align-items-center pb-2'>
        <h5 className='mx-1 orderID text-uppercase pe-3 border-end'>
          {t('orderDetail.id')} #{order._id}
        </h5>

        {(!isEditable ||
          (isEditable &&
            by === 'store' &&
            order.status !== 'Not processed' &&
            order.status !== 'Processing') ||
          (isEditable && by === 'admin' && order.status !== 'Shipped')) && (
          <span className='fs-6 mb-2 ms-3 status'>
            <OrderStatusLabel status={order.status} />
            <span className='d-inline-block position-relative'>
              <i
                style={{ cursor: 'help' }}
                className='fa-solid fa-circle-info ms-1 border rounded-circle cus-tooltip text-muted opacity-50'
              ></i>
              <small className='cus-tooltip-msg'>
                {t('orderDetail.lastUpdateTime')}{' '}
                {humanReadableDate(order.updatedAt)}
              </small>
            </span>
          </span>
        )}
        {by === 'user' && order.status === 'Not processed' && (
          <div className='ms-4 mb-2'>
            <UserCancelOrderButton
              orderId={order._id}
              status={order.status}
              detail={true}
              createdAt={order.createdAt}
              onRun={() => setRun(!run)}
            />
          </div>
        )}
        {isEditable &&
          by === 'store' &&
          (order.status === 'Not processed' ||
            order.status === 'Processing') && (
            <div className='mx-4 mb-2'>
              <VendorUpdateOrderStatus
                storeId={storeId}
                orderId={orderId}
                status={order.status}
                onRun={() => setRun(!run)}
              />
            </div>
          )}

        {isEditable && by === 'admin' && order.status === 'Shipped' && (
          <div className='mx-4 mb-2'>
            <AdminUpdateOrderStatus
              storeId={storeId}
              orderId={orderId}
              status={order.status}
              onRun={() => setRun(!run)}
            />
          </div>
        )}
      </div>
      {error && <Error msg={error} />}

      <div className='container-fluid mb-3'>
        <div className='row py-2 border rounded-1'>
          <div className='col-sm-6'>
            <Paragraph
              label={t('orderDetail.date')}
              colon
              value={humanReadableDate(order.createdAt)}
            />
          </div>
          <div className='col-sm-6'>
            <Paragraph
              label={t('orderDetail.store')}
              colon
              value={
                <Link
                  className='link-hover'
                  title=''
                  to={`/store/${order.storeId?._id}`}
                >
                  {order.storeId?.name}
                </Link>
              }
            />
          </div>
        </div>
      </div>

      <div className='container-fluid mb-3'>
        <div className='row py-2 border rounded-1'>
          <div className='col-sm-6 border-end'>
            <p className='border-bottom pb-2' style={{ fontWeight: '500' }}>
              Địa Chỉ Người Gửi
            </p>
            <div>
              <Paragraph value={order.storeId?.name} />
              <Paragraph value={order.storeId?.address} />
            </div>
          </div>
          <div className='col-sm-6'>
            <p className='border-bottom pb-2' style={{ fontWeight: '500' }}>
              {t('orderDetail.userReceiver')}
            </p>
            <div>
              <Paragraph
                value={`${order.userId?.firstName} ${order.userId?.lastName}`}
              />
              <Paragraph value={order.phone} />
              <Paragraph value={order.address} />
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid mb-3'>
        <div className='row py-2 border rounded-1'>
          <div className='border-bottom pb-2'>
            <p style={{ fontWeight: '500' }}>{t('orderDetail.ship_payment')}</p>
          </div>
          <div>
            <Paragraph
              label={t('orderDetail.deliveryUnit')}
              colon
              value={order.deliveryId?.name}
            />
            <Paragraph
              label={t('orderDetail.deliveryId')}
              colon
              value={order.deliveryId?._id.toUpperCase()}
            />
            <Paragraph
              label={t('orderDetail.paymentMethod')}
              colon
              value={
                order.isPaidBefore
                  ? t('orderDetail.onlinePayment')
                  : t('orderDetail.cod')
              }
            />
          </div>
        </div>
      </div>
      <div className='container-fluid mb-3'>
        <div className='row py-2 border rounded-1'>
          <div className='border-bottom pb-2'>
            <p style={{ fontWeight: '500' }}>{t('orderDetail.listProducts')}</p>
          </div>
          <ListOrderItems
            orderId={orderId}
            storeId={storeId}
            by={by}
            status={order.status}
          />
          <div className='d-flex justify-content-end border-top flex-column align-items-end'>
            {by === 'user' && getToken().role === 'user' && (
              <table className='col-lg-4 text-start'>
                <tbody>
                  <tr className='border-bottom'>
                    <th
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        backgroundColor: 'transparent'
                      }}
                      scope='col'
                    >
                      Tổng tiền hàng
                    </th>
                    <td className='text-end'>
                      <span style={{ fontSize: '0.9rem' }}>
                        {formatPrice(totalOrderSalePrice)} <sup>₫</sup>
                      </span>
                    </td>
                  </tr>
                  <tr className='border-bottom'>
                    <th
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        backgroundColor: 'transparent'
                      }}
                      scope='col'
                    >
                      Giảm giá từ Zenpii
                    </th>
                    <td className='text-end'>
                      <span style={{ fontSize: '0.9rem' }}>
                        -{formatPrice(saleFromSystem)} <sup>₫</sup>
                      </span>
                    </td>
                  </tr>
                  <tr className='border-bottom'>
                    <th
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        backgroundColor: 'transparent'
                      }}
                      scope='col'
                    >
                      Phí vận chuyển
                    </th>
                    <td className='text-end'>
                      <span style={{ fontSize: '0.9rem' }}>
                        {formatPrice(order.deliveryId?.price?.$numberDecimal)}{' '}
                        <sup>₫</sup>
                      </span>
                    </td>
                  </tr>
                  <tr className='border-bottom'>
                    <th
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        backgroundColor: 'transparent'
                      }}
                      scope='col'
                    >
                      Giảm giá vận chuyển
                    </th>
                    <td className='text-end'>
                      <span style={{ fontSize: '0.9rem' }}>
                        -{formatPrice(saleFromShipping)} <sup>₫</sup>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            <span className='col-lg-4 justify-content-between align-items-center d-flex'>
              <b className='text-muted'>Thành tiền:</b>
              <span className='text-primary fw-bold fs-5'>
                {formatPrice(order.amountFromUser?.$numberDecimal)}₫
              </span>
              {by !== 'user' && (
                <span className='d-inline-block position-relative'>
                  <i
                    style={{ fontSize: '15px', cursor: 'help' }}
                    className='fa-solid fa-circle-info ms-1 border rounded-circle cus-tooltip text-muted opacity-50'
                  ></i>
                  <small className='cus-tooltip-msg'>
                    {t('orderDetail.includedDiscount')}
                  </small>
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailInfo
