/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { addStore } from '../../actions/store'
import { getToken } from '../../apis/auth'
import { getStore } from '../../apis/store'
import { getStoreLevel } from '../../apis/level'
import { countOrder } from '../../apis/order'
import { getNumberOfFollowers, checkFollowingStore } from '../../apis/follow'
import Error from '../ui/Error'
import Loading from '../ui/Loading'
const IMG = process.env.REACT_APP_STATIC_URL

const StoreInit = ({ store, actions }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { _id, accessToken } = getToken()
  const { storeId } = useParams()

  const init = () => {
    setIsLoading(true)
    getStore(storeId)
      .then(async (data) => {
        if (data.error) {
          setError(data.error)
          setIsLoading(false)
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
            const res = await checkFollowingStore(_id, accessToken, storeId)
            newStore.isFollowing = res.success ? true : false
          } catch {
            newStore.isFollowing = false
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
        setError('Something went wrong')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!store || store._id !== storeId) init()
  }, [storeId])

  return isLoading ? (
    <div className='cus-position-relative-loading'>
      <Loading size='small' />
    </div>
  ) : (
    <div
      type='button'
      className='your-store-card btn btn-outline-light cus-outline ripple'
    >
      <img
        loading='lazy'
        src={`${IMG + store.avatar}`}
        className='your-store-img'
        alt='Store avatar'
      />
      <span className='your-store-name unselect res-hide-md'>
        {store.name}
        {error && <Error msg={error} />}
      </span>
    </div>
  )
}

function mapStateToProps(state) {
  return { store: state.store.store }
}

function mapDispatchToProps(dispatch) {
  return { actions: (store) => dispatch(addStore(store)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInit)
