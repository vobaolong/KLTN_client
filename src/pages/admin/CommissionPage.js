import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCommissionTable from '../../components/table/AdminCommissionTable'
import { useTranslation } from 'react-i18next'

const CommissionPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()

  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.commission'), url: '/admin/commission' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminCommissionTable />
    </AdminLayout>
  )
}

export default CommissionPage
