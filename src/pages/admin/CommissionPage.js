import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCommissionsTable from '../../components/table/AdminCommissionsTable'

const CommissionPage = () => {
  const user = useSelector((state) => state.account.user)
  return (
    <AdminLayout user={user}>
      <AdminCommissionsTable />
    </AdminLayout>
  )
}

export default CommissionPage
