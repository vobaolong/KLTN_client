/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addVendor } from '../../actions/vendor'
import { getToken } from '../../apis/auth'
import { getStoreProfile } from '../../apis/store'
import { getStoreLevel } from '../../apis/level'
import { getNumberOfFollowers } from '../../apis/follow'
import { countOrder } from '../../apis/order'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import { useTranslation } from 'react-i18next'

const IMG = process.env.REACT_APP_STATIC_URL

const VendorInit = ({ store, actions }) => {
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

          //get level
          try {
            const res = await getStoreLevel(storeId)
            newStore.level = res.level
          } catch {
            newStore.level = {}
          }

          //get count followers
          try {
            const res = await getNumberOfFollowers(storeId)
            newStore.numberOfFollowers = res.count
          } catch {
            newStore.numberOfFollowers = 0
          }

          //get count orders
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
        setError(error)
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
            <div
              type='button'
              className='your-store-card btn btn-outline-light cus-outline ripple'
            >
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

            <ul className='list-group your-store-options'>
              <Link
                className='list-group-item your-store-options-item ripple'
                to={`/vendor/profile/${storeId}`}
              >
                <i className='fa-solid fa-store me-1'></i>
                {t('storeDetail.profile')}
              </Link>

              <Link
                className='list-group-item your-store-options-item ripple'
                to={`/vendor/orders/${storeId}`}
              >
                <i className='fa-solid fa-clipboard me-1'></i>
                {t('storeDetail.orders')}
              </Link>

              <Link
                className='list-group-item your-store-options-item ripple'
                to='/account/store'
              >
                <i className='fa-solid fa-angle-left me-1'></i>
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
  return { store: state.vendor.store }
}

function mapDispatchToProps(dispatch) {
  return { actions: (store) => dispatch(addVendor(store)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorInit)
