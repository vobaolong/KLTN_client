import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminDeliveriesTable from '../../components/table/AdminDeliveriesTable'

const DeliveryPage = (props) => {
  const user = useSelector((state) => state.account.user)
  return (
    <AdminLayout user={user}>
      <AdminDeliveriesTable />
    </AdminLayout>
  )
}

export default DeliveryPage
