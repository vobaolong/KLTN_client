import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminVariantsTable from '../../components/table/AdminVariantsTable'
import { useTranslation } from 'react-i18next'

const VariantPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.variant'), url: '/admin/variant' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminVariantsTable />
    </AdminLayout>
  )
}

export default VariantPage
