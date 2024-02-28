import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import ListStatisticsItems from '../../components/chart/ListStatisticsItems'

const DashboardPage = (props) => {
  const user = useSelector((state) => state.account.user)

  return (
    <AdminLayout user={user}>
      <ListStatisticsItems />
    </AdminLayout>
  )
}

export default DashboardPage
