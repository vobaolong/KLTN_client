import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminUsersTable from '../../components/table/AdminUsersTable'
import { useTranslation } from 'react-i18next'

const UserPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.user'), url: '/admin/user' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminUsersTable />
    </AdminLayout>
  )
}

export default UserPage
