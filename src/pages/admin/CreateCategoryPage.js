import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import AdminCreateCategoryForm from '../../components/item/form/AdminCreateCategoryForm'
import { useTranslation } from 'react-i18next'

const CreateCategoryPage = () => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.account.user)
  const paths = [
    { name: t('breadcrumbs.home'), url: '/admin/dashboard' },
    { name: t('breadcrumbs.category'), url: '/admin/category' },
    {
      name: t('breadcrumbs.addCategory'),
      url: '/admin/category/create'
    }
  ]
  return (
    <AdminLayout user={user} paths={paths}>
      <AdminCreateCategoryForm />
    </AdminLayout>
  )
}

export default CreateCategoryPage
