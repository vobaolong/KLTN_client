import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import AccountLayout from '../../components/layout/AccountLayout'
import OrderDetailInfo from '../../components/info/OrderDetailInfo'
import { useTranslation } from 'react-i18next'

const OrderDetailPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const { orderId } = useParams()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.myPurchase'), url: '/account/purchase' }
  ]
  return (
    <AccountLayout user={user} paths={paths}>
      <div className='res-mx--12-md bg-white rounded-1 box-shadow p-4'>
        <OrderDetailInfo orderId={orderId} />
        <div>
          <Link
            to='/account/purchase'
            className='text-decoration-none cus-link-hover'
          >
            <i className='fa-solid fa-angle-left me-2'></i>
            {t('button.back')}
          </Link>
        </div>
      </div>
    </AccountLayout>
  )
}

export default OrderDetailPage
