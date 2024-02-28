import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import OrderDetailInfo from '../../components/info/OrderDetailInfo'
import AdminLayout from '../../components/layout/AdminLayout'

const OrderDetailPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const { orderId } = useParams()
  return (
    <AdminLayout user={user}>
      <OrderDetailInfo orderId={orderId} by='admin' isEditable={true} />
      <div className='mt-4'>
        <Link to='/admin/order' className='text-decoration-none cus-link-hover'>
          <i className='fas fa-arrow-circle-left'></i> Back to Orders Manager
        </Link>
      </div>
    </AdminLayout>
  )
}

export default OrderDetailPage
