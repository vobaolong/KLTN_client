import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getToken } from '../../../apis/auth'
import { createOrder } from '../../../apis/order'
import { listActiveDeliveries } from '../../../apis/delivery'
import { getStoreLevel } from '../../../apis/level'
import { getCommissionByStore } from '../../../apis/commission'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import ConfirmDialog from '../../ui/ConfirmDialog'
import UserAddAddressItem from '../../item/UserAddAddressItem'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import { regexTest } from '../../../helper/test'
import { convertVNDtoUSD } from '../../../helper/formatPrice'
import {
  totalDelivery,
  totalProducts,
  totalCommission
} from '../../../helper/total'
import { formatPrice } from '../../../helper/formatPrice'
import Logo from '../../layout/menu/Logo'
import Input from '../../ui/Input'
import DropDownMenu from '../../ui/DropDownMenu'
import UserLevelLabel from '../../label/UserLevelLabel'
import { PayPalButton } from 'react-paypal-button-v2'

const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID
const CheckoutForm = ({
  cartId = '',
  storeId = '',
  userId = '',
  items = {}
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')

  const [updateDispatch] = useUpdateDispatch()
  const history = useHistory()

  const {
    addresses,
    phone,
    level: userLevel
  } = useSelector((state) => state.account.user)
  const [deliveries, setDeliveries] = useState([])
  const [order, setOrder] = useState({})

  const init = async () => {
    try {
      const res = await listActiveDeliveries()
      const res1 = await getStoreLevel(storeId)
      const res2 = await getCommissionByStore(storeId)

      setDeliveries(res.deliveries)
      const { deliveryPrice, amountFromUser2 } = totalDelivery(
        res.deliveries[0],
        userLevel
      )
      const { totalPrice, totalSalePrice, amountFromUser1 } = totalProducts(
        items,
        userLevel
      )
      const { amountFromStore, amountToStore } = totalCommission(
        items,
        res1.level,
        res2.commission
      )

      setOrder({
        phone,
        address: addresses[0],
        isValidPhone: true,
        cartId,
        delivery: res.deliveries[0],
        deliveryId: res.deliveries[0]._id,
        deliveryPrice,
        amountFromUser2,
        totalPrice,
        totalSalePrice,
        amountFromUser1,
        amountFromUser: amountFromUser1 + amountFromUser2,
        amountFromStore,
        amountToStore,
        commissionId: res2.commission._id,
        amountToGD: amountFromUser1 + amountFromUser2 - amountToStore
      })
    } catch (e) {
      setError('Server Error')
    }
  }

  useEffect(() => {
    init()
  }, [cartId, userId, storeId, items, addresses, phone, userLevel])

  const handleChange = (name, isValidName, value) => {
    setOrder({
      ...order,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setOrder({
      ...order,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const {
      cartId,
      deliveryId,
      commissionId,
      address,
      phone,
      amountFromUser,
      amountFromStore,
      amountToStore,
      amountToGD
    } = order

    if (
      !cartId ||
      !deliveryId ||
      !commissionId ||
      !address ||
      !phone ||
      !amountFromUser ||
      !amountFromStore ||
      !amountToStore ||
      !amountToGD
    ) {
      setOrder({
        ...order,
        isValidPhone: regexTest('phone', order.phone)
      })
      return
    }

    if (!order.isValidPhone) return

    setIsConfirming(true)
  }

  const onSubmit = () => {
    const { _id, accessToken } = getToken()

    const {
      phone,
      address,
      deliveryId,
      commissionId,
      amountFromUser,
      amountFromStore,
      amountToStore,
      amountToGD
    } = order

    const orderBody = {
      phone,
      address,
      deliveryId,
      commissionId,
      amountFromUser,
      amountFromStore,
      amountToStore,
      amountToGD,
      isPaidBefore: false
    }

    setError('')
    setIsLoading(true)
    createOrder(_id, accessToken, cartId, orderBody)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          updateDispatch('account', data.user)
          history.push('/account/purchase')
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server Error')
        setTimeout(() => {
          setError('')
        }, 3000)
        setIsLoading(false)
      })
  }

  const handlePayPalCreateOrder = (data, actions) => {
    const {
      cartId,
      deliveryId,
      commissionId,
      address,
      phone,
      amountFromUser,
      amountFromStore,
      amountToStore,
      amountToGD
    } = order

    if (
      !cartId ||
      !deliveryId ||
      !commissionId ||
      !address ||
      !phone ||
      !amountFromUser ||
      !amountFromStore ||
      !amountToStore ||
      !amountToGD
    ) {
      setOrder({
        ...order,
        isValidPhone: regexTest('phone', order.phone)
      })
      return
    }

    if (!order.isValidPhone) return
    else {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: convertVNDtoUSD(order.amountFromUser)
            }
          }
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING'
        }
      })
    }
  }

  const handlePayPalApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // Show a success message to your buyer
      // alert("Transaction completed by " + details.payer.name.given_name);
      // OPTIONAL: Call your server to save the transaction
      const { _id, accessToken } = getToken()

      const {
        phone,
        address,
        deliveryId,
        commissionId,
        amountFromUser,
        amountFromStore,
        amountToStore,
        amountToGD
      } = order

      const orderBody = {
        phone,
        address,
        deliveryId,
        commissionId,
        amountFromUser,
        amountFromStore,
        amountToStore,
        amountToGD,
        isPaidBefore: true
      }

      setError('')
      setIsLoading(true)
      createOrder(_id, accessToken, cartId, orderBody)
        .then((data) => {
          if (data.error) setError(data.error)
          else {
            updateDispatch('account', data.user)
            history.push('/account/purchase')
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Server Error')
          setTimeout(() => {
            setError('')
          }, 3000)
          setIsLoading(false)
        })
    })
  }

  return (
    <div className='position-relative'>
      {isLoading && <Loading />}
      {isConfirming && (
        <ConfirmDialog
          title='Thanh Toán Khi Nhận Hàng'
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form
        className='border border-primary rounded-3 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary p-3'>
          <Logo />
          <p className='text-white fw-light'>Proceed to checkout</p>
        </div>

        <div className='col-xl-8 col-md-6'>
          <div className='row'>
            <div className='col-12 mt-2 d-flex justify-content-between align-items-end'>
              <div className='flex-grow-1'>
                <Input
                  type='text'
                  label='Phone'
                  value={order.phone}
                  isValid={order.isValidPhone}
                  feedback='Please provide a valid phone number.'
                  validator='phone'
                  onChange={(value) =>
                    handleChange('phone', 'isValidPhone', value)
                  }
                  onValidate={(flag) => handleValidate('isValidPhone', flag)}
                />
              </div>

              <div className='d-inline-block position-relative ms-4'>
                <div className='d-inline-block cus-tooltip'>
                  <button
                    className='btn btn-primary ripple'
                    type='button'
                    disabled={!!!phone}
                    onClick={() =>
                      setOrder({
                        ...order,
                        phone: phone,
                        isValidPhone: true
                      })
                    }
                  >
                    <i className='fas fa-phone-square-alt'></i>
                  </button>
                </div>
                <small className='cus-tooltip-msg'>
                  Use registered phone number
                </small>
              </div>
            </div>

            <div className='col-12 mt-2 d-flex justify-content-between align-items-end'>
              <div className='flex-grow-1'>
                <DropDownMenu
                  listItem={
                    addresses &&
                    addresses.map((a, i) => {
                      const newA = {
                        value: a,
                        label: a
                      }
                      return newA
                    })
                  }
                  value={order.address}
                  setValue={(address) =>
                    setOrder({
                      ...order,
                      address: address
                    })
                  }
                  size='large'
                  label='Address'
                />

                {addresses && addresses.length <= 0 && (
                  <small
                    style={{
                      marginTop: '-20px',
                      display: 'block'
                    }}
                  >
                    <Error msg='No address to choose, please add your address first!' />
                  </small>
                )}
              </div>
              <div className='mb-2 ms-4 position-relative'>
                <div className='d-inline-block cus-tooltip'>
                  <UserAddAddressItem
                    count={addresses && addresses.length}
                    detail={false}
                  />
                </div>
                <small className='cus-tooltip-msg'>Add your address</small>
              </div>
            </div>

            <div className='col-12 mt-4'>
              {deliveries && deliveries.length > 0 && (
                <DropDownMenu
                  listItem={
                    deliveries &&
                    deliveries.map((d, i) => {
                      const newD = {
                        value: d,
                        label: d.name + ' (' + d.price.$numberDecimal + ' ₫)'
                      }
                      return newD
                    })
                  }
                  value={order.delivery}
                  setValue={(delivery) => {
                    const { deliveryPrice, amountFromUser2 } = totalDelivery(
                      delivery,
                      userLevel
                    )
                    setOrder({
                      ...order,
                      delivery,
                      deliveryId: delivery._id,
                      deliveryPrice,
                      amountFromUser2,
                      amountFromUser: order.amountFromUser1 + amountFromUser2,
                      amountToGD:
                        order.amountFromUser1 +
                        amountFromUser2 -
                        order.amountToStore
                    })
                  }}
                  size='large'
                  label='Delivery unit'
                />
              )}
            </div>
          </div>
        </div>

        <div className='col-xl-4 col-md-6'>
          <div className='my-2 p-2 border border-primary rounded'>
            <h4 className='text-center'>Your order</h4>
            <hr />

            <dl className='row'>
              <dt className='col-sm-3 col-6'>Product's total</dt>
              <dd className='col-sm-9 col-6'>
                <dl className='row'>
                  <dd className='col-sm-6 res-hide'>
                    <p className='text-decoration-line-through text-muted'>
                      {formatPrice(order.totalPrice)} ₫
                    </p>

                    <h4 className='text-decoration-line-through text-primary fs-5'>
                      {formatPrice(order.totalSalePrice)} ₫
                    </h4>
                  </dd>
                  <dd className='col-sm-6'>
                    <small className='res-hide'>
                      <UserLevelLabel level={userLevel} />
                    </small>

                    <h4 className='text-primary fs-5'>
                      {formatPrice(order.amountFromUser1)} ₫
                    </h4>
                  </dd>
                </dl>
              </dd>

              <dt className='col-sm-3 col-6'>Delivery's total</dt>
              <dd className='col-sm-9 col-6'>
                <dl className='row'>
                  <dd className='col-sm-6 res-hide'>
                    <p className='text-decoration-line-through text-muted'>
                      {formatPrice(order.deliveryPrice)} ₫
                    </p>

                    <h4 className='text-decoration-line-through text-primary fs-5'>
                      {formatPrice(order.deliveryPrice)} ₫
                    </h4>
                  </dd>
                  <dd className='col-sm-6'>
                    <small className='res-hide'>
                      <UserLevelLabel level={userLevel} />
                    </small>

                    <h4 className='text-primary fs-5'>
                      {formatPrice(order.amountFromUser2)} ₫
                    </h4>
                  </dd>
                </dl>
              </dd>

              <dt className='col-sm-3 col-6'>Final total</dt>
              <dd className='col-sm-9 col-6'>
                <h4 className='text-primary fs-5'>
                  {formatPrice(order.amountFromUser)} ₫
                </h4>
              </dd>
            </dl>

            {error && (
              <div className='my-1'>
                <Error msg={error} />
              </div>
            )}

            <div className='mt-2'>
              <button
                type='submit'
                className='btn btn-primary btn-lg ripple w-100 mb-1'
                onClick={handleSubmit}
              >
                Thanh Toán Khi Nhận Hàng
              </button>

              <div style={{ position: 'relative', zIndex: '1' }}>
                <PayPalButton
                  options={{
                    clientId: CLIENT_ID
                  }}
                  style={{
                    layout: 'horizontal',
                    tagline: 'false'
                  }}
                  createOrder={(data, actions) =>
                    handlePayPalCreateOrder(data, actions)
                  }
                  onApprove={(data, actions) =>
                    handlePayPalApprove(data, actions)
                  }
                  onError={(err) => setError(String(err).slice(0, 300))}
                  onCancel={() => setIsLoading(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
