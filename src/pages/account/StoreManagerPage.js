import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import UserStoresTable from '../../components/table/UserStoresTable'

const StoreManagerPage = (props) => {
  const user = useSelector((state) => state.account.user)
  return (
    <AccountLayout user={user}>
      <UserStoresTable />
    </AccountLayout>
  )
}

export default StoreManagerPage
