import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminEditCategoryForm from '../../components/item/form/AdminEditCategoryForm'
import { useTranslation } from 'react-i18next'

const EditCategoryPage = () => {
  const user = useSelector((state) => state.account.user)
  const { categoryId } = useParams()

  const { t } = useTranslation()
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.category'), url: '/admin/category' },
    {
      name: t('breadcrumbs.editCategory'),
      url: `/admin/category/edit/${categoryId}`
    }
  ]

  return (
    <AdminLayout user={user} paths={paths}>
      <AdminEditCategoryForm categoryId={categoryId} />
    </AdminLayout>
  )
}

export default EditCategoryPage
