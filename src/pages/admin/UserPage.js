import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminUsersTable from '../../components/table/AdminUsersTable'
import { useTranslation } from 'react-i18next'

const UserPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()

  return (
    <AdminLayout user={user}>
      <AdminUsersTable heading={t('title.userInSystem')} />
    </AdminLayout>
  )
}

export default UserPage
