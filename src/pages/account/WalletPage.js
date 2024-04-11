import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import TransactionsTable from '../../components/table/TransactionsTable'
import { useTranslation } from 'react-i18next'
import MetaData from '../../components/layout/meta/MetaData'

const WalletPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()

  return (
    <AccountLayout user={user}>
      <MetaData title={`${t('helmet.myWallet')} | Zenpii Việt Nam`} />
      <TransactionsTable
        eWallet={user.e_wallet ? user.e_wallet.$numberDecimal : 0}
        by='user'
      />
    </AccountLayout>
  )
}

export default WalletPage
