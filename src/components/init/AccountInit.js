import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken, signout } from '../../apis/auth'
import { getUserProfile } from '../../apis/user'
import { getUserLevel } from '../../apis/level'
import { getCartCount } from '../../apis/cart'
import { countOrder } from '../../apis/order'
import { addAccount } from '../../actions/account'
import Loading from '../ui/Loading'
import Error from '../ui/Error'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'

const IMG = process.env.REACT_APP_STATIC_URL

const AccountInit = ({ user, actions }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')

  const { firstName, lastName, avatar } = user
  const history = useHistory()
  const { _id, accessToken, refreshToken, role } = getToken()
  const init = () => {
    setIsLoading(true)
    setError('')
    getUserProfile(_id, accessToken)
      .then(async (data) => {
        if (data.error) {
          setError(data.error)
          setIsLoading(false)
        } else {
          const newUser = data.user
          //get level
          try {
            const res = await getUserLevel(_id)
            newUser.level = res.level
          } catch {
            newUser.level = {}
          }

          //get count carts
          try {
            const res = await getCartCount(_id, accessToken)
            newUser.cartCount = res.count
          } catch {
            newUser.cartCount = 0
          }

          //get count orders
          try {
            const res1 = await countOrder('Delivered', _id, '')
            const res2 = await countOrder('Cancelled', _id, '')
            newUser.numberOfSuccessfulOrders = res1.count
            newUser.numberOfFailedOrders = res2.count
          } catch {
            newUser.numberOfSuccessfulOrders = 0
            newUser.numberOfFailedOrders = 0
          }

          actions(newUser)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        setError('Server error')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!firstName && !lastName && !avatar) init()
  }, [])

  const handleSignout = () => {
    setIsConfirming(true)
  }

  const onSignoutSubmit = () => {
    setIsLoading(true)
    signout(refreshToken, () => {
      history.go(0)
    })
  }
  const { t } = useTranslation()

  return isLoading ? (
    <div className='cus-position-relative-loading'>
      <Loading size='small' />
    </div>
  ) : (
    <div className='your-account-wrap'>
      {isConfirming && (
        <ConfirmDialog
          title={t('logOut')}
          color='danger'
          onSubmit={onSignoutSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}
      <div className='your-account'>
        <div
          type='button'
          className='your-account-card btn btn-outline-light cus-outline ripple'
        >
          <img
            src={avatar ? `${IMG + avatar}` : ''}
            className='your-account-img'
            alt=''
          />

          <span className='your-account-name unselect res-hide-xl'>
            {firstName && lastName && firstName + ' ' + lastName}
            {error && <Error msg={error} />}
          </span>
        </div>

        <ul className='list-group your-account-options'>
          <Link
            className='list-group-item your-account-options-item ripple text-capitalize'
            to='/account/profile'
          >
            <i className='fas fa-user-circle'></i>
            {t('myAccount')}
          </Link>

          {role === 'user' && (
            <Link
              className='list-group-item your-account-options-item ripple text-capitalize'
              to='/account/purchase'
            >
              <i className='fas fa-shopping-bag'></i>
              {t('myPurchase')}
            </Link>
          )}

          <li
            className='list-group-item your-account-options-item ripple text-capitalize'
            onClick={handleSignout}
          >
            <i className='fas fa-sign-out-alt'></i>
            {t('logOut')}
          </li>
        </ul>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return { user: state.account.user }
}

function mapDispatchToProps(dispatch) {
  return { actions: (user) => dispatch(addAccount(user)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInit)
