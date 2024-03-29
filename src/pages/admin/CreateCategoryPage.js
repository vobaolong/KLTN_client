import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCreateCategoryForm from '../../components/item/form/AdminCreateCategoryForm'

const CreateCategoryPage = () => {
  const user = useSelector((state) => state.account.user)
  return (
    <AdminLayout user={user}>
      <AdminCreateCategoryForm />
    </AdminLayout>
  )
}

export default CreateCategoryPage
