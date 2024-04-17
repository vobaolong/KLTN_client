import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import UserCreateStoreForm from '../../components/item/form/UserCreateStoreForm'
import { useTranslation } from 'react-i18next'

const CreateStorePage = () => {
  const user = useSelector((state) => state.account.user)
  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/' },
    { name: t('breadcrumbs.myStore'), url: '/account/store' },
    { name: t('breadcrumbs.createStore'), url: '/account/store/create' }
  ]
  return (
    <AccountLayout user={user} paths={paths}>
      <UserCreateStoreForm />
    </AccountLayout>
  )
}

export default CreateStorePage
