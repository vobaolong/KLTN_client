import { useSelector } from 'react-redux'
import VendorLayout from '../../components/layout/VendorLayout'
import TransactionsTable from '../../components/table/TransactionsTable'

const WalletPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)

  return (
    <VendorLayout user={user} store={store}>
      <TransactionsTable
        storeId={store._id}
        owner={store.ownerId}
        eWallet={store.e_wallet ? store.e_wallet.$numberDecimal : 0}
        by='store'
      />
    </VendorLayout>
  )
}

export default WalletPage
