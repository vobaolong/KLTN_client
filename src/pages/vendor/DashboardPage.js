import { useSelector } from 'react-redux'
import VendorLayout from '../../components/layout/VendorLayout'
import ListStatisticsItems from '../../components/chart/ListStatisticsItems'

const DashboardPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)

  return (
    <VendorLayout user={user} store={store}>
      <ListStatisticsItems by='vendor' storeId={store._id} />
    </VendorLayout>
  )
}

export default DashboardPage
