import React from 'react'
import { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import {
  getOrderByUser,
  getOrderByStore,
  getOrderForAdmin
} from '../../apis/order'
import { humanReadableDate } from '../../helper/humanReadable'
import { formatPrice } from '../../helper/formatPrice'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import OrderStatusLabel from '../label/OrderStatusLabel'
import Paragraph from '../ui/Paragraph'
import ListOrderItems from '../list/ListOrderItems'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const PrintBill = ({
  orders = '',
  orderId = '',
  storeId = '',
  by = 'user'
}) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [run, setRun] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState({})
  const { _id, accessToken } = getToken()
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
  }
  useEffect(() => {
    init()
  }, [orderId, storeId, by, run])

  return (
    <div className='position-relative'>
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
                  <label>{order.storeId?.name}</label>
                </Link>
              }
            />
          </div>
        </div>
      </div>
      <div className='container-fluid mb-3'>
        <div className='row py-2 border rounded-1'>
          <div className='border-bottom pb-2'>
            <p style={{ fontWeight: '500' }}>{t('orderDetail.userReceiver')}</p>
          </div>
          <div>
            <Paragraph
              label={t('userDetail.name')}
              colon
              value={`${order.userId?.firstName} ${order.userId?.lastName}`}
            />
            <Paragraph
              label={t('userDetail.phone')}
              colon
              value={order.phone}
            />
            <Paragraph
              label={t('userDetail.address')}
              colon
              value={order.address}
            />
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

          <div className='col-12 mt-2 d-flex justify-content-end'>
            <Paragraph
              label='Final total (include discounts)'
              value={
                <span className='text-primary fw-bold fs-5'>
                  {formatPrice(order.amountFromUser?.$numberDecimal)} ₫
                </span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrintBill
