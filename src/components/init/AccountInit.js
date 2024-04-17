/* eslint-disable react-hooks/exhaustive-deps */
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
          try {
            const res = await getUserLevel(_id)
            newUser.level = res.level
          } catch {
            newUser.level = {}
          }
          try {
            const res = await getCartCount(_id, accessToken)
            newUser.cartCount = res.count
          } catch {
            newUser.cartCount = 0
          }
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
        setError('Something went wrong')
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
          title={t('button.logout')}
          color='danger'
          onSubmit={onSignoutSubmit}
          message={t('confirmDialog')}
          onClose={() => setIsConfirming(false)}
        />
      )}
      <div className='your-account'>
        <div
          type='button'
          className='your-account-card btn lang ripple rounded-1 text-white'
        >
          <img
            loading='lazy'
            src={avatar ? `${IMG + avatar}` : ''}
            className='your-account-img'
            alt=''
          />

          <span
            className={`your-account-name unselect res-hide-xl ${
              firstName && lastName ? '' : 'mx-0'
            }`}
          >
            {firstName && lastName && firstName + ' ' + lastName}
            {error && <Error msg={error} />}
          </span>
        </div>

        <ul className='list-group your-account-options'>
          <Link
            className='list-group-item your-account-options-item ripple '
            to='/account/profile'
          >
            {t('userDetail.myAccount')}
          </Link>
          {role === 'user' && (
            <Link
              className='list-group-item your-account-options-item ripple '
              to='/account/store'
            >
              {t('myStore')}
            </Link>
          )}
          {role === 'user' && (
            <Link
              className='list-group-item your-account-options-item ripple '
              to='/account/purchase'
            >
              {t('userDetail.myPurchase')}
            </Link>
          )}

          <li
            className='list-group-item your-account-options-item ripple '
            onClick={handleSignout}
          >
            {t('button.logout')}
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
