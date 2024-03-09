import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import OrderDetailInfo from '../../components/info/OrderDetailInfo'
import AdminLayout from '../../components/layout/AdminLayout'
import { useTranslation } from 'react-i18next'

const OrderDetailPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()

  const { orderId } = useParams()
  return (
    <AdminLayout user={user}>
      <OrderDetailInfo orderId={orderId} by='admin' isEditable={true} />
      <div className='mt-4'>
        <Link to='/admin/order' className='text-decoration-none cus-link-hover'>
          <i className='fas fa-angle-left'></i> {t('button.back')}
        </Link>
      </div>
    </AdminLayout>
  )
}

export default OrderDetailPage
