import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminDeliveriesTable from '../../components/table/AdminDeliveriesTable'
import { useTranslation } from 'react-i18next'

const DeliveryPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.delivery'), url: '/admin/delivery' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminDeliveriesTable heading={true} />
    </AdminLayout>
  )
}

export default DeliveryPage
