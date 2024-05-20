/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import {
  listItemsByOrder,
  listItemsByOrderByStore,
  listItemsByOrderForAdmin
} from '../../apis/order'
import { formatPrice } from '../../helper/formatPrice'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import ReviewItem from '../item/ReviewItem'
import { useTranslation } from 'react-i18next'

const IMG = process.env.REACT_APP_STATIC_URL

const ListOrderItems = ({
  orderId = '',
  status = '',
  storeId = '',
  by = 'user'
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])

  const init = () => {
    const { _id, accessToken } = getToken()
    setIsLoading(true)
    if (by === 'store')
      listItemsByOrderByStore(_id, accessToken, orderId, storeId)
        .then((data) => {
          if (data.error) setError(data.error)
          else setItems(data.items)
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Something went wrong')
          setIsLoading(false)
        })
    else if (by === 'admin')
      listItemsByOrderForAdmin(_id, accessToken, orderId)
        .then((data) => {
          if (data.error) setError(data.error)
          else setItems(data.items)
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Something went wrong')
          setIsLoading(false)
        })
    else
      listItemsByOrder(_id, accessToken, orderId)
        .then((data) => {
          if (data.error) setError(data.error)
          else setItems(data.items)
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Something went wrong')
          setIsLoading(false)
        })
  }
  useEffect(() => {
    if (orderId) init()
  }, [orderId, storeId, by])

  return (
    <div className='list-order-items position-relative py-1'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      <small className='text-muted d-inline-block'>
        {t('orderDetail.note')}
      </small>
      <div className='flex-column d-flex  justify-content-between'>
        {items.map((item, index) => (
          <div key={index} className='list-item-container'>
            <div className='d-flex align-items-center res-flex-column'>
              <div
                className='border rounded-1'
                style={{
                  position: 'relative',
                  paddingBottom: '80px',
                  maxWidth: '80px',
                  width: '100%',
                  height: '0'
                }}
              >
                <img
                  loading='lazy'
                  className='rounded-1'
                  src={IMG + item.productId?.listImages[0]}
                  alt={item.productId?.name}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: '0',
                    left: '0',
                    objectFit: 'contain'
                  }}
                />
              </div>

              <div
                className='flex-grow-1 ms-3 align-items-start'
                style={{ flexDirection: 'column-reverse', width: '50%' }}
              >
                <Link
                  className='text-reset text-decoration-none link-hover d-block mt-1'
                  to={`/product/${item.productId?._id}`}
                  title={item.productId?.name}
                >
                  <p>{item.productId?.name}</p>
                </Link>

                <div className='mt-1'>
                  {item.variantValueIds?.map((value, index) => (
                    <p
                      className='text-muted'
                      style={{ fontSize: '0.9rem' }}
                      key={index}
                    >
                      {value.variantId?.name}: {value.name}
                    </p>
                  ))}
                </div>

                <div className='mt-1 d-flex gap-4'>
                  <p className='text-decoration-line-through text-muted'>
                    {formatPrice(item.productId?.price?.$numberDecimal)}
                    <sup>₫</sup>
                  </p>

                  <h4 className='text-primary fs-5'>
                    {formatPrice(item.productId?.salePrice?.$numberDecimal)}
                    <sup>₫</sup>{' '}
                    <span className='text-secondary fs-6'>x {item.count}</span>
                  </h4>
                </div>

                {item.productId?.isActive && !item.productId?.isSelling && (
                  <Error msg={t('productDetail.error')} />
                )}

                {item.productId?.isActive &&
                  item.productId?.isSelling &&
                  item.productId?.quantity <= 0 && (
                    <Error msg={t('productDetail.soldOut')} />
                  )}

                {item.productId?.isActive &&
                  item.productId?.isSelling &&
                  item.productId?.quantity > 0 &&
                  item.productId?.quantity < item.count && (
                    <Error
                      msg={`${t('productDetail.warning')} ${
                        item.productId?.quantity
                      } `}
                    />
                  )}
              </div>

              {by === 'user' && status === 'Delivered' && (
                <div className='d-flex justify-content-between align-items-center my-2'>
                  <ReviewItem
                    orderId={item?.orderId}
                    storeId={item?.productId?.storeId?._id}
                    productId={item?.productId?._id}
                    date={item?.updatedAt}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListOrderItems
