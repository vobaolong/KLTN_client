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

const IMG = process.env.REACT_APP_STATIC_URL

const ListOrderItems = ({
  orderId = '',
  status = '',
  storeId = '',
  by = 'user'
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])

  const init = () => {
    const { _id, accessToken } = getToken()
    setError('')
    setIsLoading(true)

    if (by === 'store')
      listItemsByOrderByStore(_id, accessToken, orderId, storeId)
        .then((data) => {
          if (data.error) setError(data.error)
          else setItems(data.items)
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
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
          setError('Server Error')
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
          setError('Server Error')
          setIsLoading(false)
        })
  }

  useEffect(() => {
    if (orderId) init()
  }, [orderId, storeId, by])

  return (
    <div className='list-order-items mt-4 position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}

      <label
        className='position-absolute text-primary'
        style={{
          fontSize: '0.8rem',
          left: '12px',
          top: '-16px'
        }}
      >
        List products
      </label>

      <small className='text-muted d-inline-block mb-2'>
        *Note: The products will sometimes differ from your original order, as
        it may have been updated
      </small>

      {items.map((item, index) => (
        <div
          key={index}
          className='d-flex align-items-center mb-2 res-flex-column'
        >
          <div
            style={{
              position: 'relative',
              paddingBottom: '150px',
              width: '200px',
              height: '0',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <img
              src={item.productId && IMG + item.productId.listImages[0]}
              alt={item.productId && item.productId.name}
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

          <div className='flex-grow-1 mx-4 my-2'>
            <Link
              className='text-reset text-decoration-none link-hover d-block mt-1'
              to={`/product/${item.productId && item.productId._id}`}
              title={item.productId && item.productId.name}
            >
              <h3 className='fs-5'>{item.productId && item.productId.name}</h3>
            </Link>

            <div className='mt-2'>
              {item.styleValueIds &&
                item.styleValueIds.map((value, index) => (
                  <p key={index}>
                    {value.styleId && value.styleId.name}: {value.name}
                  </p>
                ))}
            </div>

            <div className='mt-2'>
              <p className='text-decoration-line-through text-muted'>
                {item.productId &&
                  item.productId.price &&
                  formatPrice(
                    item.productId && item.productId.price.$numberDecimal
                  )}{' '}
                ₫
              </p>

              <h4 className='text-primary fs-5'>
                {item.productId &&
                  item.productId.salePrice &&
                  formatPrice(
                    item.productId && item.productId.salePrice.$numberDecimal
                  )}{' '}
                ₫ x {item.count}
              </h4>
            </div>

            {item.productId &&
              item.productId.isActive &&
              !item.productId.isSelling && (
                <Error msg='The product is out of business, please remove it from your cart, you can continue with others!' />
              )}

            {item.productId &&
              item.productId.isActive &&
              item.productId.isSelling &&
              item.productId.quantity <= 0 && (
                <Error msg='The product is sold out, please remove it from your cart, you can continue with others!' />
              )}

            {item.productId &&
              item.productId.isActive &&
              item.productId.isSelling &&
              item.productId.quantity > 0 &&
              item.productId.quantity < item.count && (
                <Error
                  msg={`Only ${item.productId.quantity} products left, please update the count!`}
                />
              )}
          </div>

          {by === 'user' && status === 'Delivered' && (
            <div className='d-flex justify-content-between align-items-center my-2'>
              <ReviewItem
                orderId={item.orderId}
                storeId={item.productId.storeId._id}
                productId={item.productId._id}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ListOrderItems
