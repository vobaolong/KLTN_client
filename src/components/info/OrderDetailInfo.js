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
import SellerUpdateOrderStatus from '../button/SellerUpdateOrderStatus'
import UserCancelOrderButton from '../button/UserCancelOrderButton'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { totalProducts } from '../../helper/total'
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
          setError('Server Error')
          setIsLoading(false)
        })
    else if (by === 'admin')
      getOrderForAdmin(_id, accessToken, orderId)
        .then((data) => {
          if (data.error) setError(data.error)
          else {
            setOrder(data.order)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
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
          setError('Server Error')
          setIsLoading(false)
        })
      listItemsByOrder(_id, accessToken, orderId)
        .then((data) => {
          if (data.error) setError(data.error)
          else setItems(data.items)
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    init()
  }, [orderId, storeId, by, run])

  const totalOrderSalePrice = items.reduce((total, item) => {
    if (item.productId?.salePrice) {
      return total + item.productId?.salePrice.$numberDecimal * item.count
    }
    return total
  }, 0)

  const saleFromZenpii =
    totalOrderSalePrice - totalProducts(items, userLevel).amountFromUser1

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error ? (
        <Error msg={error} />
      ) : (
        <>
          <div className='d-flex flex-wrap justify-content-start align-items-center pb-2'>
            <h5 className='mx-1 orderID text-uppercase pe-3 border-end'>
              {t('orderDetail.id')} #{order._id}
            </h5>

            {(!isEditable ||
              by === 'admin' ||
              (isEditable &&
                by === 'store' &&
                order.status !== 'Not processed' &&
                order.status !== 'Processing' &&
                order.status !== 'Shipped')) && (
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
                order.status === 'Processing' ||
                order.status === 'Shipped') && (
                <div className='mx-4 mb-2'>
                  <SellerUpdateOrderStatus
                    storeId={storeId}
                    orderId={orderId}
                    status={order.status}
                    onRun={() => setRun(!run)}
                  />
                </div>
              )}
          </div>

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
              <div className='col-sm-6'>
                <p className='border-bottom pb-2' style={{ fontWeight: '500' }}>
                  {t('orderDetail.senderAddress')}
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
                  <Paragraph value={`${order.firstName} ${order.lastName}`} />
                  <Paragraph value={order.phone} />
                  <Paragraph value={order.address} />
                </div>
              </div>
            </div>
          </div>
          <div className='container-fluid mb-3'>
            <div className='row py-2 border rounded-1'>
              <div className='border-bottom pb-2'>
                <p style={{ fontWeight: '500' }}>
                  {t('orderDetail.ship_payment')}
                </p>
              </div>
              <div>
                <Paragraph
                  label={t('orderDetail.deliveryUnit')}
                  colon
                  value={'Giao hàng nhanh'}
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
                <p className='fw-normal'>{t('orderDetail.listProducts')}</p>
              </div>
              <ListOrderItems
                orderId={orderId}
                storeId={storeId}
                by={by}
                status={order.status}
              />
              <div className='d-flex justify-content-end border-top flex-column align-items-end'>
                {by === 'user' && getToken().role === 'user' && (
                  <div className='d-flex flex-column text-start text-nowrap fs-9'>
                    <div className='row gap-3 border-bottom py-2'>
                      <div className='col fw-normal'>
                        {t('cartDetail.subTotal')}
                      </div>
                      <div className='col text-end'>
                        <span>
                          {formatPrice(totalOrderSalePrice)}
                          <sup>₫</sup>
                        </span>
                      </div>
                    </div>
                    {saleFromZenpii !== 0 && (
                      <div className='row gap-3 border-bottom py-2'>
                        <div className='col'>
                          {t('cartDetail.zenpiiVoucherApplied')}
                        </div>
                        <div className='col text-end'>
                          <span>
                            -{formatPrice(saleFromZenpii)}
                            <sup>₫</sup>
                          </span>
                        </div>
                      </div>
                    )}
                    <div className='row gap-3 border-bottom py-2'>
                      <div className='col'>{t('cartDetail.shippingFee')}</div>
                      <div className='col text-end'>
                        <span>
                          {formatPrice(order.shippingFee?.$numberDecimal)}
                          <sup>₫</sup>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div className='row gap-3 py-2 d-flex align-items-center text-nowrap'>
                  <div className='col'>{t('cartDetail.total')}:</div>
                  <div className='col text-end'>
                    <span className='text-primary fw-bold fs-12 d-flex'>
                      {formatPrice(order.amountFromUser?.$numberDecimal)} ₫
                      {by !== 'user' && (
                        <span
                          title={t('orderDetail.includedDiscount')}
                          className='d-inline-block position-relative ms-3'
                        >
                          <i
                            style={{ fontSize: '15px', cursor: 'help' }}
                            className='fa-solid fa-circle-info ms-1 border rounded-circle text-secondary opacity-50'
                          ></i>
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default OrderDetailInfo
