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
import UserLevelLabel from '../label/UserLevelLabel'
import CheckoutForm from '../item/form/CheckoutForm'
import { useTranslation } from 'react-i18next'
import MallLabel from '../label/MallLabel'
import HotSaleLabel from '../label/HotSale'
import { calcPercent } from '../../helper/calcPercent'
import { toast } from 'react-toastify'

const IMG = process.env.REACT_APP_STATIC_URL

const ListCartItems = ({ cartId = '', storeId = '', userId = '', onRun }) => {
  const { t } = useTranslation()
  const [run, setRun] = useState(false)
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
    setIsLoading(true)
    listItemsByCart(_id, accessToken, cartId)
      .then(async (data) => {
        if (data.error) toast.error(data.error)
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
        toast.error('Some thing went wrong')
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
    setIsLoading(true)
    deleteFromCart(_id, accessToken, deleteItem._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(data.success)
          updateDispatch('account', data.user)
          setRun(!run)
          if (onRun) onRun()
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
      })
  }

  const handleUpdate = (value, item) => {
    setIsLoading(true)
    updateCartItem(_id, accessToken, { count: value }, item._id)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          toast.success(data.success)
          updateDispatch('account', data.user)
          setRun(!run)
          if (onRun) onRun()
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
      })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title={t('dialog.removeProductFromCart')}
          color='danger'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      {items.map((item, index) => (
        <div
          key={index}
          className={`d-flex py-2 align-items-center gap-2 res-flex-column item${
            index === items.length - 1 ? ' last-item' : ''
          }`}
        >
          <div style={{ width: '2%' }} className='custom-checkbox text-center'>
            <input
              className=''
              type='checkbox'
              id={`productCheckbox${index}`}
            />
            <label
              style={{ fontSize: '0.9rem' }}
              for={`productCheckbox${index}`}
              className='checkmark'
            ></label>
          </div>
          <div
            style={{ width: '40%' }}
            className='d-flex py-1 justify-content-around align-items-center'
          >
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
            <div className='w-75 d-grid'>
              <div className='d-flex gap-2'>
                <MallLabel />
                {calcPercent(item.productId?.price, item.productId?.salePrice) >
                  20 && <HotSaleLabel />}
              </div>
              <Link
                className='text-reset text-decoration-none link-hover'
                to={`/product/${item.productId?._id}`}
                title={item.productId?.name}
              >
                {item.productId?.name}
              </Link>
              <div>
                {item.styleValueIds?.map((value, index) => (
                  <small className='text-muted' key={index}>
                    {value.styleId?.name}: {value.name}
                  </small>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{ width: '23%' }}
            className='d-inline-flex gap-3 justify-content-center'
          >
            <del className='text-secondary'>
              {item.productId?.price &&
                formatPrice(item.productId?.price.$numberDecimal)}
              <sup>₫</sup>
            </del>
            <span style={{ fontWeight: '500' }} className='text-black'>
              {item.productId.salePrice &&
                formatPrice(item.productId.salePrice.$numberDecimal)}
              <sup>₫</sup>
            </span>
          </div>

          {!item.productId?.isActive && (
            <Error msg='The product is banned by Zenpii!' />
          )}

          {item.productId?.isActive && !item.productId?.isSelling && (
            <Error msg='The product is out of business, please delete it from your cart, you can continue with others!' />
          )}

          {item.productId?.isActive &&
            item.productId?.isSelling &&
            item.productId?.quantity <= 0 && (
              <Error msg='The product is sold out, please delete it from your cart, you can continue with others!' />
            )}

          {item.productId?.isActive &&
            item.productId?.isSelling &&
            item.productId?.quantity > 0 &&
            item.productId?.quantity < item.count && (
              <Error
                msg={`Only ${item.productId.quantity} products left, please update the count!`}
              />
            )}

          <div
            style={{ width: '13%' }}
            className='d-flex flex-column justify-content-center align-items-center my-2'
          >
            {item.productId?.isActive &&
              item.productId?.isSelling &&
              item.productId?.quantity > 0 && (
                <div className='me-2'>
                  <DropDownMenu
                    listItem={
                      item.productId?.quantity &&
                      Array.from(
                        {
                          length: item.productId?.quantity
                        },
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
                    borderBtn={true}
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
          </div>
          <div
            className='text-center text-danger'
            style={{ width: '15%', fontWeight: '500' }}
          >
            {formatPrice(item.productId?.salePrice.$numberDecimal * item.count)}
            <sup>₫</sup>
          </div>

          <button
            type='button'
            className='btn btn-outline-danger ripple rounded-1'
            onClick={() => handleDelete(item)}
          >
            <i className='fas fa-trash-alt'></i>
            {/* <span className='ms-2 res-hide'>{t('button.delete')}</span> */}
          </button>
        </div>
      ))}

      {items.reduce(
        (prev, item) =>
          prev &&
          item.productId &&
          item.productId.isActive &&
          item.productId.isSelling &&
          item.productId.quantity > 0 &&
          item.productId.quantity >= item.count,
        true
      ) && (
        <div className='d-flex flex-wrap justify-content-end align-items-center mt-1 pt-1 border-top res-flex-justify-between'>
          {!showCheckoutFlag && (
            <div className='d-flex justify-content-end align-items-center'>
              <div className='me-4'>
                <p className='text-decoration-line-through text-muted'>
                  {formatPrice(totals.totalPrice)} ₫
                </p>

                <h4 className='text-decoration-line-through text-primary fs-5'>
                  {formatPrice(totals.totalSalePrice)} ₫
                </h4>
              </div>

              <div className='me-4'>
                <small>
                  <UserLevelLabel level={level} />
                </small>

                <h4 className='text-primary fs-5'>
                  {formatPrice(totals.amountFromUser1)} ₫
                </h4>
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
            Proceed to checkout
          </button>
        </div>
      )}

      {showCheckoutFlag && (
        <div className='mx-2 mt-1'>
          <CheckoutForm
            cartId={cartId}
            userId={userId}
            storeId={storeId}
            items={items}
          />
        </div>
      )}
    </div>
  )
}

export default ListCartItems
