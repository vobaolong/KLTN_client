import { useSelector } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import AccountLayout from '../../components/layout/AccountLayout'
import FollowingProductsCollection from '../../components/collection/FollowingProductsCollection'
import FollowingStoresCollection from '../../components/collection/FollowingStoreCollection'
import { useTranslation } from 'react-i18next'

const FollowingPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const [flag, toggleFlag] = useToggle(true)
  return (
    <AccountLayout user={user}>
      <div className='d-flex align-items-center mb-2'>
        <div className='position-relative d-inline-block me-2'>
          <button
            type='button'
            className={`btn rounded-1 ${
              flag ? 'btn-pink' : 'btn-outline-pink'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag(true)}
          >
            <i className='fas fa-box'></i>
          </button>

          <small className='cus-tooltip-msg'>{t('favProduct')}</small>
        </div>

        <div className='position-relative d-inline-block'>
          <button
            type='button'
            className={`btn rounded-1 ${
              !flag ? 'btn-pink' : 'btn-outline-pink'
            } btn-lg ripple cus-tooltip`}
            onClick={() => toggleFlag(false)}
          >
            <i className='fas fa-store'></i>
          </button>

          <small className='cus-tooltip-msg'>{t('favStore')}</small>
        </div>
      </div>

      {flag ? <FollowingProductsCollection /> : <FollowingStoresCollection />}
    </AccountLayout>
  )
}

export default FollowingPage
