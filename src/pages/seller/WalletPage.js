import { useSelector } from 'react-redux'
import SellerLayout from '../../components/layout/SellerLayout'
import TransactionsTable from '../../components/table/TransactionsTable'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

const WalletPage = () => {
  const user = useSelector((state) => state.account.user)
  const store = useSelector((state) => state.seller.store)
  const { t } = useTranslation()

  const [eWallet, setEWallet] = useState(
    store.e_wallet ? store.e_wallet?.$numberDecimal : 0
  )
  const reloadWallet = () => {
    setEWallet(store.e_wallet?.$numberDecimal)
  }
  useEffect(() => {
    setEWallet(store.e_wallet && store.e_wallet?.$numberDecimal)
  }, [store.e_wallet])

  const paths = [
    { name: t('breadcrumbs.home'), url: `/seller/${store._id}` },
    { name: t('breadcrumbs.wallet'), url: `/seller/wallet/${store._id}` }
  ]
  return (
    <SellerLayout user={user} store={store} paths={paths}>
      <TransactionsTable
        storeId={store._id}
        owner={store.ownerId}
        eWallet={eWallet}
        by='store'
        onReloadWallet={reloadWallet}
      />
    </SellerLayout>
  )
}

export default WalletPage
