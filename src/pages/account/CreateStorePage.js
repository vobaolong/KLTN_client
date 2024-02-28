import { useSelector } from 'react-redux'
import AccountLayout from '../../components/layout/AccountLayout'
import UserCreateStoreForm from '../../components/item/form/UserCreateStoreForm'

const CreateStorePage = (props) => {
  const user = useSelector((state) => state.account.user)
  return (
    <AccountLayout user={user}>
      <UserCreateStoreForm />
    </AccountLayout>
  )
}

export default CreateStorePage
