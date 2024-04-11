import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminDeliveriesTable from '../../components/table/AdminDeliveriesTable'
import { useTranslation } from 'react-i18next'

const DeliveryPage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  return (
    <AdminLayout user={user}>
      <AdminDeliveriesTable heading={t('deliveryDetail.deliveryUnit')} />
    </AdminLayout>
  )
}

export default DeliveryPage
