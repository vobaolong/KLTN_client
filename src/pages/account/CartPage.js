/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { getToken } from '../../apis/auth'
import { useTranslation } from 'react-i18next'
import { listCarts } from '../../apis/cart'
import cartEmpty from '../../assets/cartEmpty.png'
import Error from '../../components/ui/Error'
import Loading from '../../components/ui/Loading'
import MainLayout from '../../components/layout/MainLayout'
import StoreSmallCard from '../../components/card/StoreSmallCard'
import ListCartItemsForm from '../../components/list/ListCartItemsForm'
import ListBestSellerProducts from '../../components/list/ListBestSellerProduct'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import MetaData from '../../components/layout/meta/MetaData'
import { useHistory, useLocation } from 'react-router-dom'
import { createOrder } from '../../apis/order'
import useUpdateDispatch from '../../hooks/useUpdateDispatch'
import { socketId } from '../..'

function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const CartPage = () => {
  const { _id, accessToken } = getToken()
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [run, setRun] = useState(false)
  const [carts, setCarts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { cartCount } = useSelector((state) => state.account.user)
  const [updateDispatch] = useUpdateDispatch()
  let query = useQuery()

  const history = useHistory()

  useEffect(() => {
    setIsLoading(true)
    setError('')
    listCarts(_id, accessToken, { limit: '1000', page: '1' })
      .then((data) => {
        if (data.error) setError(data.error)
        else setCarts(data.carts)
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Server error')
        setIsLoading(false)
      })
  }, [run])

  useEffect(() => {
    const isOrder = query.get('isOrder')
    const cartId = query.get('cartId')
    const storeId = query.get('storeId')

    if (isOrder && cartId && storeId) {
      const orderString = localStorage.getItem('order')
      const orderBody = JSON.parse(orderString)

      createOrder(_id, accessToken, cartId, orderBody)
        .then((data) => {
          if (data.error) setError(data.error)
          else {
            updateDispatch('account', data.user)
            socketId.emit('notificationOrder', {
              orderId: data.order._id,
              from: _id,
              to: storeId
            })
            history.push('/account/purchase')
            toast.success(t('toastSuccess.order.create'))
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setError('Server error')
          setIsLoading(false)
        })
        .finally(() => {
          localStorage.removeItem('order')
        })
    }
  }, [query])

  return (
    <MainLayout>
      <div className='position-relative pt-4'>
        {isLoading && <Loading />}
        {error && <Error msg={error} />}

        <MetaData title={`${t('cart')}`} />
        {cartCount === 0 ? (
          <div className=''>
            <h5>{t('cart')}</h5>
            <div className='bg-white pb-3 mb-3 box-shadow rounded-2 align-items-center justify-content-center d-flex flex-column gap-2'>
              <img
                loading='lazy'
                src={cartEmpty}
                style={{ width: '200px' }}
                alt=''
              />
              <span className='text-danger'>{t('cartDetail.empty')}</span>
              <span class>{t('cartDetail.emptyRefer')}</span>
            </div>
            <ListBestSellerProducts heading={t('bestSeller')} />
          </div>
        ) : (
          <div className='accordion' id='accordionPanelsStayOpen'>
            <div
              style={{ backgroundColor: '#f1f5f9' }}
              className='container-fluid sticky-top-nav py-3 res-hide'
            >
              <div className='bg-white rounded-1 row p-1'>
                <div className='col-5'>
                  <label className='text-secondary fs-9'>
                    {t('cartDetail.all')} ({cartCount}{' '}
                    {t('cartDetail.products')})
                  </label>
                </div>
                <div className='col-7 d-flex'>
                  <div className='col-5 text-secondary text-center fs-9'>
                    {t('cartDetail.unitPrice')}
                  </div>
                  <div className='col-3 text-secondary text-center fs-9'>
                    {t('cartDetail.quantity')}
                  </div>
                  <div className='col-3 text-secondary text-center fs-9'>
                    {t('cartDetail.total')}
                  </div>
                  <div className='col-1 text-secondary text-center fs-9'>
                    <i className='fa-regular fa-trash-can pointer'></i>
                  </div>
                </div>
              </div>
            </div>
            {carts.map((cart, index) => (
              <div className='accordion-item mb-2' key={index}>
                <h2
                  className='accordion-header'
                  id={`panelsStayOpen-heading-${index}`}
                >
                  <button
                    className='accordion-button btn'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#panelsStayOpen-collapse-${index}`}
                    aria-expanded='true'
                    aria-controls={`panelsStayOpen-collapse-${index}`}
                  >
                    <StoreSmallCard store={cart.storeId} />
                    <i
                      style={{ fontSize: '0.9rem' }}
                      className='fa-solid fa-angle-right ms-1 text-secondary'
                    ></i>
                  </button>
                </h2>
                <div
                  id={`panelsStayOpen-collapse-${index}`}
                  className='accordion-collapse collapse show'
                  aria-labelledby={`panelsStayOpen-collapse-${index}`}
                >
                  <div className='accordion-body px-3'>
                    {!cart.storeId?.isActive && (
                      <Error msg={t('toastError.storeBanned')} />
                    )}

                    {cart.storeId?.isActive && !cart.storeId?.isOpen && (
                      <Error msg="This store is closed, can't order in this time!" />
                    )}

                    {cart.storeId?.isActive && cart.storeId?.isOpen && (
                      <ListCartItemsForm
                        cartId={cart._id}
                        storeId={cart.storeId._id}
                        storeAddress={cart.storeId.address}
                        userId={cart.userId._id}
                        onRun={() => setRun(!run)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default CartPage
