import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import TransactionsTable from '../../components/table/TransactionsTable'

const GDCoinsPage = (props) => {
  const user = useSelector((state) => state.account.user)
  return (
    <AccountLayout user={user}>
      <TransactionsTable
        eWallet={user.e_wallet ? user.e_wallet.$numberDecimal : 0}
        by='user'
      />
    </AccountLayout>
  )
}

export default GDCoinsPage
