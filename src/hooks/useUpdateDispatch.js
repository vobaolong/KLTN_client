/* eslint-disable default-case */
import { useSelector, useDispatch } from 'react-redux'
import { addAccount } from '../actions/account'
import { addSeller } from '../actions/seller'
import { addUser } from '../actions/user'
import { addStore } from '../actions/store'
import { addProduct } from '../actions/product'
import { getNumberOfFollowers, checkFollowingStore } from '../apis/follow'
import { getUserLevel, getStoreLevel } from '../apis/level'
import { countOrder } from '../apis/order'
import { getCartCount } from '../apis/cart'
import { getToken } from '../apis/auth'

const useUpdateDispatch = () => {
  const account = useSelector((state) => state.account.user)
  const seller = useSelector((state) => state.seller.store)
  const user = useSelector((state) => state.user.user)
  const store = useSelector((state) => state.store.store)
  const { _id, accessToken } = getToken()

  const dispatch = useDispatch()

  const updateDispatch = async (name, data) => {
    switch (name) {
      case 'account': {
        //get level
        try {
          const res = await getUserLevel(_id)
          data.level = res.level
        } catch {
          data.level = account.level
        }

        //get count carts
        try {
          const res = await getCartCount(_id, accessToken)
          data.cartCount = res.count
        } catch {
          data.cartCount = account.cartCount
        }

        //get count orders
        try {
          const res1 = await countOrder('Delivered', _id, '')
          const res2 = await countOrder('Cancelled', _id, '')
          data.numberOfSuccessfulOrders = res1.count
          data.numberOfFailedOrders = res2.count
        } catch {
          data.numberOfSuccessfulOrders = account.numberOfSuccessfulOrders
          data.numberOfFailedOrders = account.numberOfFailedOrders
        }

        return dispatch(addAccount(data))
      }

      case 'seller': {
        //get level
        try {
          const res = await getStoreLevel(data._id)
          data.level = res.level
        } catch {
          data.level = seller.level
        }

        //get count followers
        try {
          const res = await getNumberOfFollowers(data._id)
          data.numberOfFollowers = res.count
        } catch {
          data.numberOfFollowers = seller.numberOfFollowers
        }

        //get count orders
        try {
          const res1 = await countOrder('Delivered', '', data._id)
          const res2 = await countOrder('Cancelled', '', data._id)
          data.numberOfSuccessfulOrders = res1.count
          data.numberOfFailedOrders = res2.count
        } catch {
          data.numberOfSuccessfulOrders = seller.numberOfSuccessfulOrders
          data.numberOfFailedOrders = seller.numberOfFailedOrders
        }

        return dispatch(addSeller(data))
      }

      case 'user': {
        //get level
        try {
          const res = await getUserLevel(data._id)
          data.level = res.level
        } catch {
          data.level = user.level
        }

        //get count orders
        try {
          const res1 = await countOrder('Delivered', data._id, '')
          const res2 = await countOrder('Cancelled', data._id, '')
          data.numberOfSuccessfulOrders = res1.count
          data.numberOfFailedOrders = res2.count
        } catch {
          data.numberOfSuccessfulOrders = user.numberOfSuccessfulOrders
          data.numberOfFailedOrders = user.numberOfFailedOrders
        }

        return dispatch(addUser(data))
      }

      case 'store': {
        //get level
        try {
          const res = await getStoreLevel(data._id)
          data.level = res.level
        } catch {
          data.level = store.level
        }

        //get count followers
        try {
          const res = await getNumberOfFollowers(data._id)
          data.numberOfFollowers = res.count
        } catch {
          if (typeof data.isFollowing === 'boolean') {
            const currentNumberOfFollowers = store.numberOfFollowers
            data.numberOfFollowers = data.isFollowing
              ? currentNumberOfFollowers + 1
              : currentNumberOfFollowers - 1
          } else {
            data.isFollowing = store.isFollowing
            data.numberOfFollowers = store.numberOfFollowers
          }
        }

        //check follow
        try {
          const res = await checkFollowingStore(_id, accessToken, data._id)
          data.isFollowing = res.success ? true : false
        } catch {
          if (typeof data.isFollowing === 'boolean') {
          } else data.isFollowing = store.isFollowing
        }

        //get count orders
        try {
          const res1 = await countOrder('Delivered', '', data._id)
          const res2 = await countOrder('Cancelled', '', data._id)
          data.numberOfSuccessfulOrders = res1.count
          data.numberOfFailedOrders = res2.count
        } catch {
          data.numberOfSuccessfulOrders = store.numberOfSuccessfulOrders
          data.numberOfFailedOrders = store.numberOfFailedOrders
        }

        return dispatch(addStore(data))
      }

      case 'product': {
        //
        return dispatch(addProduct(data))
      }
    }
  }

  return [updateDispatch]
}

export default useUpdateDispatch
