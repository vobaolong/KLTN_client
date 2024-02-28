import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCreateStyleForm from '../../components/item/form/AdminCreateStyleForm'

const CreateStylePage = (props) => {
  const user = useSelector((state) => state.account.user)
  return (
    <AdminLayout user={user}>
      <AdminCreateStyleForm />
    </AdminLayout>
  )
}

export default CreateStylePage
