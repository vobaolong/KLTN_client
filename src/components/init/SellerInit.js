/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addSeller } from '../../actions/seller'
import { getToken } from '../../apis/auth'
import { getStoreProfile } from '../../apis/store'
import { getStoreLevel } from '../../apis/level'
import { getNumberOfFollowers } from '../../apis/follow'
import { countOrder } from '../../apis/order'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import { useTranslation } from 'react-i18next'
import defaultImage from '../../assets/default.webp'

const IMG = process.env.REACT_APP_STATIC_URL

const SellerInit = ({ store, actions }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)

  const { _id, accessToken } = getToken()
  const { storeId } = useParams()
  const { t } = useTranslation()
  const init = () => {
    setIsLoading(true)
    setError('')

    getStoreProfile(_id, accessToken, storeId)
      .then(async (data) => {
        if (data.error) {
          if (data.isManager === false) {
            setRedirect(true)
          } else {
            setError(data.error)
            setIsLoading(false)
          }
        } else {
          const newStore = data.store

          try {
            const res = await getStoreLevel(storeId)
            newStore.level = res.level
          } catch {
            newStore.level = {}
          }

          try {
            const res = await getNumberOfFollowers(storeId)
            newStore.numberOfFollowers = res.count
          } catch {
            newStore.numberOfFollowers = 0
          }

          try {
            const res1 = await countOrder('Delivered', '', storeId)
            const res2 = await countOrder('Cancelled', '', storeId)
            newStore.numberOfSuccessfulOrders = res1.count
            newStore.numberOfFailedOrders = res2.count
          } catch {
            newStore.numberOfSuccessfulOrders = 0
            newStore.numberOfFailedOrders = 0
          }

          actions(newStore)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        setError('Server error')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!store || store._id !== storeId) init()
  }, [storeId])

  return (
    <Fragment>
      {redirect && (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      )}

      {isLoading ? (
        <div className='cus-position-relative-loading'>
          <Loading size='small' />
        </div>
      ) : (
        <div className='your-store-wrap'>
          <div className='your-store'>
            <div type='button' className='your-store-card btn lang ripple'>
              <img
                loading='lazy'
                src={`${IMG + store.avatar}`}
                className='your-store-img'
                alt=''
              />

              <span className='your-store-name unselect res-hide-xl'>
                {!error && store.name}
                {error && <Error msg={error} />}
              </span>
            </div>

            <ul
              className='list-group your-store-options p-3 bg-white fw-normal'
              style={{
                left: '10%'
              }}
            >
              <div className='d-flex align-items-start default'>
                <img
                  loading='lazy'
                  src={IMG + store.avatar ?? defaultImage}
                  className='your-account-img'
                  style={{ width: '35px', height: '35px' }}
                  alt=''
                />
                <span className='ms-2 d-flex flex-column'>
                  <span className='text-primary fw-bold'>{store.name}</span>
                  <small className='text-secondary'>
                    {store.ownerId?.email}
                  </small>
                </span>
              </div>
              <hr className='my-2' />
              <Link
                className='list-group-item your-store-options-item ripple rounded-1 bg-value border-0'
                to={`/seller/profile/${storeId}`}
              >
                <i className='fw-normal text-primary fs-9 fa-light fa-store'></i>
                {t('storeDetail.profile')}
              </Link>

              <Link
                className='list-group-item your-store-options-item ripple rounded-1 bg-value border-0 mt-2'
                to={`/seller/orders/${storeId}`}
              >
                <i className='fw-normal text-primary fs-9 fa-light fa-receipt'></i>
                {t('storeDetail.orders')}
              </Link>
              <hr className='my-2' />
              <Link
                className='list-group-item your-store-options-item ripple rounded-1 bg-value border-0 mt-2'
                to='/account/store'
              >
                <i className='fw-normal text-primary fs-9 fa-light fa-angle-left'></i>
                {t('button.back')}
              </Link>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  )
}

function mapStateToProps(state) {
  return { store: state.seller.store }
}

function mapDispatchToProps(dispatch) {
  return { actions: (store) => dispatch(addSeller(store)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerInit)
