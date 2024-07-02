/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getToken } from '../../apis/auth'
import {
  listItemsByCart,
  deleteFromCart,
  updateCartItem
} from '../../apis/cart'
import { totalProducts } from '../../helper/total'
import { formatPrice } from '../../helper/formatPrice'
import useUpdateDispatch from '../../hooks/useUpdateDispatch'
import useToggle from '../../hooks/useToggle'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import ConfirmDialog from '../ui/ConfirmDialog'
import DropDownMenu from '../ui/DropDownMenu'
import CheckoutForm from '../item/form/CheckoutForm'
import { useTranslation } from 'react-i18next'
import MallLabel from '../label/MallLabel'
import HotSaleLabel from '../label/HotSale'
import { calcPercent } from '../../helper/calcPercent'
import { toast } from 'react-toastify'

const IMG = process.env.REACT_APP_STATIC_URL

const ListCartItems = ({
  cartId = '',
  storeId = '',
  userId = '',
  storeAddress = '',
  onRun
}) => {
  const { t } = useTranslation()
  const [run, setRun] = useState(false)
  const [error, setError] = useState('false')
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [showCheckoutFlag, toggleShowCheckoutFlag] = useToggle(false)
  const { level } = useSelector((state) => state.account.user)
  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()
  const [deleteItem, setDeleteItem] = useState({})
  const [totals, setTotals] = useState({
    totalPrice: 0,
    totalSalePrice: 0,
    amountFromUser1: 0
  })
  const init = () => {
    setError('')
    setIsLoading(true)
    listItemsByCart(_id, accessToken, cartId)
      .then(async (data) => {
        if (data.error) setError(data.error)
        else {
          setItems(data.items)
          const { totalPrice, totalSalePrice, amountFromUser1 } = totalProducts(
            data.items,
            level
          )
          setTotals({
            totalPrice,
            totalSalePrice,
            amountFromUser1
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError(`Server Error`)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (cartId) init()
  }, [cartId, storeId, userId, level, run])

  const handleDelete = (item) => {
    if (!item) return
    setDeleteItem(item)
    setIsConfirming(true)
  }

  const onSubmit = () => {
    setError('')
    setIsLoading(true)
    deleteFromCart(_id, accessToken, deleteItem._id)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          toast.success(t('toastSuccess.cart.delete'))
          updateDispatch('account', data.user)
          setRun(!run)
          if (onRun) onRun()
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError(`Server Error`)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  const handleUpdate = (value, item) => {
    setError('')
    setIsLoading(true)
    updateCartItem(_id, accessToken, { count: value }, item._id)
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          toast.success(t('toastSuccess.cart.update'))
          updateDispatch('account', data.user)
          setRun(!run)
          if (onRun) {
            onRun()
          }
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
      .catch((error) => {
        setError(`Server Error`)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {error && <Error msg={error} />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.removeProductFromCart')}
          color='danger'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}

      {items.map((item, index) => (
        <div
          key={index}
          className={`d-flex py-2 align-items-center gap-2 item${
            index === items.length - 1 ? ' last-item' : ''
          }
					${
            !item.productId?.isActive ||
            (item.productId?.isActive && !item.productId?.isSelling) ||
            (item.productId?.isActive &&
              item.productId?.isSelling &&
              item.productId?.quantity <= 0) ||
            (item.productId?.isActive &&
              item.productId?.isSelling &&
              item.productId?.quantity > 0 &&
              item.productId?.quantity < item.count)
              ? 'opacity-50'
              : ''
          }`}
        >
          <div className='d-flex py-1 justify-content-around align-items-start w-auto'>
            <div
              style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                maxWidth: '100%',
                maxHeight: '66.66667%',
                margin: '0px 5px 0 0'
              }}
            >
              <img
                loading='lazy'
                src={IMG + item.productId?.listImages[0]}
                alt={item.productId?.name}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: '0',
                  left: '0',
                  objectFit: 'contain',
                  borderRadius: '0.25rem',
                  border: '1px solid rgba(204,204,204,0.6)'
                }}
              />
            </div>
          </div>
          <div className='d-flex res-flex-column w-100 justify-content-between gap-1'>
            <div className='res-product-name'>
              <div className='d-flex gap-2'>
                <MallLabel />
                {calcPercent(item.productId?.price, item.productId?.salePrice) >
                  20 && <HotSaleLabel />}
              </div>
              <Link
                className='text-reset product-name text-decoration-none link-hover'
                to={`/product/${item.productId?._id}`}
                title={item.productId?.name}
              >
                {item.productId?.name}
              </Link>
              <div>
                {item.variantValueIds?.map((value, index) => (
                  <span className='text-muted' key={index}>
                    <small>
                      {value.variantId?.name}: {value.name}
                    </small>
                    {index < item.variantValueIds.length - 1 && ', '}
                  </span>
                ))}
              </div>
            </div>

            <div className='d-inline-flex flex-lg-row flex-md-column flex-sm-row gap-2 justify-content-center align-items-center res-price'>
              <del className='text-secondary text-end'>
                {formatPrice(item.productId?.price?.$numberDecimal)}
                <sup>₫</sup>
              </del>
              <span
                style={{ fontWeight: '500' }}
                className='text-black text-start'
              >
                {formatPrice(item.productId?.salePrice?.$numberDecimal)}
                <sup>₫</sup>
              </span>
            </div>

            <div className='d-flex flex-lg-column flex-sm-row justify-content-center align-items-center res-quantity'>
              {item.productId?.isActive &&
                item.productId?.isSelling &&
                item.productId?.quantity > 0 && (
                  <div className='me-2'>
                    <DropDownMenu
                      listItem={
                        item.productId?.quantity &&
                        Array.from(
                          { length: Math.min(item.productId?.quantity, 5) },
                          (_, i) => {
                            return {
                              value: i + 1,
                              label: i + 1
                            }
                          }
                        )
                      }
                      resetDefault={false}
                      value={item.count}
                      setValue={(value) => handleUpdate(value, item)}
                      borderBtn={false}
                      size='sm'
                    />
                  </div>
                )}
              {item.productId?.isActive &&
                item.productId?.isSelling &&
                item.productId?.quantity <= 6 && (
                  <Error
                    msg={`${t('productDetail.only')} ${
                      item.productId.quantity
                    } ${t('productDetail.productLeft')}`}
                  />
                )}
              {!item.productId?.isActive && (
                <Error msg={t('toastError.productBanned')} />
              )}

              {item.productId?.isActive && !item.productId?.isSelling && (
                <Error msg={t('toastError.outOfBusiness')} />
              )}

              {item.productId?.isActive &&
                item.productId?.isSelling &&
                item.productId?.quantity <= 0 && (
                  <Error msg={t('toastError.soldOut')} />
                )}

              {item.productId?.isActive &&
                item.productId?.isSelling &&
                item.productId?.quantity > 0 &&
                item.productId?.quantity < item.count && (
                  <Error
                    msg={`${t('productDetail.only')} ${
                      item.productId.quantity
                    } ${t('toastError.productLeft')}`}
                  />
                )}
            </div>
            <div
              className='d-flex justify-content-between gap-2 text-danger my-auto align-items-center res-total-price'
              style={{ fontWeight: '500' }}
            >
              <span>
                {formatPrice(
                  item.productId?.salePrice.$numberDecimal * item.count
                )}
                <sup>₫</sup>
              </span>
              <div className='d-inline-block position-relative'>
                <button
                  type='button'
                  className='btn btn-sm btn-outline-danger ripple rounded-1 cus-tooltip'
                  onClick={() => handleDelete(item)}
                >
                  <i className='fa-solid fa-trash-alt'></i>
                </button>
                <span className='cus-tooltip-msg'>{t('button.delete')}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {items.reduce(
        (prev, item) =>
          prev &&
          item.productId?.isActive &&
          item.productId?.isSelling &&
          item.productId?.quantity > 0 &&
          item.productId?.quantity >= item.count,
        true
      ) && (
        <div className='d-flex flex-wrap justify-content-end align-items-center mt-1 pt-3 border-top'>
          {!showCheckoutFlag && (
            <div className='me-4 d-flex flex-column fs-9 gap-1'>
              <div className='d-flex justify-content-between gap-4'>
                <span className='text-secondary'>
                  {t('cartDetail.subTotal')}:{' '}
                </span>
                <span>
                  {formatPrice(totals.totalSalePrice)}
                  <sup>₫</sup>
                </span>
              </div>
              {level?.discount?.$numberDecimal > 0 && (
                <div className='d-flex justify-content-between gap-4'>
                  <span className='text-secondary'>
                    {t('cartDetail.zenpiiDiscount')} (
                    {level?.discount?.$numberDecimal}%):{' '}
                  </span>
                  <span>
                    -{' '}
                    {formatPrice(
                      (totals.totalSalePrice *
                        level?.discount?.$numberDecimal) /
                        100
                    )}
                    <sup>₫</sup>
                  </span>
                </div>
              )}
              <div className='d-flex justify-content-between gap-4'>
                <span className='text-secondary'>
                  {t('cartDetail.totalPrice')}:{' '}
                </span>
                <span>
                  {formatPrice(totals.amountFromUser1)}
                  <sup>₫</sup>
                </span>
              </div>
            </div>
          )}

          <button
            className={`btn rounded-1 ${
              showCheckoutFlag ? 'btn-primary' : 'btn-outline-primary'
            } ripple`}
            type='button'
            onClick={toggleShowCheckoutFlag}
          >
            {t('cartDetail.proceedToCheckout')}
            <i
              className={`ms-1 fa-solid ${
                showCheckoutFlag ? 'fa-angle-up' : 'fa-angle-down'
              } fa-angle-down`}
            ></i>
          </button>
        </div>
      )}

      {showCheckoutFlag && (
        <div className='mt-1'>
          <CheckoutForm
            cartId={cartId}
            userId={userId}
            storeId={storeId}
            storeAddress={storeAddress}
            items={items}
          />
        </div>
      )}
    </div>
  )
}

export default ListCartItems
