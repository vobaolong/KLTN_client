import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import UserStoresTable from '../../components/table/UserStoresTable'
import MetaData from '../../components/layout/meta/MetaData'
import { useTranslation } from 'react-i18next'

const StoreManagerPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()

  return (
    <AccountLayout user={user}>
      <MetaData title={`${t('helmet.myStore')} | Zenpii Việt Nam`} />

      <UserStoresTable />
    </AccountLayout>
  )
}

export default StoreManagerPage
