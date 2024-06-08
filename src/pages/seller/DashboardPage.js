import { useSelector } from 'react-redux'
import SellerLayout from '../../components/layout/SellerLayout'
import ListStatisticsItems from '../../components/chart/ListStatisticsItems'

const DashboardPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.seller.store)

  return (
    <SellerLayout user={user} store={store}>
      <ListStatisticsItems by='seller' storeId={store._id} />
    </SellerLayout>
  )
}

export default DashboardPage
