import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminEditVariantForm from '../../components/item/form/AdminEditVariantForm'

const EditVariantPage = () => {
  const user = useSelector((state) => state.account.user)
  const { variantId } = useParams()
  return (
    <AdminLayout user={user}>
      <AdminEditVariantForm variantId={variantId} />
    </AdminLayout>
  )
}

export default EditVariantPage
