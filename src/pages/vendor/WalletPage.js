import { useSelector } from 'react-redux'
import VendorLayout from '../../components/layout/VendorLayout'
import TransactionsTable from '../../components/table/TransactionsTable'
import { useTranslation } from 'react-i18next'

const WalletPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.vendor.store)
  const { t } = useTranslation()

  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.myStore'), url: '/account/store' },
    { name: t('breadcrumbs.wallet'), url: `/vendor/wallet/${store._id}` }
  ]
  return (
    <VendorLayout user={user} store={store} paths={paths}>
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
