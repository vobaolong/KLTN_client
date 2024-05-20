import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import OrderDetailInfo from '../../components/info/OrderDetailInfo'
import VendorLayout from '../../components/layout/VendorLayout'
import { useTranslation } from 'react-i18next'

const OrderDetailPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)
  const { orderId, storeId } = useParams()
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: `/vendor/${storeId}` },
    { name: t('breadcrumbs.order'), url: `/vendor/orders/${storeId}` },
    {
      name: t('breadcrumbs.orderDetail'),
      url: `/vendor/orders/detail/${orderId}/${storeId}`
    }
  ]
  return (
    <VendorLayout user={user} store={store} paths={paths}>
      <div className='res-mx--12-md bg-white rounded-1 box-shadow p-4'>
        <OrderDetailInfo
          orderId={orderId}
          storeId={storeId}
          by='store'
          isEditable={true}
        />

        <div className='align-items-center justify-content-between d-flex'>
          <Link
            to={`/vendor/orders/${storeId}`}
            className='text-decoration-none link-hover'
          >
            <i className='fa-solid fa-chevron-left me-2'></i>
            {t('button.back')}
          </Link>
          <button className='btn btn-outline-primary p-1 px-2 rounded-1'>
            <i className='fa-solid fa-print'></i>
            <span className='ms-2'>Print Delivery Bill</span>
          </button>
        </div>
      </div>
    </VendorLayout>
  )
}

export default OrderDetailPage
