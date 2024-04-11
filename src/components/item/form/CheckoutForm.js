/* eslint-disable react-hooks/exhaustive-deps */
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
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID
const CheckoutForm = ({
  cartId = '',
  storeId = '',
  userId = '',
  items = {}
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [updateDispatch] = useUpdateDispatch()
  const history = useHistory()
  const {
    firstName,
    lastName,
    phone,
    addresses,
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
        firstName,
        lastName,
        phone,
        address: addresses[0],
        isValidFirstName: true,
        isValidLastName: true,
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
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    init()
  }, [
    cartId,
    userId,
    storeId,
    items,
    firstName,
    lastName,
    phone,
    addresses,
    userLevel
  ])
  const [paypalDisabled, setPaypalDisabled] = useState(true)

  useEffect(() => {
    setPaypalDisabled(
      !order.firstName || !order.lastName || !order.phone || !order.address
    )
  }, [order.firstName, order.lastName, order.phone, order.address])

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
      firstName,
      lastName,
      phone,
      address,
      deliveryId,
      commissionId,
      amountFromUser,
      amountFromStore,
      amountToStore,
      amountToGD
    } = order

    if (
      !cartId ||
      !deliveryId ||
      !commissionId ||
      !firstName ||
      !lastName ||
      !phone ||
      !address ||
      !amountFromUser ||
      !amountFromStore ||
      !amountToStore ||
      !amountToGD
    ) {
      setOrder({
        ...order,
        isValidFirstName: regexTest('name', order.firstName),
        isValidLastName: regexTest('name', order.lastName),
        isValidPhone: regexTest('phone', order.phone)
      })
      return
    }
    if (
      !order.isValidFirstName ||
      !order.isValidLastName ||
      !order.isValidPhone
    )
      return
    setIsConfirming(true)
  }

  const onSubmit = () => {
    const { _id, accessToken } = getToken()
    const {
      firstName,
      lastName,
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
      firstName,
      lastName,
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

    setIsLoading(true)
    createOrder(_id, accessToken, cartId, orderBody)
      .then((data) => {
        if (data.error) toast.error(data.error)
        else {
          updateDispatch('account', data.user)
          history.push('/account/purchase')
          toast.success('Order successfully!')
        }
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Some thing went wrong')
        setIsLoading(false)
      })
  }

  const handlePayPalCreateOrder = (data, actions) => {
    const {
      cartId,
      deliveryId,
      commissionId,
      firstName,
      lastName,
      phone,
      address,
      amountFromUser,
      amountFromStore,
      amountToStore,
      amountToGD
    } = order

    if (
      !cartId ||
      !deliveryId ||
      !commissionId ||
      !firstName ||
      !lastName ||
      !phone ||
      !address ||
      !amountFromUser ||
      !amountFromStore ||
      !amountToStore ||
      !amountToGD
    ) {
      setOrder({
        ...order,
        isValidFirstName: regexTest('name', order.firstName),
        isValidLastName: regexTest('name', order.lastName),
        isValidPhone: regexTest('phone', order.phone)
      })
      return
    }

    if (
      !order.isValidFirstName ||
      !order.isValidLastName ||
      !order.isValidPhone
    )
      return
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
      const { _id, accessToken } = getToken()

      const {
        firstName,
        lastName,
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
        firstName,
        lastName,
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
          setError('Something went wrong')
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
          title={t('orderDetail.cod')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
          message={t('confirmDialog')}
        />
      )}

      <form
        className='border border-primary rounded-1 row mb-2'
        onSubmit={handleSubmit}
      >
        <div className='col-12 bg-primary rounded-top-1 p-3'>
          <Logo />
        </div>

        <div className='col-xl-8 col-md-6'>
          <div className='row my-2 p-2 border rounded ms-0'>
            <h5 className='col-12 text-primary'>
              <i className='fa-solid fa-location-dot me-2'></i>
              {t('orderDetail.userReceiver')}
            </h5>
            <hr />
            <div className='col-6 mt-2 d-flex justify-content-between align-items-end'>
              <div className='flex-grow-1'>
                <Input
                  type='text'
                  label={t('userDetail.firstName')}
                  value={order.firstName}
                  isValid={order.isValidFirstName}
                  feedback={t('userDetail.firstNameValid')}
                  validator='name'
                  required={true}
                  onChange={(value) =>
                    handleChange('firstName', 'isValidFirstName', value)
                  }
                  onValidate={(flag) =>
                    handleValidate('isValidFirstName', flag)
                  }
                />
              </div>
            </div>
            <div className='col-6 mt-2 d-flex justify-content-between align-items-end'>
              <div className='flex-grow-1'>
                <Input
                  type='text'
                  label={t('userDetail.lastName')}
                  value={order.lastName}
                  isValid={order.isValidLastName}
                  feedback={t('userDetail.lastNameValid')}
                  validator='name'
                  required={true}
                  onChange={(value) =>
                    handleChange('lastName', 'isValidLastName', value)
                  }
                  onValidate={(flag) => handleValidate('isValidLastName', flag)}
                />
              </div>

              <div className='d-inline-block position-relative ms-4'>
                <div className='d-inline-block cus-tooltip'>
                  <button
                    className='btn btn-primary ripple rounded-1'
                    type='button'
                    disabled={!!!firstName || !!!lastName}
                    onClick={() =>
                      setOrder({
                        ...order,
                        firstName: firstName,
                        lastName: lastName,
                        isValidFirstName: true,
                        isValidLastName: true
                      })
                    }
                  >
                    <i className='fa-solid fa-user'></i>
                  </button>
                </div>
                <small className='cus-tooltip-msg'>
                  {t('orderDetail.useRegisterLastName')}
                </small>
              </div>
            </div>
            <div className='col-12 mt-2 d-flex justify-content-between align-items-end'>
              <div className='flex-grow-1'>
                <Input
                  type='text'
                  label={t('userDetail.phone')}
                  value={order.phone}
                  isValid={order.isValidPhone}
                  feedback={t('userDetail.phoneValid')}
                  validator='phone'
                  required={true}
                  onChange={(value) =>
                    handleChange('phone', 'isValidPhone', value)
                  }
                  onValidate={(flag) => handleValidate('isValidPhone', flag)}
                />
              </div>

              <div className='d-inline-block position-relative ms-4'>
                <div className='d-inline-block cus-tooltip'>
                  <button
                    className='btn btn-primary ripple rounded-1'
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
                    <i className='fa-solid fa-phone'></i>
                  </button>
                </div>
                <small className='cus-tooltip-msg'>
                  {t('orderDetail.useRegisterPhone')}
                </small>
              </div>
            </div>

            <div className='col-12 mt-2 d-flex justify-content-between align-items-end'>
              <div className='flex-grow-1'>
                <DropDownMenu
                  borderBtn={true}
                  required={true}
                  listItem={addresses?.map((a, i) => {
                    const newA = {
                      value: a,
                      label: a
                    }
                    return newA
                  })}
                  value={order.address}
                  setValue={(address) =>
                    setOrder({
                      ...order,
                      address: address
                    })
                  }
                  size='lg'
                  label={t('userDetail.address')}
                />

                {addresses?.length <= 0 && (
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
                    count={addresses?.length}
                    detail={false}
                  />
                </div>
              </div>
            </div>

            <div className='col-12 mt-2 d-flex justify-content-between align-items-end'>
              {deliveries?.length > 0 && (
                <DropDownMenu
                  borderBtn={true}
                  listItem={deliveries?.map((d, i) => {
                    const newD = {
                      value: d,
                      label: d.name + ' (' + d.price.$numberDecimal + '₫)'
                    }
                    return newD
                  })}
                  required={true}
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
                  size='lg'
                  label={t('deliveryDetail.deliveryUnit')}
                />
              )}
              <div className='d-inline-block position-relative ms-4 mb-2'>
                <div className='d-inline-block'>
                  <span className='btn btn-md default btn-primary rounded-1'>
                    <i className='fa-solid fa-truck'></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-4 col-md-6'>
          <div className='my-2 p-2 border rounded'>
            <h5 className='text-primary px-2'>{t('cartDetail.yourOrder')}</h5>
            <hr className='mt-0' />
            <dl className='row'>
              <dt className='col-sm-3 col-6'>{t('cartDetail.subTotal')}</dt>
              <dd className='col-sm-9 col-6'>
                <dl className='row'>
                  <dd className='col-sm-6 res-hide'>
                    <p className='text-decoration-line-through text-muted'>
                      {formatPrice(order.totalPrice)}
                      <sup>₫</sup>
                    </p>

                    <h4 className='text-decoration-line-through text-primary fs-5'>
                      {formatPrice(order.totalSalePrice)}
                      <sup>₫</sup>
                    </h4>
                  </dd>
                  <dd className='col-sm-6'>
                    <small className='res-hide'>
                      <UserLevelLabel level={userLevel} />
                    </small>

                    <h4 className='text-primary fs-5'>
                      {formatPrice(order.amountFromUser1)}
                      <sup>₫</sup>
                    </h4>
                  </dd>
                </dl>
              </dd>

              <dt className='col-sm-3 col-6'>{t('cartDetail.shippingFee')}</dt>
              <dd className='col-sm-9 col-6'>
                <dl className='row'>
                  <dd className='col-sm-6 res-hide'>
                    <p className='text-decoration-line-through text-muted'>
                      {formatPrice(order.deliveryPrice)}
                      <sup>₫</sup>
                    </p>

                    <h4 className='text-decoration-line-through text-primary fs-5'>
                      {formatPrice(order.deliveryPrice)}
                      <sup>₫</sup>
                    </h4>
                  </dd>
                  <dd className='col-sm-6'>
                    <small className='res-hide'>
                      <UserLevelLabel level={userLevel} />
                    </small>

                    <h4 className='text-primary fs-5'>
                      {formatPrice(order.amountFromUser2)}
                      <sup>₫</sup>
                    </h4>
                  </dd>
                </dl>
              </dd>

              <dt className='col-sm-3 col-6'>{t('cartDetail.total')}</dt>
              <dd className='col-sm-9 col-6'>
                <h4 className='text-primary fs-5'>
                  {formatPrice(order.amountFromUser)}
                  <sup>₫</sup>
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
                disabled={!order.address || !order.phone}
              >
                {t('orderDetail.cod')}
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
                  disabled={paypalDisabled}
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
