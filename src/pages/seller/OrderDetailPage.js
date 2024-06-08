import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import OrderDetailInfo from '../../components/info/OrderDetailInfo'
import SellerLayout from '../../components/layout/SellerLayout'
import { useTranslation } from 'react-i18next'

const OrderDetailPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.seller.store)
  const { orderId, storeId } = useParams()
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: `/seller/${storeId}` },
    { name: t('breadcrumbs.order'), url: `/seller/orders/${storeId}` },
    {
      name: t('breadcrumbs.orderDetail'),
      url: `/seller/orders/detail/${orderId}/${storeId}`
    }
  ]
  return (
    <SellerLayout user={user} store={store} paths={paths}>
      <div className='res-mx--12-md bg-white rounded-1 box-shadow p-4'>
        <OrderDetailInfo
          orderId={orderId}
          storeId={storeId}
          by='store'
          isEditable={true}
        />

        <div className='align-items-center justify-content-between d-flex'>
          <Link
            to={`/seller/orders/${storeId}`}
            className='text-decoration-none link-hover'
          >
            <i className='fa-solid fa-chevron-left me-2'></i>
            {t('button.back')}
          </Link>
        </div>
      </div>
    </SellerLayout>
  )
}

export default OrderDetailPage
