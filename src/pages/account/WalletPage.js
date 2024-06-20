import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import TransactionsTable from '../../components/table/TransactionsTable'
import { useTranslation } from 'react-i18next'
import MetaData from '../../components/layout/meta/MetaData'
import { useEffect, useState } from 'react'

const WalletPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const [eWallet, setEWallet] = useState(
    user.e_wallet ? user.e_wallet.$numberDecimal : 0
  )
  const reloadWallet = () => {
    setEWallet(user.e_wallet.$numberDecimal)
  }
  useEffect(() => {
    setEWallet(user.e_wallet ? user.e_wallet.$numberDecimal : 0)
  }, [user.e_wallet])
  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.myWallet'), url: '/account/wallet' }
  ]

  return (
    <AccountLayout user={user} paths={paths}>
      <MetaData title={`${t('helmet.myWallet')} | Zenpii Việt Nam`} />
      <TransactionsTable
        eWallet={eWallet}
        by='user'
        onReloadWallet={reloadWallet}
      />
    </AccountLayout>
  )
}

export default WalletPage
