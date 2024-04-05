import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCreateVariantForm from '../../components/item/form/AdminCreateVariantForm'

const CreateVariantPage = () => {
  const user = useSelector((state) => state.account.user)
  return (
    <AdminLayout user={user}>
      <AdminCreateVariantForm />
    </AdminLayout>
  )
}

export default CreateVariantPage
