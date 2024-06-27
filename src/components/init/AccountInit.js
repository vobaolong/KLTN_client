/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken, signout } from '../../apis/auth'
import { getUserProfile } from '../../apis/user'
import { getUserLevel } from '../../apis/level'
import { getCartCount } from '../../apis/cart'
import { countOrder } from '../../apis/order'
import { addAccount } from '../../actions/account'
import Error from '../ui/Error'
import ConfirmDialog from '../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import Loading from '../ui/Loading'
import defaultImage from '../../assets/default.webp'

const IMG = process.env.REACT_APP_STATIC_URL

const AccountInit = ({ user, actions }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const { email, firstName, lastName, avatar } = user
  const history = useHistory()
  const { _id, accessToken, refreshToken, role } = getToken()

  useEffect(() => {
    let isMounted = true
    const init = () => {
      setIsLoading(true)
      getUserProfile(_id, accessToken)
        .then(async (data) => {
          if (!isMounted) return
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
          if (!isMounted) return
          setError('Server Error')
          setIsLoading(false)
        })
    }
    if (!email && !firstName && !lastName && !avatar) init()
    return () => {
      isMounted = false
    }
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
          className={`your-account-card btn lang ripple rounded-1 inherit`}
        >
          <img
            loading='lazy'
            src={IMG + avatar ?? defaultImage}
            className='your-account-img'
            alt=''
          />
          <span className='your-account-name unselect res-hide-xl'>
            {t('userDetail.account')}
            {error && <Error msg={error} />}
          </span>
        </div>

        <ul className='list-group your-account-options p-3 bg-white'>
          <div className='d-flex align-items-start default'>
            <img
              loading='lazy'
              src={IMG + avatar ?? defaultImage}
              className='your-account-img'
              style={{ width: '35px', height: '35px' }}
              alt=''
            />
            <span className='ms-2 d-flex flex-column'>
              <span className='text-primary fw-bold'>
                {firstName} {lastName}
              </span>
              <small className='text-secondary'>{email}</small>
            </span>
          </div>
          <hr className='my-2' />
          <Link
            className='list-group-item rounded-1 bg-value border-0 your-account-options-item ripple mt-2'
            to='/account/profile'
          >
            <i className='fa-light fw-normal fa-user text-primary fs-9'></i>
            {t('userDetail.myAccount')}
          </Link>
          {role === 'user' && (
            <Link
              className='list-group-item rounded-1 bg-value border-0 mt-2 your-account-options-item ripple'
              to='/account/store'
            >
              <i className='fa-light fw-normal fa-store text-primary fs-9'></i>
              {t('myStore')}
            </Link>
          )}
          {role === 'user' && (
            <Link
              className='list-group-item rounded-1 bg-value border-0 mt-2 your-account-options-item ripple '
              to='/account/purchase'
            >
              <i className='fa-light fw-normal fa-receipt text-primary fs-9'></i>
              {t('userDetail.myPurchase')}
            </Link>
          )}
          <hr className='my-2' />
          <li
            className='list-group-item rounded-1 bg-value border-0 mt-2 your-account-options-item ripple '
            onClick={handleSignout}
          >
            <i className='fa-light fw-normal fa-arrow-right-from-bracket text-primary fs-9'></i>
            <span className='text-danger'>{t('button.logout')}</span>
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
