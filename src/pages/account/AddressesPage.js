import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import UserAddressesTable from '../../components/table/UserAddressesTable'
import MetaData from '../../components/layout/meta/MetaData'
import { useTranslation } from 'react-i18next'

const AddressesPage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.addressBook'), url: '/account/addresses' }
  ]

  return (
    <AccountLayout user={user} paths={paths}>
      <MetaData title={`${t('helmet.addressBook')} | Zenpii Việt Nam`} />
      <UserAddressesTable addresses={user.addresses} />
    </AccountLayout>
  )
}

export default AddressesPage
