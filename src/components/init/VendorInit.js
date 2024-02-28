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

const IMG = process.env.REACT_APP_STATIC_URL

const VendorInit = ({ store, actions }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)

  const { _id, accessToken } = getToken()
  const { storeId } = useParams()

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
        setError('Server error')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!store || store._id != storeId) init()
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
        <div className='your-shop-wrap'>
          <div className='your-shop'>
            <div
              type='button'
              className='your-shop-card btn btn-outline-light cus-outline ripple'
            >
              <img
                src={`${IMG + store.avatar}`}
                className='your-shop-img'
                alt=''
              />

              <span className='your-shop-name unselect res-hide-xl'>
                {!error && store.name}
                {error && <Error msg={error} />}
              </span>
            </div>

            <ul className='list-group your-shop-options'>
              <Link
                className='list-group-item your-shop-options-item ripple'
                to={`/vendor/profile/${storeId}`}
              >
                <i className='fas fa-store me-1'></i>
                Store profile
              </Link>

              <Link
                className='list-group-item your-shop-options-item ripple'
                to={`/vendor/orders/${storeId}`}
              >
                <i className='fas fa-clipboard me-1'></i>
                Orders
              </Link>

              <Link
                className='list-group-item your-shop-options-item ripple'
                to='/account/storeManager'
              >
                <i className='fas fa-arrow-circle-left me-1'></i>
                Back
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
