import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import ListStatisticsItems from '../../components/chart/ListStatisticsItems'
import { useTranslation } from 'react-i18next'

const DashboardPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.overview'), url: '/admin/dashboard' }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <ListStatisticsItems by='admin' />
    </AdminLayout>
  )
}

export default DashboardPage
