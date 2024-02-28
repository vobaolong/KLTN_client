import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminEditCategoryForm from '../../components/item/form/AdminEditCategoryForm'

const EditCategoryPage = (props) => {
  const user = useSelector((state) => state.account.user)
  const { categoryId } = useParams()
  return (
    <AdminLayout user={user}>
      <AdminEditCategoryForm categoryId={categoryId} />
    </AdminLayout>
  )
}

export default EditCategoryPage
