import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminStylesTable from '../../components/table/AdminStylesTable'

const StylePage = (props) => {
  const user = useSelector((state) => state.account.user)
  return (
    <AdminLayout user={user}>
      <AdminStylesTable />
    </AdminLayout>
  )
}

export default StylePage
